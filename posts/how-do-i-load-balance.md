--- 
author: Daniel Huckstep
title: Do You Even Load Balance?
category: software
description: Load balancing is hard.
published: true
publishedon: 17 Jun 2013 10:00 MDT
slugs: 
    - do-you-even-load-balance
tags: 
    - tcp
    - http
    - load-balancing
    - performance
    - scaling
images:
    nuke_it:
        small: http://res.cloudinary.com/verboselogging/image/upload/t_small/nuke-it-from-orbit.jpg
        medium: http://res.cloudinary.com/verboselogging/image/upload/t_medium/nuke-it-from-orbit.jpg
        large: http://res.cloudinary.com/verboselogging/image/upload/t_large/nuke-it-from-orbit.jpg
        original: http://res.cloudinary.com/verboselogging/image/upload/nuke-it-from-orbit.jpg
    fuck_yeah:
        small: http://res.cloudinary.com/verboselogging/image/upload/t_small/fuck-yeah.jpg
        medium: http://res.cloudinary.com/verboselogging/image/upload/t_medium/fuck-yeah.jpg
        large: http://res.cloudinary.com/verboselogging/image/upload/t_large/fuck-yeah.jpg
        original: http://res.cloudinary.com/verboselogging/image/upload/fuck-yeah.jpg
---
Recently at Yardstick, I completely rebuilt the server infrastructure for our high stakes online testing platform, Yardstick Measure.

We need our data in Canada, so we have some physical servers running VMWare ESXi. I set up five front-end servers to run the actual exams on, and other servers that do other things: handle the database, the admin interface, search, redis etc.

The front-end servers are load balanced behind a pair of firewalls configured in high availability. These firewalls can do simple load balancing. Great, right?

We did some load testing to see how our new setup would fare. We used [Neustar](http://www.neustar.biz/enterprise/web-performance/what-is-load-testing#.Uby0sPZAQb4) to spin up 1500 users writing exams to see what happened.

## Nuke it from orbit

<img src="{{.nuke_it.medium}}" class="fright bleft bbottom medium" />

First, at about the 900 user mark, we brought down the actual firewalls, hitting the connection limit that our license allowed. They were also a little misconfigured, as they weren't releasing dead/idle connections when they should have been.

This brought both Yardstick Measure and our T2 platform down for about **two hours**. We had to actually go down to the data centre and physically restart things.

We talked to the hardware vendor and we ended up getting a free software license upgrade to unlock the full potential of the hardware, with the understanding that we will buy new hardware. The ones we have are a little old, so we're getting a deal to upgrade the hardware (which is already at the office).

## Awe yeah

<img src="{{.fuck_yeah.medium}}" class="fright bleft bbottom medium" />

Once we upgraded our firewall licenses and fixed our settings we performed another load test. This went much better. The only errors we saw the entire time were a few random Selenium errors that come from Selenium being drunk. We went up to the full 1500 users and all of the servers performed admirably.

Load balancing worked beautifully as well. All five servers were getting fed essentially equal number of requests (HTTP requests) as told by NewRelic.

Since the load testing service uses Amazon EC2, all the users have their own public IP address.

## Not so simple

Remember when I said the firewall did *simple* load balancing? When I say simple, I mean lowest common denominator. They do round robin TCP load balancing.

During the actual exam administration, the load balancing didn't work quite as well. One server was doing 2500 req/min, another, 800, yet another, 1200.

How does that even work?

## Three Musketeers, err, packets

First of all, what even is a [TCP packet](http://en.wikipedia.org/wiki/TCP_packet#TCP_segment_structure)? Well it's a header and some data. The header has **source and destination ports**, flags, sequence numbers etc. The data is your HTTP request/response.

What about the IP part of TCP/IP? It's [another layer down](http://en.wikipedia.org/wiki/OSI_model). An [IP packet](http://en.wikipedia.org/wiki/IP_packet) wraps a TCP packet. It also has a header and some data. Its header has all sorts of fun things too, the important parts being the **source and destination IP addresses**.

But things talk over ethernet, right? So what about the [ethernet frame](http://en.wikipedia.org/wiki/Ethernet_frame)? The ethernet frame holds the IP packet. It has things like the **source and destination MAC addresses**.

## Cool story bro

So why do we care about all this?

These are all things we can use to identify where a packet came from and where it needs to go. Therefore, these are all things a load balancer can use to figure out how to, umm, balance load.

*Sort of.*

TCP is a **connection based** protocol. HTTP is a **request/response based** protocol. The browser opens a connection to the server, and can send multiple HTTP requests over that connection. This means the firewall load balances the connections, not the HTTP requests.

When a new connection is established, the firewall picks the next server in the round robin order, and all packets on that connection go to that server. It makes note of where the connection is going, and can then merrily route the TCP packets to the correct server. The load balancing part of things happens when the connection is made. Once that's done, it's just directing packets.

So if the load balancer is just routing TCP packets, how does it do that? How does it remember a connection?

Looking back at the 3 packets, we have all the information we need.

## MAC addresses

The source MAC address is actually useless to identify a connection. It only represents the network node that the frame just came from, not the original computer the request originated from. All the packets coming into the firewall probably have the same source MAC address, which is that of the upstream router at the data centre. It's basically just the next hop. Network switches use MAC addresses to figure out where packets need to go, but only in their localized world. So that's useless.

The destination MAC address, is that of the firewall itself. So that's also useless.

## Ports

The destination port will be the port the firewall is listening on, 80 and 443 for HTTP and HTTPs.

The source port, now there's something we can use. From [Tanenbaum](http://www.amazon.com/Computer-Networks-4th-Edition-ebook/dp/B00371V7RO) (2007, 4th ed):

> A port plus its host's IP address forms a 48-bit unique end point. The source and destination end points together identify the connection.

That's exactly what we want!

## IP addresses

Now, the source IP address can obviously be used in the balancing algorithm. See the previous quote from Tanenbaum.

So we're done then, right? After a connection is made, and the backend server chosen, the load balancer can look at the source port and IP to identify packets belonging to a TCP connection and route them to the server that was chosen when the connection was made.

## But what about NAT?

**Oh right, [NAT](http://en.wikipedia.org/wiki/Network_address_translation).**

Well, it works just fine. NAT just rewrites the source IP and port of outgoing packets (and destination IP and port of incoming packets), to match up packets from one side of the NAT with packets on the other side of the NAT. It's fine.

In fact, the firewall itself is doing NAT. It has the public IP on one end, and our private network on the other end. It has to alter the IP (and maybe port, not in our case, since 80 forwards to 80) of the packets *anyway* to do the NAT dance. Instead of always changing the IP to the same host (no load balancing, single backend server), it uses the IP it remembered when it balanced the connection.

## All done…?

That pretty much explains TCP load balancing: pick a backend server when the connection is established and then route subsequent packets based on the source IP and port to the server you picked earlier (simple lookup table).

It's actually so simple to implement in userland that the [balance](http://www.inlab.de/balance.html) program does it in less than 1800 lines of C, and it does a bunch of stuff that's above and beyond basic TCP load balancing.

Here's my (basic) solution in 80 lines of Go:

<script src="https://gist.github.com/darkhelmet/5790838.js"></script>

In a userland implementation, you `accept` on a socket, then dial out to a backend. You end up with handles to two connections, and you can just copy things between the two. Simple.

## netfilter and iptables

In both `balance` and my implementation, we `listen`, `accept`, and move bytes around. You can do this by just intercepting and mangling packets using [netfilter](http://en.wikipedia.org/wiki/Netfilter), which is how `iptables` does its thing. Its not really *listening* in the traditional sense, but can receive, process, and forward packets given some rules.

You'll have to do some hardcore `iptables` reading to figure out the best way to do that, though [the examples here](http://linuxgazette.net/108/odonovan.html) look pretty legit (I have not tried them).

This method is probably the method the firewall is using to balance things. No explicit listening, just shuffling packets.

## In the browser, and fin

So the web browser opens a couple connections to the server, and those connections (not requests made on the connection) get balanced. Multiple HTTP requests go on each connection.

How does that explain the poor balancing we saw during the real exam compared to the load testing? I can't really say for sure.

The load test is quite predictable. Our script logs in, starts the exam, answers each question twice with a random answer, with random pause times in between, and moves on through the questions.

Real users aren't quite as predictable. They could be clicking around between the questions a lot, answering questions multiple times quickly, etc.

The browser used by the load test, driven by Selenium, was Firefox running on Ubuntu. The real browser used by candidates was a custom Locked Down Browser on various installs of Windows that uses the IE engine.

So we have a different pattern of usage, and a different technology stack on the client. Not exactly an apples to apples comparison.

* Maybe the clients decided that once they got going, they only needed one connection open to the server, and connections were closed unevenly (from the load balancer's point of view).
* Maybe the load balancer closed idle connections unevenly.
* Maybe the load balancer software had a bug and was using sticky connections even though we told it not to.

Seriously though, why was it drastically different between the load test and the real thing?

Who knows. Computers are hard.

What I do know is that skipping the load balancing in the firewall and using something like HAProxy in `http` mode should result in a much more even balance.

*Thanks to Mark Imbriaco and Devin Doucette for reviewing this article.*

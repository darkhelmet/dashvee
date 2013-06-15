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
---
Recently at Yardstick, I completely rebuilt the server infrastructure for our high stakes online testing platform, Yardstick Measure.

We need our data in country, so we have some physical servers (Dell R510's if memory serves), running VMWare ESXi. I set up five front-end servers to run the actual exams on, and other servers that do other things: handle the database, the admin interface, search, redis etc.

The front-end servers are load balanced behind a pair of firewalls configured in high availability. These firewalls can do simple load balancing. Great, right?

We did some load testing to confirm our new setup would fare. We used [Neustar](http://www.neustar.biz/enterprise/web-performance/what-is-load-testing#.Uby0sPZAQb4) to spin up 1500 users writing exams to see what happened.

## Oh shit everything's breaking

First, at about the 900 user mark, we brought down by the actual firewalls as we hit the connection limit that our license allowed. They were a little misconfigured, as they weren't releasing dead/idle connections when they should have been.

This brought both Yardstick Measure and our T2 platform down for about **two hours**. We had to actually go down to the data centre and physically restart things.

We talked to the hardware vendor and we ended up getting a free software license upgrade to unlock the full potential of the hardware, with the understanding that we will buy new hardware. The ones we have are a little old, so we're getting a deal to upgrade the hardware (which is already at the office).

## Awe yeah

Once we upgraded our firewall licenses and fixed our settings we performed another load test. This went much better. The only errors we saw the entire time were a few random Selenium errors that come from Selenium being drunk. We went up to the full 1500 users and all of the servers performed admirably.

Load balancing worked beautifully as well. All five servers were getting fed essentially equal number of requests as told by NewRelic.

Since the load testing service uses Amazon EC2, all the users have their own public IP address.

## Not so simple

Remember when I said the firewall did *simple* load balancing? When I say simple, I mean lowest common denominator. They do round robin TCP load balancing.

During the actual exam administration, the load balancing didn't work quite as well. One server was doing 2500 req/min, another, 800, yet another, 1200.

How does that even work? Let's find out.

## Three Musketeers, err, packets

As I said, the firewall does TCP load balancing. What's a [TCP packet](http://en.wikipedia.org/wiki/TCP_packet#TCP_segment_structure)? Well it's a header and some data. The header has **source and destination ports**, flags, sequence numbers etc. The data is your HTTP request/response.

But where does IP come in? An [IP packet](http://en.wikipedia.org/wiki/IP_packet) wraps a TCP packet. It also has a header and some data. It's header has all sorts of fun things too, the important parts being the **source and destination IP addresses**.

But things talk over ethernet, right? So what about the [ethernet frame](http://en.wikipedia.org/wiki/Ethernet_frame)? The ethernet frame holds the IP packet. It has things like the **source and destination MAC addresses**.

## Cool story bro

So why do we care about all this? These are all things we can use to identify where a packet came from and where it needs to go. Therefore, these are all things a load balancer can use to figure out how to, umm, balance load.

*Sort of.*

If the load balancer is just routing TCP packets, it needs to make sure all packets from a single client go to the same backend host. It's not analyzing the HTTP request (like HAProxy in `http` mode would), and a single HTTP request can be made up of multiple TCP packets.

So anyway, we have a port, an IP address, and a MAC address for each of the source and destination. Let's see if they're actually useful.

## MAC addresses

The "source" MAC address is actually kind of useless for this purpose. It only represents the network node that the frame just came from, not the original computer the request originated from. This means it's the MAC address of the upstream router at the data centre, owned by the ISP or something like that. It's basically just the next hop. Network switches use MAC addresses to figure out where packets need to go, but only in their localized world. So that's useless.

The destination MAC address, is that of the firewall itself. So that's also useless.

## Ports

The destination port will be the port the firewall is listening on, 80 and 443 for HTTP and HTTPs.

The source port, now there's something we can use. From [Tanenbaum](http://www.amazon.com/Computer-Networks-4th-Edition-ebook/dp/B00371V7RO) (2007, 4th ed):

> A port plus its host's IP address forms a 48-bit unique end point. The source and destination end points together identify the connection.

Now we're getting somewhere. We should be able to use the source port somewhere to decide where to route packets.

## IP addresses

Now, the source IP address can obviously be used in the balancing algorithm, right? See the previous quote from Tanenbaum.

So we're done then, right? The load balancer can look at the source port and IP to identify packets from a unique host, and send them to a server.

## But what about NAT?

**Oh right, [NAT](http://en.wikipedia.org/wiki/Network_address_translation).**

Well, it should still work just fine. NAT rewrites the source IP and port of outgoing packets (and destination IP and port of incoming packets), so it's still unique, even for multiple hosts behind a NAT (like multiple candidates at a test centre). So that's fine.

## All done…?

That pretty much explains TCP load balancing: route packets based on the source IP and port. The browser opens a couple connections to the server, and those connections (not requests made on the connection) get balanced. Multiple HTTP requests go on each connection.

So how does that explain the poor balancing we saw during the real exam compared to the load testing? I don't really know.

Initially I thought it was because the only piece of usable information was the source IP address. I had it in my head that the source port couldn't be trusted, due to NAT. Working it all out in my head, learning more about NAT, and thinking logically about it means the source port is fine to use. In fact, it's sort of required.

The load test is quite predictable. Our script logs in, starts the exam, answers each question twice with a random answer, with random pause times in between, and moves on through the questions.

Real users aren't quite as predictable. They could be clicking around between the questions a lot, answering questions multiple times quickly, etc.

The browser used by the load test, driven by Selenium, was Firefox running on Ubuntu. The real browser used by candidates was a custom Locked Down Browser on various installs of Windows that uses the IE engine.

So we have a different pattern of usage, and a different technology stack on the client. Not exactly an apples to apples comparison.

* Maybe the clients decided that once they got going, they only needed one connection open to the server, and connections were closed unevenly (from the load balancer's point of view).
* Maybe the load balancer closed idle connections unevenly.
* Maybe the load balancing algorithm was old and terrible, and it wasn't actually using the source port at all, only the IP address, so many hosts behind a NAT would end up on a single server. This would mesh with EC2 vs NAT.

So why was it drastically different between the load test and the real thing?

Who knows. Computers are hard.

What I do know is that skipping the load balancing in the firewall and using something like HAProxy in `http` mode should result in a much more even balance.
--- 
id: 473
author: Daniel Huckstep
title: Deploying Your Ruby App With Mongrel2
category: software
description: I show you how to get up and running with Mongrel2 and Ruby.
published: true
publishedon: 26 Oct 2010 08:00 MDT
slugs: 
- deploying-your-ruby-app-with-mongrel2
tags: 
- ruby
- rails
- rack
- mongrel2
- zeromq
- json
- nginx
- passenger
---
If you're in the ruby world, and specifically the web side of the ruby
world (Rails, Sinatra, etc), you should probably know who Zed Shaw is. I
mean, he only wrote [mongrel](http://github.com/fauna/mongrel), which
you're probably using as your application server.

Well, he's been hard at work on [Mongrel2](http://mongrel2.org/), and
it's a big change from the original mongrel.

Mongrel2 isn't a ruby web server. It's (and I'm going to borrow straight
from the site):

> Mongrel2 is an application, language, and network architecture
> agnostic web server that focuses on web applications using modern
> browser technologies.

Badass right? Badass, but once your start reading a little more it's
gets kind of confusing, but then you read a bit more, and it makes
sense.

Since Mongrel2 is focused on (among other things) language agnosticism,
it doesn't *run* your application. It can accept connections from the
web (or another frontend server, which we'll talk about later) and sends
it off to something that can handle the request. That thing could be a
proxy (it can do HTTP proxy stuff), a file serving module (you can point
it at a directory), but the really cool one is what Mongrel2 calls
*handlers*.

## Handlers

Let's say you have a rails application. Let's say it's popular. You
could setup a few servers, HAProxy, and all that crap, or you could
probably just setup one instance of Mongrel2, and crank up app servers
as needed.

Mongrel2 uses [ZeroMQ](http://www.zeromq.org/) for handlers, which
basically give it load balancing for free. It allows you to configure a
few simple zeromq values for a handler, so your application can connect
to Mongrel2 and start to receive requests. You can then just turn on
more app servers, and have them all connect to the same Mongrel2
instance, and they all get load balanced. If one dies, no big deal, it
just won't handle requests until your process monitor starts it back up
and it connects again (you do have a process monitor in place, right?).

This is the killer feature of Mongrel2.

## Configuring Mongrel2

Let's look at a simple config file for Mongrel2. It actually uses
SQLite, but you start off with a config file to make life easy.

<script src="http://gist.github.com/646037.js?file=mongrel2.conf"></script>

Mongrel2 config files were originally python so you get a few things,
like variables. We define a *rails_host* **Host**, which just deals
with the hostname, and what routes it responds to. Then for the main
route (and hence all routes), we map a **Handler** to it. This is where
the zeromq stuff comes in: it sends requests using TCP, binding on
localhost port 9997, and receives responses using TCP, binding on
localhost port 9996. In our application (backend server) we can connect
to these using zeromq, start receiving requests and serving responses.
Everything is kept track of by a connection ID (the handler writer takes
care of that) and the UUID (you have to play with that). In this case,
we're just using *rails* as the UUID, but Mongrel2's utility *m2sh* will
generate "proper" UUIDs for you if you want.

Now we can define a **Server** and assign that to the list of servers
(in an array of course). The **Server** has things like where log and
pid files are, which hosts it deals with, and what port it binds on (the
one you'll hit in your browser).

## Running Mongrel2

Now that you have your mongrel2.conf (put that in your root rails
directory), you can load up Mongrel2. Install it from [the
website](http://mongrel2.org/wiki?name=GettingStarted) or use
[homebrew](http://github.com/mxcl/homebrew) if you're on a Mac
(`brew install mongrel2`). In your rails directory, make the run
directory (`mkdir run`) and load up the Mongrel2 config

    $ m2sh load

It'll whine that no SQLite DB or config file was specified but that it's
using defaults. That's fine.

Now since Mongrel2 isn't a ruby thing, we have to start it on it's own.
It can stay running the whole time, so don't worry about that. Start it
up:

    $ m2sh start -host localhost -sudo

That `-sudo` bit just makes it daemonize. It'll change users and chroot,
and generally be awesome. Mongrel2 should be running now. You'll see
something like this:

<script src="http://gist.github.com/646037.js?file=output.txt"></script>

Notice the last line; everything worked!

## Running your app

We need the rack handler I wrote, so throw some extra stuff in your `Gemfile`

    gem "rack-mongrel2"
    gem "json"

You need something to parse JSON. I prefer Yajl since it's nice and
fast, but the JSON gem (pure or ext) works fine too. Also, check out the
[github repo](http://github.com/darkhelmet/rack-mongrel2) for the
`rack-mongrel2` gem. I put it together while taking a lot of code from
the [m2r project by perplexes](http://github.com/perplexes/m2r) as the
code was good and I learned from it, but it just wasn't organized into a
rack handler gem to my liking. Anyway. He deserves some props.

Bundle that up.

    $ bundle update

Now we can crank up the rails app.

    $ RACK_MONGREL2_UUID=rails rails s Mongrel2

You'll see that it's booting Mongrel2, but then it spits out the
standard "0.0.0.0:3000" crap. Don't worry about that. I haven't figure
out how to prevent that from spitting out yet.

Open your browser to [http://localhost:8080](http://localhost:8080) (remember the **Server** had `port=8080`) and you should see logs from Rails come flying out your console like normal, and the page load up. Boom. Mongrel2 + Rails.

## More fun things

If you daemonize Rails (`-d`) you can run multiple instances of the
application (just remember to point it at different pid and log files if
you're in the same directory), and it'll just work. Just keep hitting
Mongrel2.

You could probably still stuff nginx in front of Mongrel2 to handle file
serving (something it doesn't do right now…well it does file serving,
but not like nginx + passenger would) or gzipping, or you can just let
Rails serve the files, and there is middleware to do gzipping in rack
too. You could also configure Mongrel2 to serve specific files by using
a **Host** with a route for the app **Handler**, and another for **Dir**
file serving stuff (consult the manual for that).

## Fine print

CTRL+C doesn't work. It's a zeromq thing, and they're fixing it in the
2.1.x line, but we're on 2.0.9.

## Fin

That's it! Start playing with it. Report `rack-mongrel2` bugs [on
github](http://github.com/darkhelmet/rack-mongrel2/issues) and I'll get
at them!

If you want to check a "full" app, already setup, check out
[http://github.com/darkhelmet/mongrel2-example](http://github.com/darkhelmet/mongrel2-example).

Thanks to [drnic](http://twitter.com/drnic) for wrapping up the last
couple of things on it.

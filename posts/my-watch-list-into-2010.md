--- 
id: 445
author: Daniel Huckstep
title: My Watch List, Into 2010
category: software
description: Want to know what I'm keeping track of into 2010? This is it.
published: true
publishedon: 14 Feb 2010 08:00 MST
slugs: 
- my-watch-list-into-2010
tags: 
- ipad
- rails
- evan-phoenix
- ironruby
- youtube
- html5
- rubinius
- sli
- google
- css3
- vimeo
- hiphop
- sinatra
- heroku
- golang
- ruby
- blake-mizerany
- adam-wiggins
- maglev
---
Lots of interesting things are afoot, and I try to keep track of them.
Here's what I'm watching.

## Rails 3

Lots of new changes are coming with Rails 3, and it's pretty exciting. I
wrote about some of the cool ones
[here](http://blog.darkhax.com/2010/02/06/rails-3-release-notes-what-does-it-mean-to-you).
Rails is shaping up to be faster, more modular, and generally better and
easier to work with. With all the smart people working on it, you don't
have to look very hard to realize this is going to be a big release, and
is only going to pull in more developers to this already great
framework.

## Sinatra 1.0

[Blake Mizerany](http://github.com/bmizerany) made the [first
commit](http://github.com/sinatra/sinatra/commit/72be291da2bf7a5e2dacf8b9119a258d8db53c43)
to Sinatra in September of 2007, and since then it's picked up a lot of
steam. It quickly became one of, if not the most popular
micro-framework, even sticking its nose into the Rails world with Metal
routers:

[Rails Metal, Rack, and
Sinatra](http://www.slideshare.net/adamwiggins/rails-metal-rack-and-sinatra)

I personally love Sinatra. It's small, allows you make fast, simple (and
even more complex) web applications, with minimal hassle. This blog runs
on Sinatra, for example. Sinatra 1.0 will break some things, and hence
**won't** be backwards compatible, but it cleans up the code and
tightens up the API a bit, making it the best lean mean web application
micro-framework machine.

## iPad

I wrote about [why I won't be buying an iPad
(yet)](http://blog.darkhax.com/2010/02/01/why-i-won-t-be-buying-an-ipad-yet)
already, but that doesn't mean I don't care. It's a good looking device,
HTML5 videos [play in the
browser](http://twitter.com/peterc/status/8928582766) and it will allow
me to sit comfortably in bed and do almost nothing, pushing the time I
get out of bed on a Saturday further into the afternoon.

I'm still excited about this device, but the big kicker for me is I
really want it to have a camera. I'll wait for the 2nd generation.

## Ruby VM's

For production ruby apps, there are really only a few VM options for
stable results. There's the tried and true MRI, with versions 1.8.6,
1.8.7, and 1.9.1. You've got [Ruby Enterprise Edition
(REE)](http://www.rubyenterpriseedition.com/), which is based on 1.8.7,
giving you some performance and memory boosts, but seems to leave out
some things, [continuations being one of
them](http://twitter.com/lsegal/status/7293701988). JRuby is also an
accepted stable VM and allows developers to run ruby applications (like
Rails!) on the [Google App Engine](http://code.google.com/appengine/).
Those are all fine and dandy, but there are other VM's on the way out
the door that are shaping up to be, well, awesome.

### MagLev

[MagLev](http://maglev.gemstone.com/) is coming from the depths of
Smalltalk and as such the VM is built on years of Smalltalk VM
experience. It also has an object persistence system so that multiple
ruby application can access shared resources with the need of a separate
database. It looks pretty slick, and I'm excited about it.

[MagLev presentation at RailsConf 2008](http://vimeo.com/1147409)

### Rubinius

[Rubinius](http://rubini.us/) is written in C++ and leverages the
[LLVM](http://llvm.org/) infrastructure to do all the hard work. It's
almost at 1.0 status at the time of writing (there's a 1.0.0-rc2 out),
and is pretty fast. It's gaining quite a following and once it hits 1.0
it will be a solid contender, possibly pushing out REE as 'the other
ruby VM'.

[Rubinius - RubyConf
2009](http://www.slideshare.net/evanphx/rubyconf-2009)

### IronRuby

[IronRuby](http://ironruby.net/), along with all the other 'Iron'
languages (python, scheme, etc), is an implementation that runs on the
.NET framework. This is just cool, because it brings the awesome that is
ruby to the Windows world in ways that JRuby and regular ruby for
Windows just don't. There's even a gem to allow other .NET languages [to
be used inline](http://github.com/rvernagus/IronRubyInline). It'll never
take over as a dominant VM, but it bridges the gap between ruby and the
.NET world, allowing developers to use the best language to solve a
problem, even if the problem requires different languages. IronRuby also
allows ruby to be used in other .NET application, so you could write a
C# app, and throw some ruby in. Sweet!

[IronRuby](http://www.slideshare.net/BenHalluk/ironruby)

### MacRuby

[MacRuby](http://www.macruby.org/) is for those running OS X Snow
Leopard only, but it has its perks. It's built on technologies in the
operating system, so you get the garbage collection system, [Grand
Central Dispatch
support](http://www.macruby.org/documentation/gcd.html), and HotCocoa
support, so you can write 'native' Mac applications. You even get access
to other objective-c frameworks, all for free.

## Go Programming Language

Google's new [Go Programming Language](http://golang.org/) is pretty
awesome. I haven't really got to play with it much, but the homepage
informs you of the awesomeness: it's fast (to run and compile), safe,
concurrent, and open source. It's billed as a systems programming
language, meant for the same type of thing you'd use C for. There's lots
of development happening with it, so it's moving fast. I am definitely
going to leverage this language where appropriate.

[The Go Programming
Language](http://www.youtube.com/watch?v=rKnDgT73v8s&feature=player_embedded)

OMG Rob Pike! \*squeeee\*

## HipHop

While I try to avoid PHP whenever possible, new compiler technology is
always cool. I'd like to try to compile Wordpress with HipHop and see
what happens.

## HTML5

[HTML5](http://www.w3.org/TR/html5/) is shaping up to be a pretty good
looking standard, at least on paper. I've dealt with a little bit of the
new media tags (video and audio), and while I'm excited, they have to
progress a bit more. The bonuses are that you don't need flash, so while
videos don't play in Mobile Safari on the iPhone, they will open up
directly in the video player. According to
[@peterc](http://twitter.com/peterc), they do [play directly in the
browser on the iPad](http://twitter.com/peterc/status/8928582766).

The downside (and why it needs to progress) is that with flash, you do
it once (although still with two different tags, embed and object),
while with the video tag, you need two separate videos: one for Firefox,
and one for Safari (Chrome will play either, apparently). Oh, and it
doesn't work in Internet Explorer either, so there's that too.

HTML5 should end up pretty good, but it needs to mature, so I'll be
watching it.

## CSS3

HTML5 is cool, but I'm more excited about CSS3. There are some CSS3
things powering this blog, like the rounded corners, but it's still not
quite CSS3. There is a **-moz-border-radius** property, a
**-webkit-border-radius**, and finally a CSS3 **border-radius**. This is
because CSS3 isn't finalized yet, and some of the selectors don't work
in all browsers, so they have their own little selector to make it work.
It's like IE Filters but not quite as bad, because at least they are
based on things that will become standards. CSS3 should allow you to
make some fancy looking things, much easier than before, and I'm
excited.

## Heroku

I ♥ Heroku. This blog runs on it, as well as a few other of my
applications. I love it, and it's only getting better. I'm in the beta
program, so I get to see fancy things before they go completely live,
and I can't really talk about much of it here, except that there are
some nice improvements coming. Frankly, unless your application has
really specific needs, I can't see much of a reason to use any other
hosting provider if you are using rocking a ruby rack based application.

Well that's it. That's some of the stuff I'm looking forward to. There
are other things on my list, but I either can't think of all of them, or
they aren't worth writing about right now.

What are you excited about?

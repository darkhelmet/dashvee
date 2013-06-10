--- 
id: 368
author: Daniel Huckstep
title: ruby-openid IOError With Passenger
category: programming
description: Fix IOErrors with passenger and openid.
published: true
publishedon: 28 May 2009 08:00 MDT
slugs: 
- ruby-openid-ioerror-with-passenger
tags: 
- ruby
- rails
- apache
- openid
- passenger
---
The ruby-openid gem was giving me problems with Passenger, causing
IOError problems.

I found the fix
[here](http://groups.google.com/group/phusion-passenger/browse_thread/thread/30b8996f8a1b11f0/ba4cc76a5a08c37d?hl=en&lnk=gst&q=openid#ba4cc76a5a08c37d)

The gist of it?

Add `OpenID::Util.logger = RAILS_DEFAULT_LOGGER` to environment.rb, and you're good!

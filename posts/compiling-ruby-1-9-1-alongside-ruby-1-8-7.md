--- 
id: 357
author: Daniel Huckstep
title: Compiling Ruby 1.9.1 Alongside Ruby 1.8.7
category: programming
description: Before the days of rvm, this is how you compiled ruby 1.8.7 alongside 1.9.1.
published: true
publishedon: 16 May 2009 08:00 MDT
slugs: 
- compiling-ruby-1-9-1-alongside-ruby-1-8-7
tags: 
- ruby
---
I almost threw my laptop out the window figuring this out, but if you
want to install ruby 1.9.1 alongside ruby 1.8.7 (whether the prefix is
the same or not), you have to give ruby 1.9 a program suffix, but
**also** a baseruby.

So you need something like this:

    ./configure --prefix=$HOME/local --program-suffix=1.9 --with-baseruby=ruby --enable-pthread

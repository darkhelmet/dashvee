--- 
id: 380
author: Daniel Huckstep
title: Debugging Cucumber On Rails
category: programming
description: Some cool debugging behaviours for cucumber.
published: true
publishedon: 14 Jun 2009 08:00 MDT
slugs: 
- debugging-cucumber-on-rails
tags: 
- ruby
- rails
- testing
- cucumber
- debugging
---
I like frameworks, but sometimes debugging them is more entertaining. I
don't know why I didn't think of this method before, but
[mischa](http://github.com/mischa) on [github](http://github.com/) has a
great little repo showing how you can do it.

The README

> Usage:
>
> Add:
>
> require 'ruby-debug'
> require 'cucumber_rails_debug/steps'
>
> To features/support/env.rb
>
> Then use:
>
> Then debug # opens the debugger
>
> or
>
> Then what # prints out params, url and html

Check it out [here](http://github.com/mischa/cucumber_rails_debug)

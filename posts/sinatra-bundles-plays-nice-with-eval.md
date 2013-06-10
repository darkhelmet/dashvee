--- 
id: 447
author: Daniel Huckstep
title: sinatra-bundles Plays Nice With Eval
category: programming
description: I patch a bit of a bug in sinatra-bundles, and now it plays nice with eval.
published: true
publishedon: 21 Feb 2010 17:08 MST
slugs: 
- sinatra-bundles-plays-nice-with-eval
tags: 
- sinatra-bundles
- ruby
- rubygems-org
---
I recently added a Javascript file to my bundle with
[sinatra-bundles](http://github.com/darkhelmet/sinatra-bundles) that
uses Javascript's `eval` functionality. The call to `eval` executed code
that referenced a method parameter. sinatra-bundles compresses
Javascript files, and as part of that, shrinks variable names.

Normally this isn't a problem, but in *this* case of `eval`, it became a
problem, since it was trying to reference a local variable that no
longer existed (because it got shrunk to something like `a`).

In
[this](http://github.com/darkhelmet/sinatra-bundles/commit/febdfbbdcddba331c04b353bb857a40283f20814)
commit, I rearranged a bunch of stuff, upgraded some stuff, but I also
fixed this. It's straight forward, and only shrinks variables if the
Javascript doesn't include the string `eval(`.

If you need this functionality, use the new version 0.1.3, which can be
found on [rubygems.org](http://rubygems.org/gems/sinatra-bundles).
Install with

    $ gem install sinatra-bundles

Enjoy!

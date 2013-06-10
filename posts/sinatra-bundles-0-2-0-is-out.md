--- 
id: 455
author: Daniel Huckstep
title: sinatra-bundles 0.2.0 Is Out
category: software
description: I announce version 0.2.0 of sinatra-bundles.
published: true
publishedon: 02 Apr 2010 21:05 MDT
slugs: 
- sinatra-bundles-0-2-0-is-out
tags: 
- sinatra
- sinatra-bundles
- ruby
---
I pushed up a new version of
[sinatra-bundles](http://github.com/darkhelmet/sinatra-bundles) and it's
running smoothly on my blog here, so I best tell you about it.

First, get your bundle on:

    % gem install sinatra-bundles

    require 'sinatra/bundles'

Version 0.2.0 has a couple fun things.

The [sinatra](http://github.com/sinatra/sinatra) dependency is bumped up
to 1.0, since it's out
(yay!), it's more awesome, and I'm not quite sure if the bug that prevented me from using earlier sinatra was fixed or not in the 0.9.6 release.

## etag support

[Patrick Hogan](http://github.com/pbhogan) added [etag support](http://github.com/darkhelmet/sinatra-bundles/commit/140cd0e23285519fa03727dde9c47365824e9af2) for the caching component, since I wasn't doing it. My thought was *just use rack-etag*, but as Patrick pointed out you then have to remember to use rack-etag. Since sinatra-bundles should do the caching for you, it now does it more completely, with etags. He even wrote specs to boot)

## Wildcards and globbing

He also added wildcard support, which I understood to be splats and
whatnot for grabbing a bunch of files, but it didn't really work too
well for me, so I messed around with it and made it work the way I felt
it should, so now you can splat things:

    = javascript_bundle(:test, %w(test/*))

which would grab things in the test directory. You can use standard ruby
directory globbing things in there, so have fun. I did have to write
specs for that feature though; it's okay Patrick, I forgive you! :)

If you want to include all files, and order isn't important (or
alphabetical is what you want), you don't even have to specify a list of
files!

    = javascript_bundle(:all)

That will include all files in the javascript directory.

## Internal caching

Before, sinatra-bundles would regen the bundle every time. It gets
cached, so in theory you shouldn't be hitting that path all the time,
but it was still kind of lazy. Now it caches the bundle so it doesn't
get regenerated each time.

So basically, I did almost nothing for this release. I cleaned up some
things and bumped some version, but Patrick did most of the work. Thanks
Patrick!

That's all for now. I have some other features I'd like to add, but they
don't actually benefit me personally. If you use sinatra-bundles and
what to help, check the
[issues](http://github.com/darkhelmet/sinatra-bundles/issues) list to
see what's up and maybe even add a feature.

That's what open source is all about! Happy bundling.

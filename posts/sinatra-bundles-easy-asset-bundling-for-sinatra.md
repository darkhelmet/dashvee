--- 
id: 437
author: Daniel Huckstep
title: "sinatra-bundles: Easy Asset Bundling For Sinatra"
category: programming
description: I announce my new ruby gem for bundling Javascript and stylesheet assets in the sinatra web framework.
published: true
publishedon: 13 Jan 2010 08:00 MST
slugs: 
- sinatra-bundles-easy-asset-bundling-for-sinatra
tags: 
- github
- sinatra-bundles
- ruby
---
**sinatra-bundles** is an easy way to bundle CSS and Javascript assets
in your sinatra application.

Yes! It has tests! They are on
[runcoderun](http://runcoderun.com/darkhelmet/sinatra-bundles)

## Usage

**sinatra-bundles** combines Javascript and CSS into one file. Meaning,
you can bundle 2 or more Javascript files into one, similar with CSS
stylesheets. Any bundled files are expected to be in the public
directory, under 'javascripts' and 'stylesheets'

Assuming you have the following files in public:

    ./stylesheets/reset.css
    ./stylesheets/fonts.css
    ./stylesheets/grid.css
    ./javascripts/jquery.js
    ./javascripts/lightbox.js
    ./javascripts/blog.js

You can bundle these files in your app like this:

Install:

    % [sudo] gem install sinatra-bundles

In your app:

<script type="text/javascript" src="http://gist.github.com/276827.js?file=basic_bundling.rb"></script>

Then in your view, you can use the view helpers to insert the proper
script tags:

    = javascript_bundle_include_tag(:all)
    = stylesheet_bundle_link_tag(:all)

All 6 of those files will be served up in 2 files, and they'll be
compressed and have headers set for caching.

## Configuration

The defaults are pretty good. In development/test mode:

    bundle_cache_time # => 60 * 60 * 24 * 365, or 1 year
    compress_bundles # => false
    cache_bundles # => false
    stamp_bundles # => true

And in production mode, compression and caching are enabled

    compress_bundles # => true
    cache_bundles # => true

To change any of these, use set/enable/disable

<script type="text/javascript" src="http://gist.github.com/276827.js?file=bundling_configuration.rb"></script>

That's pretty much it. My blog uses this, so check out the code for it
if you want a more real example. [It's on
github](http://github.com/darkhelmet/darkblog)

**sinatra-bundles** is [also on
github](http://github.com/darkhelmet/sinatra-bundles)

There are docs, and you can run *rake yard* to generate them, but
rdoc.info and yardoc.org don't want to place nice right now, so they
aren't actually available yet. ~~Coming soon though!~~ Docs are located
[on yardoc.org](http://yardoc.org/docs/darkhelmet-sinatra-bundles)

The caveat? You need sinatra 0.10.1 (edge).

Fork away, report bugs, and submit patches! Go on now my pretties!

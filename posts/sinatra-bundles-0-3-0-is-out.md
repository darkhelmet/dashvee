--- 
id: 465
author: Daniel Huckstep
title: sinatra-bundles 0.3.0 Is Out
category: software
description: Version 0.3.0 of sinatra-bundles is out! Go get it!
published: true
publishedon: 12 Jul 2010 13:06 MDT
slugs: 
- sinatra-bundles-0-3-0-is-out
tags: 
- sinatra-bundles
- sinatra
- ruby
---
Version 0.3.0 of
[sinatra-bundles](http://github.com/darkhelmet/sinatra-bundles) is out
and powering the blog for a week or so.

It's cold out there, so bundle up:

    % gem install sinatra-bundles

    require 'sinatra/bundles'

Version 0.3.0 has a new feature and a slight API change.

## Custom path prefixes

Yeah, I know, not everybody is as awesome as I am with their stylesheets
and javascript files in the *stylesheets* and *javascripts* directories,
but now you can control where they live on the disk.
[docunext](http://github.com/docunext) added this and the specs all work
so it's good to go. You can configure this like so:

    set(:js, 'js')
    set(:css, 'css')

Now, instead of looking in *public/javascripts* and
*public/stylesheets*, it will look in *public/js* and *public/css* for
your files. Cool huh?

## Different URL

Before, the URL that was generated for a bundle had the timestamp after
the URL as part of the query string. This is fine, but some caching
proxies don't like this. Squid, with default settings, won't cache those
things. Now, the timestamp is in the URL in a better way. You don't have
to do anything, it just works. View source on this page if you want to
check it out.

That's all for now. I have some other features I'd like to add, but they
don't actually benefit me personally. If you use sinatra-bundles and
what to help, check the
[issues](http://github.com/darkhelmet/sinatra-bundles/issues) list to
see what's up and maybe even add a feature.

Happy bundling.

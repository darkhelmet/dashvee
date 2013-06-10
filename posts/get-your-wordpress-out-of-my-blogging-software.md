--- 
id: 410
author: Daniel Huckstep
title: Get Your Wordpress Out Of My Blogging Software
category: programming
description: I built my own blog engine on sinatra, come check it out.
published: true
publishedon: 14 Sep 2009 21:58 MDT
slugs: 
- get-your-wordpress-out-of-my-blogging-software
tags: 
- sinatra
- ruby
- heroku
- wordpress
---
Hopefully you didn't notice much, except the speed increase, but my blog
is no longer on the behemoth that is Wordpress.

While Wordpress served me well for quite some time on my [other
blog](http://blog.darkhelmetlive.com/) it always kind of bugged me.

Well no more! I took a couple days (basically 2 full days and 2
evenings) and wrote my own little blogging engine from scratch. You can
find it on [github](http://github.com/darkhelmet/darkblog) and get
forking if you so choose.

## What I used:

### [ruby](http://www.ruby-lang.org/) and [sinatra](http://www.sinatrarb.com/)

They are pretty much my tools of choice as of late, so of course.

### [haml](http://haml-lang.com/) and builder

Haml for HTML, builder for sitemap and the RSS feed.

### will_paginate

For paging things. I had to grab the branch for non-rails usage, since
it doesn't play nice otherwise.

### ActiveRecord

The ORM. I love AR, and it plays with…

### acts_as_taggable_on_steroids

For handling tags on posts.

### RedCloth

For markup. Textile is the bomb!

### [messagepub](http://messagepub.com/)

I send notifications of problems to my hosted FogBugz account using
messagepub.

### [DIsqus](http://disqus.com/)

Disqus handles all the comments.

### Extra Bits

Some extra things I use are:

-   crack
-   restclient
-   www-delicious
-   feedzirra
-   twitter

Those are mainly to handle the top panel.

I had the theme HTML and CSS already done from my Wordpress setup, so
that was easy to port over. I didn't even touch the stylesheet. Using
haml and partials made life easy, especially when it came to porting my
jQuery post inline script ([in
action](http://blog.darkhax.com/2009/07/09/wordpress-multipart-posts-inlined-with-jquery-part-2)),
since I could just render the partial when the request was made from
jQuery. In Wordpress I rendered the entire page and parsed out the part
I wanted. Lame.

Heroku hosts everything, and I've had a few problems here and there, but
most have been little stupid bugs on my part.

I use etags (rack-etag middleware) and max-age so that the Heroku system
and other systems can cache everything they need. Static assets are set
to 1 year with the `rack-static_cache` middleware.

The top panel holds my shared items from Google Reader, my latest
bookmarks from Delicious, my latest posts to Twitter, and some of my
random Github repositories. On top of the entire request being cached,
these items are retrieved and then cached in the database using
ActiveRecord. The cache checks the age of items, and returns either the
database contents if the item is still valid, or if the item is old,
yields a block, stores that result in the database and then returns it.
Basically my little poor-man's memcached. The entire cache code is:

<script type="text/javascript" src="http://gist.github.com/187098.js?file=cache.rb"></script>

I also implemented a simple redirection system. When I update a post, if
will check to see if the permalink is going to change, and if it does,
it creates a Redirection. When you hit the old URL, it first checks to
see if any post matches the permalink, and then if none is found, checks
redirections. If it find a redirection, it will 301 redirect you to the
new URL. Win.

ActiveRecord stores things in UTC, and display times are all
*America/Edmonton* thanks to tzinfo.

## What did I gain?

-   My blog is more stable. This meaning that occasionally Shaw likes to
    drop my internet connection, sometimes for a few hours. Not that
    thousands of people are reading this, but having 100% uptime (pretty
    much) is nice.
-   My blog is faster. Much faster. Doing everything myself, instead of
    working with Wordpress, I could make it all work the way I wanted.
    Things are cached appropriately, and as a result the blog is much
    snappier. Wordpress was a dog, even with all the caching tweaks I
    added to it.
-   My blog has the bandwidth. Running my Wordpress based blog from home
    wasn't a problem when it came to CPU power. My server is a dual core
    AMD running 64-bit Ubuntu 8.04.2 with 4 GB of RAM, so my upload
    bandwidth was the bottleneck. With Heroku, at least I have some
    bandwidth.

Overall I feel much better about my blog, and am very happy with it.
What do you think?

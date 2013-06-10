--- 
id: 378
author: Daniel Huckstep
title: Supercharge Wordpress
category: software
description: Speed up Wordpress with varnish as your reverse proxy cache.
published: true
publishedon: 08 Jun 2009 08:00 MDT
slugs: 
- supercharge-wordpress
tags: 
- php
- mysql
- apache
- wordpress
- varnish
- memcached
- optimization
---
Wordpress is pretty much the blogging engine of choice. It's used by so
many people, and has so many plugins and an amazing following, you'd
wonder why anybody would use anything else (well there are a number of
reasons, but we can talk about that later).

Some problems that come with Wordpress, with all that power, is
sometimes it's slow. Combine php, lots of plugins, and everything else,
and your blog can come to a crawl, especially if you write that
amazingly witty LOTR rant and all the fanboys come crying, posting your
blog, on [Digg](http://digg.com), [Slashdot](http://slashdot.org),
[Twitter](http://twitter.com) and every other social media site and
application.

So you want to protect your blog from coming down? This will hopefully
be a solid start.

**Get a good hosting provider.** I sort of fail at this, since I host at
home, but I just upgraded my server with my old desktop hardware, so
it's running Ubuntu 8.04.2 LTS x86_64 on a dual core 2.5GHz AMD with
4GB of RAM. This is a lot better than what I had before, so it's all
good. Good hosting is terribly expensive, so get a good setup, whether
it's at home or in the cloud.

**Use WP Super Cache Plus.** [WP Super Cache
Plus](http://murmatrons.armadillo.homeip.net/features/experimental-eaccelerator-wp-super-cache/2) is a plugin for Wordpress that handle local caching of pages. It can cache things on disk, but it works even better if you use memcached as the backend, so…

**Setup a memcached server for the object cache and page cache.**
memcached can be setup on Ubuntu simply with:

    sudo aptitude install memcached

You might want to configure a few things, but you can leave it with the
default config. You do have to actually enable it, but uncommenting the
line in /etc/php5/conf.d/memcache.ini. Then restart apache of course.
Then you need to download [this
file](http://svn.wp-plugins.org/memcached/trunk/object-cache.php) and
place it in your *wp-content* directory. You don't even have to
configure that, unless of course you are going to run memcached on
another server or something, or have multiple memcached daemons running.
In my final configuration of wp-supercache-plus, varnish, memcache and
xcache, using this object-cache.php gave me problems, in that I couldn't
get to the admin pages and the logs whined about a canary problem
(something to do with suhosin). I didn't look much farther into it, but
granted with wp-supercache-plus talking to memcache, and varnish sitting
in front of everything, this little object cache isn't really that big
of a deal, so taking it out was fine.

**Skip innodb on mysql.** I had to leave this as default since another I
app I run needed it, but uncommenting the *skip-innodb* line in
/etc/mysql/my.cnf saves memory on the database side of things. There is
more information out on the interweb if you want to really dig more into
that, but I won't talk about it here.

**Use a php opcode cache.** I just installed xcache since it was in the
repos, but there are others out there.

All of these things help, but the biggest improvement for me came from
[varnish](http://varnish.projects.linpro.no/)

**Setup varnish.** varnish is a bit more finicky. The version in the
Ubuntu Hardy (8.04.2) repos is old (1.x), so here's how to get the
newest one running with minimal hassle.

* Install stow and varnish `sudo aptitude install stow varnish`
* Download varnish from Sourceforge: [varnish download page](http://sourceforge.net/project/showfiles.php?group_id=155816)
* Unpack and compile varnish. `./configure --prefix=/usr/local/stow/varnish && make && make install`
* stow varnish: `cd /usr/local/stow && sudo stow varnish`
* Edit the varnish init file to point to the new binary. Change *DAEMON* to /usr/local/bin/varnishd*. Doing this means you get the init script and config file of the packaged version, but the actual one that will run will be the new 2.x version.
* Setup your config file. See mine later in the post.</li>
* Change your apache setup to listen on port 81 instead of 80.
* Edit /etc/default/varnish to make varnish listen on port 80.

This is my config file for varnish. See the comments for information.
Ignore the fact that's it's highlighted as C too…it just looks better
like that.

<script type="text/javascript" src="http://gist.github.com/177750.js?file=varnish.c"></script>

**So what does all this do?**

It makes this:

<script type="text/javascript" src="http://gist.github.com/177750.js?file=pre-varnish.txt"></script>

Turn into this:

<script type="text/javascript" src="http://gist.github.com/177750.js?file=post-varnish.txt"></script>

Wow. See all those numbers? Specifically *Time per request* and
*Requests per second*. 2810.809ms and 3.56 down to 100.682ms and 199.32.
Holy pancackes Batman! The first timing is without varnish and second is
with by the way, in case you couldn't tell. :) The first timing is also
quite a bit faster than it was before, so I'm not sure what happened
there. It used to average around 2000ms.

You can also update apache to log the proper IP address, instead of
127.0.0.1 all the time. See [this page](http://cd34.com/blog/infrastructure/varnish-and-apache2/) on how to do that.

So there you have it. Kick Wordpress into high gear. Hopefully this will
help with Digg and Slashdot loads.

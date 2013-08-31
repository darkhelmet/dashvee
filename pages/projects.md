--- 
id: 4
title: Projects
author: Daniel Huckstep
description: Some of the projects I've done.
published: true
publishedon: 18 Dec 2012 21:17 MST
slugs: 
- projects
---
These are apps, libraries, and other projects I'm working on, or have done in the past.

# Apps

## [Tinderizer](http://Tinderizer.com/)

Tinderizer allows you with the click of a bookmark, to send almost any
page on the web to your Kindle for reading at a later time. It's written in [Go](http://golang.org/), hosted on [Heroku](http://heroku.com/) and the [source is available here](https://github.com/darkhelmet/ForrestFire).

## [compiler](http://compiler.herokuapp.com/)

This is a simple web app to compile less and coffeescript as a
service. It runs on [node.js](http://nodejs.org/) with with the [source available here](https://github.com/darkhelmet/compiler).

## [balance](https://github.com/darkhelmet/balance/releases)

`balance` does simple TCP, HTTP, and HTTPS load balancing with a minimal [Go](http://golang.org/) app. You can see the [source code here](https://github.com/darkhelmet/balance).

# Books

## [Go, The Standard Library](http://thestandardlibrary.com/go.html)

Go, The Standard Library is an in depth look into the standard library packaged with the Go Programming Language. Learn to use the standard library to build apps fast, with less dependencies. It focuses on complete examples instead of incomplete snippets.

# Go Libraries

## [env](https://github.com/darkhelmet/env)

env is a library for [Go](http://golang.org/) to pull variables from
the environment. It can pull strings, ints, and floats, and you can
optionally specify a default.

## [twitterstream](https://github.com/darkhelmet/twitterstream)

twitterstream is a Twitter streaming API for [Go](http://golang.org/). It only supports password authentication.

# Ruby Libraries

## [sinatra-bundles](https://github.com/darkhelmet/sinatra-bundles)

sinatra-bundles is an extension to bundle and compress Javascript and
CSS assets for [sinatra](http://www.sinatrarb.com/)

## [rack-gist](https://github.com/darkhelmet/rack-gist)

rack-gist rewrites Github gist script includes to make them load
asynchronously, without blocking your page from loading. Check it out more [here](http://blog.darkhax.com/2010/07/16/rack-gist-the-gists-are-now-diamonds).

## [Twitter Link Filter Bookmarklet](https://gist.github.com/2647177)

Filter out tweets without links using a simple bookmarklet. Drag it up
and go to town.

<a href="javascript:(function() {
  setInterval(function() {
    $('#stream-items-id .stream-item:not(:has(a.twitter-timeline-link))').fadeOut(function() {
      $(this).remove();
    });
  }, 1000);
})();">Filter Links</a>

## [Twitter Reply Filter Bookmarklet](https://gist.github.com/2647387)

Filter replies on Twitter so you can see what people normally tweet
about.

<a href="javascript:(function() {
  setInterval(function() {
    $('#stream-items-id .stream-item:has(.twitter-atreply)').each(function(i, e) {
        var $e = $(e);
        var firstChild = $($e.find('.js-tweet-text').get(0).childNodes[0]);
        if (firstChild.is('a.twitter-atreply')) {
            $e.fadeOut(function() {
                $(this).remove();
            });
        }
    });
  }, 1000);
})();">Filter Replies</a>

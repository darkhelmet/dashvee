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
# Projects

These are some things I'm working on, or have done in the past.

## [Tinderizer](http://Tinderizer.com/)

Tinderizer allows you with the click of a bookmark, to send almost any
page on the web to your Kindle for reading at a later time.

-   Language: [Go](http://golang.org/)
-   Hosting: [Heroku](http://heroku.com/)
-   Links
    -   [Source](https://github.com/darkhelmet/ForrestFire)
    -   [Webpage](http://Tinderizer.com/)

## [fetch](https://github.com/darkhelmet/fetch)

fetch is a super simple full text search engine written in Go.

-   Language: [Go](http://golang.org/)
-   Links
    -   [Source](https://github.com/darkhelmet/fetch)

## [env](https://github.com/darkhelmet/env)

env is a package for the Go programming language to pull variables from
the environment. It can pull strings, ints, and floats, and you can
optionally specify a default.

-   Language: [Go](http://golang.org/)
-   Links
    -   [Source](https://github.com/darkhelmet/env)

## [twitterstream](https://github.com/darkhelmet/twitterstream)

Twitter streaming API for Go. Only supports password authentication
right now.

-   Language: [Go](http://golang.org/)
-   Links
    -   [Source](https://github.com/darkhelmet/twitterstream)

## [compiler](http://compiler.herokuapp.com/)

compiler is a simple web app to compile less and coffeescript as a
service

-   Language: Javascript
-   Platform: [node.js](http://nodejs.org/)
-   Links
    -   [Source](https://github.com/darkhelmet/compiler)

## [sinatra-bundles](https://github.com/darkhelmet/sinatra-bundles)

sinatra-bundles is an extension to bundle and compress Javascript and
CSS assets for [sinatra](http://www.sinatrarb.com/)

-   Platform: [sinatra](http://www.sinatrarb.com/)
-   Language: ruby
-   Links
    -   [Source](https://github.com/darkhelmet/sinatra-bundles)

## [rack-gist](https://github.com/darkhelmet/rack-gist)

rack-gist rewrites Github gist script includes to make them load
asynchronously, without blocking your page from loading.

-   Platform: [rack](http://rack.rubyforge.org/)
-   Language: ruby
-   Links
    -   [Source](https://github.com/darkhelmet/rack-gist)
    -   [Blog
        post](http://blog.darkhax.com/2010/07/16/rack-gist-the-gists-are-now-diamonds)

## [goo.gl](https://github.com/darkhelmet/goo.gl)

goo.gl is a little API endpoint to use Google's URL shortener to shorten
URLs in the Twitter iPhone client.

-   Platform: [sinatra](http://www.sinatrarb.com/)
-   Language: ruby
-   Hosting: [Heroku](http://heroku.com/)
-   Links
    -   [Source](https://github.com/darkhelmet/goo.gl)

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
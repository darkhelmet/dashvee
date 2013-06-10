--- 
id: 439
author: Daniel Huckstep
title: Proper Rack Middleware Ordering
category: programming
description: I show the importance of properly ordering rack middleware.
published: true
publishedon: 20 Jan 2010 08:00 MST
slugs: 
- proper-rack-middleware-ordering
tags: 
- sinatra
- rack
- middleware
- ruby
images: 
  bad_middleware: 
    small: http://cdn.verboselogging.com/transloadit/small/9e/a982a8c20c70d6d3ed7c72e37bc45d/bad-middleware.png
    large: http://cdn.verboselogging.com/transloadit/large/29/9403ab5fa6494e677422f299104e05/bad-middleware.png
    medium: http://cdn.verboselogging.com/transloadit/medium/42/7afc23044cc6435965b362f6eb9d8f/bad-middleware.png
    original: http://cdn.verboselogging.com/transloadit/original/14/59a6413b93dc74364caa0b0ae7038d/bad-middleware.png
  good_middleware: 
    small: http://cdn.verboselogging.com/transloadit/small/91/d8ce4472f3d886d54317a5b755a6f0/good-middleware.png
    large: http://cdn.verboselogging.com/transloadit/large/b5/0c9f9d808c6a451998ec502310a65b/good-middleware.png
    medium: http://cdn.verboselogging.com/transloadit/medium/d2/e6b7d47686e5f74195f02b3230421d/good-middleware.png
    original: http://cdn.verboselogging.com/transloadit/original/4b/2f4ad4b80f1bb254e8347c124a8b0f/good-middleware.png
---
It occurred to me the other day, that I should take a look at the middleware I use on this blog. I don't know what it was. My spidey senses just tingled.

Boy was I right. I totally had it backwards.

Rack middleware is a fantastic thing. It's like a little encapsulated rack application that you can use to filter, process, or otherwise mess with responses. There is middleware to add [etags](http://github.com/rack/rack/blob/master/lib/rack/etag.rb), [configure caching](http://github.com/rtomayko/rack-cache), catch and log exceptions, deal with cookies, handle [SSO](http://en.wikipedia.org/wiki/Single_sign-on), and pretty much anything else you can think of. Oh, and they work on any rack application; it is *rack* middleware after all. And in case you missed it, rails is a rack application. Create a new rails app and run

    % rake middleware

You'll see all the middleware that is included by default.

Anyway. The thing with rack middleware is that it runs in the order you specify them, top to bottom, and then by nature of how they work, they sort of rewind out.

Okay so WTF does that mean? A basic middleware looks kind of like this:

<script type="text/javascript" src="http://gist.github.com/281637.js?file=etag.rb"></script>

That's the etag middleware. It adds an etag value to responses. The required parts are the initialize method taking the application (which is a rails app, sinatra app, whatever), and the call method, taking an environment. Initialize sets things up, and call is what happens when a request comes in. The whole idea is you do:

    @app.call(env)

In *your* call method, where `@app` could be another middleware, or the actual application, but regardless it eventually gets all the way down to the real application. As the methods return, it comes back up with a response body, headers, and status code. In the etag example, `@app.call(env)` is done immediately and the results processed; the etag value is set in the headers.

So let's think about this for a second. Image you have some setup like this:

    use Rack::Etag
    use Rack::ResponseTimeInjector
    use Rack::Hoptoad

Does that really make sense? When you *use* middleware, you're telling your framework or whatever to *append* that middleware to the chain. So request comes in, goes through middleware, then hits your application.

In this case:

* We come into Etag...
* ...which calls the ResponseTimeInjector middleware...
* ...which calls the Hoptoad middleware to catch exceptions...
* ...which calls your application...
* ...which returns to the Hoptoad middleware...
* ...which returns to the ResponseTimeInjector middleware...
* ...which inserts the response time into the body...
* ...which then returns (with the modified body) to the Etag middleware...
* ...which calculates the etag value and puts it in the headers...
* ...which returns and lets rack send the response back.

Whew! Lots of steps there, but this might make more sense:

[<img src="{{.bad_middleware.large}}" />]({{.bad_middleware.original}})

Okay so what's the problem? The etag is calculated *after* the response time is injected, so that's fine (imagine if the etag middleware was at the bottom). What about poor Hoptoad? What if there is an exception thrown in the ResponseTimeInjector or Etag middleware? Hoptoad isn't going to catch it! The Hoptoad middleware doesn't modify anything in the response, so it needs to be up higher; it needs to be first.

    use Rack::Hoptoad
    use Rack::Etag
    use Rack::ResponseTimeInjector

Diagram time:

[<img src="{{.good_middleware.large}}" />]({{.good_middleware.original}})

That's better! This is basically the problem I had, except worse. I don't know what I was thinking, but my middleware was all out of order: [before](http://github.com/darkhelmet/darkblog/blob/42483fa463c7891967a908d6792b27f4aea57d21/lib/middleware.rb) and [after](http://github.com/darkhelmet/darkblog/blob/f19fecfd4b4cf453e9e46119a1e9aa6d95aa17f0/lib/middleware.rb).

See that? It's gross! I had Etag near the bottom, my exception logger was *all* the way at the bottom. The only one that was in a remotely right place was CanonicalHost.

The really terrible part about the original was that the body was being modified by 4 different middleware classes *after* the etag middleware runs and returns, hence the etag was wrong.

So hopefully if you are a rack middleware nerd already, you probably knew this stuff and stopped reading a while ago, or you are laughing at me. Otherwise, you might consider thinking twice about how your middleware is organized. Maybe go take a look at your middleware stack anyway and see if anything can be optimized.

Now go use some rack middleware! Ba dum tiss! (See that, see what I did there? In code you *use* middleware, and at a higher level as a developer you use middleware, so ... ah nevermind)
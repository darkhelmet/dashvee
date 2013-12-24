--- 
id: 481
author: Daniel Huckstep
title: Easy Sinatra Metal For Rails 3.x
category: programming
description: Easily use Sinatra applications in Rails 3.x as "metal" controllers, just like in Rails 2.x.
published: true
publishedon: 17 Jan 2011 08:00 MST
slugs: 
- easy-sinatra-metal-for-rails-3-x
tags: 
- ruby
- rails
- sinatra
- web
---
I was doing some optimizing the other day on a Rails 2.3.x application
with a metal controller. I didn't feel like writing a straight rack
application, so I used sinatra. A pretty good explanation of how this
works can be seen in Adam Wiggins' slides, [Rails Metal, Rack, and
Sinatra](http://www.slideshare.net/adamwiggins/rails-metal-rack-and-sinatra)

In Rails 3, they still have *metal* controllers, in that the
`ActionController::Metal` class is essentially a really thin controller,
and you can use it like any controller in Rails. They took out the way
Rails 2.x did metal on the grounds that you should just use rack
middleware.

This was all good, except Sinatra is super nice for writing quick
handlers for things, and the Rails 2.x way of doing it was pretty slick.
The metal was just a rack application that was called before the regular
application, and if it returned a 404, the request continued on to the
main rails application.

I wanted this same technique for Rails 3.x stuff, since that's how I
could nicely integrate
[sinatra-bundles](https://github.com/darkhelmet/sinatra-bundles) into
Rails 3.x[^1]

Anyway, it's stupid simple, but here it is.

<script src="https://gist.github.com/781345.js?file=rack-sinatra.rb"></script>

Drop that in your lib directory. You can make a class, inherit from
`Rack::Sinatra`, doll it up like any Sinatra application, and the `use`
that as rack middleware. Now it basically works just like using Sinatra
for metal in Rails 2.x.

[^1]: WIth Rails 2.x, you can just drop in a metal controller in the `app/metal` directory.

--- 
author: Daniel Huckstep
title: Make Your Own Celluloid
category: programming
description: Want to build an actor module in ruby from scratch? Check this out.
published: true
publishedon: 11 Feb 2013 10:00 MST
slugs: 
    - make-your-own-celluloid
tags: 
    - ruby
    - celluloid
    - actor
    - concurrency
---
Oh look, a post on ruby concurrency. LOLZ THREADS.

Anyway, let's get past the lolz about ruby and threads and just run this on JRuby okay?

## Celluloid

[Celluloid](http://celluloid.io/) is a ruby library to make concurrency easy. It gives you a nice object oriented interface to the concurrent patterns it provides. We're going to look at two specific interfaces: [Actors](https://github.com/celluloid/celluloid/wiki/Basic-usage) and [Futures](https://github.com/celluloid/celluloid/wiki/Futures).

Before we begin, let me say I love Celluloid. I'm just doing this to see how much basic functionality I can get with very little code. You probably shouldn't use any of the code I post here in production, but it's a good learning experience. Just use Celluloid if you need concurrency.

## Our Interface

We want to be able to mix in a module and get two methods: `async` and `future`.

The `async` method returns something that sends messages to the instance asynchronously, so calling `object.async.long_running_method` will return immediately and `long_running_method` will execute in another thread.

The `future` method returns something that sends messages it receives to the instance and immediately returns a `Future`. This `Future` has one method, `value`, which will return the return value of the message send when it's ready, possibly blocking until it is ready.

We'll call our gem [lol_concurrency](https://github.com/darkhelmet/lol_concurrency/)

## The Async Interface

Let's do the `async` method first. We'll put everything in the `LolConcurrency::Actor` module, which you include into your class. We do a fancy dance to memoize the `@async` variable in a threadsafe manner (I think that should be threadsafe...), and then all the real work is done in the `LolConcurrency::Actor::Async` class. It forwards `respond_to?` to the underlying instance, and then `method_missing` saves everything and sends it to the mailbox (using the `Queue` class, which is threadsafe). A loop in another thread pops from the mailbox and executes the methods.

**Boom.**

<script src="https://gist.github.com/darkhelmet/4744122.js?file=actor.rb"></script>

## The Future Interface

The `future` method is very similar. We do the same dance to cache the `Factory` as I've called it, `respond_to?` still gets forwarded, but there's no mailbox. When a message gets sent and hits `method_missing`, we make a `SizedQueue` able to hold a single value. The actual work gets done in a new thread and the return value shovelled into the queue. We then return a new `Future` with the queue. The `Future` then does the dance to cache the value it pops from the queue when you want the value. The initial call to `value` might be slow (maybe you're making an HTTP request), but will be instantaneous afterwards since the value is cached.

<script src="https://gist.github.com/darkhelmet/4744122.js?file=future.rb"></script>

## All Done

That's pretty much it. Wrapping up threads in some safe interface like this can really save you a bunch of headaches. Oh sure, you can still shoot yourself in the foot, doing mutations to things that aren't thread safe. These two modules just give you a nice way to deal with concurrent things without spending too many brain cycles on it.

Looking at this tested code after the fact, it's probably fine to use, even in production, as long as it's for super simple things. I'll still probably stick with Celluloid anyway. It gives you a ton of other great features to handle actor lifecycles (lol exceptions) and is generally better thought out and designed than this little gem I hacked up in a few hours.

That's it for now, happy threading!

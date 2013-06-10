--- 
id: 487
author: Daniel Huckstep
title: Idiomatic Go Channel Timeout
category: programming
description: The idiomatic way to timeout a Go channel.
published: true
publishedon: 18 Jun 2011 10:00 MDT
slugs: 
- idiomatic-go-channel-timeout
tags: 
- golang
- concurrency
---
I've been doing a lot of [Go](http://golang.org/) programming lately,
and it's good stuff.

Go is a fairly new programming language coming out of Google from the
minds of some really smart people, like [Rob
Pike](http://en.wikipedia.org/wiki/Rob_Pike) and Russ Cox (among
others). It's a C family language, so it has curly braces, has simple
yet advanced concurrency features, and garbage collection. It's both
high and low level, and was originally billed as a systems programming
language. Now though, it seems it fits as a both a general purpose and
scripting language.[^1]

For concurrency, Go has channels and goroutines. You can fire off any
function as a goroutine and it executes concurrently with the rest of
your code.[^2] You communicate with that goroutine with channels. As it
says on the [Go website](http://golang.org/doc/codewalk/sharemem/):

> Don't communicate by sharing memory; share memory by communicating.

So maybe, as an example, you want to download some pages over HTTP and
send them to a processing function. But you don't have all day, so you
want to timeout the processing function if it doesn't receive any data
in, say 10 seconds.

Boom. Straight from the [slides of Rob
Pike](http://golang.org/doc/GoCourseDay3.pdf):

<script src="https://gist.github.com/1032762.js?file=timeout.go"></script>

The pattern in the `Process()` function is from page 32 of 47 of Rob
Pike's slides, and is a pretty slick way to timeout receiving from a
channel. Using the `After()` function in the `time` package in the
standard library allows you to handle the timeout by exploiting the fact
that a select statement will procede with the first available option,
and block when there is no default action. Awesome!

I'm going to get back to programming.

[^1]: The compiler is SO fast.

[^2]: Check out the documentation and implementation for a more detailed
    explanation.

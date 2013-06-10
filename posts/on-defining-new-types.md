--- 
id: 509
author: Daniel Huckstep
title: On Defining New Types
category: programming
description: In which I ponder when is the right time to define a new type in your program.
published: true
publishedon: 02 Jul 2012 10:00 MDT
slugs: 
- on-defining-new-types
tags: 
- programming
- type-system
- type-safety
---
I was working on my
[twitterstream](https://github.com/darkhelmet/twitterstream) package the
other day and got thinking.

When do you make a new type? When don't you make a new type?

## Type System Basics

If you use a programming without a strong static type system, you
probably don't have much to worry about. In ruby and python for example,
it doesn't really care about what you pass a method or function, as long
as it has whatever methods you expect it to have. This is called [duck
typing](http://en.wikipedia.org/wiki/Duck_typing)

The Go programming language is statically typed. When I define a
function, I have to specify that the function takes an `int` as the
argument. I also specify the return type.

    func AddOne(int x) int {
        return x + 1
    }

Compare this to ruby:

    def add_one(x)
        x + 1
    end

The ruby version only cares if `x` implements a `+` method. You could do
something like this:

<script src="https://gist.github.com/3001475.js?file=lol_ruby.rb"></script>

Ruby doesn't care. The thing implements the `+` method, so it just
works.

Go is pickier. It wants an `int`, and won't even compile it you try to
give it a wrong type.

<script src="https://gist.github.com/3001475.js?file=types.go"></script>

Isn't that nice.

## Can we get to the point?

Let's move on. What I came across was that Tweets have geolocation
information, expressed in latitude and longitude. If I didn't want to
make a new type for these, I could just use a 64-bit floating point. But
that's not right, let's make a new type.

    type Latitude float64
    type Longitude float64

I just made two distinct types for each, based on the `float64` type.
Now when I define methods, I can be explicit about which one I want. I
don't have to worry about passing a latitude where I should've passed a
longitude, and vice versa.

So when do you decide, "yes, this needs a new distinct type" instead of
just using something built in? In this particular case, it was honestly
the first thing I thought of. My brain immediately went to the "want if
you try to do stuff with the incompatible types?" area. Naturally, new
types.

But when do you really start making new types? When do you stop?

If you're dealing with currency, do you just do it with an int and call
it cents? Do you make a new `Cents` type aliased to int? Just use a
`Decimal` type? New distinct type aliased to `Decimal`? Completely new
type (struct) not aliased to anything? What do you do!??

I gave an [article by Martin
Fowler](http://www.martinfowler.com/ieeeSoftware/whenType.pdf) a read,
and I still don't know. I suppose it really depends on the situation.
With the latitude and longitude example, it seemed pretty obvious.

With currency, well it probably depends on the application. If you're
making a little budgeting app for yourself, it's probably not too
important. If you're making an important financial application, you
probably want a currency type with a good test suite.

## Your turn

How do you decide when to make a new type? Does it change if you're
using a dynamic language with duck typing versus a compiled statically
typed language? Let me know on
[Twitter](https://twitter.com/darkhelmetlive)

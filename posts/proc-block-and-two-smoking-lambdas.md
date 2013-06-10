--- 
id: 492
author: Daniel Huckstep
title: Proc, Block, and Two Smoking Lambdas
category: programming
description: The differences between the closure syntaxes in Ruby 1.9.
published: true
publishedon: 20 Sep 2011 10:00 MDT
slugs: 
- proc-block-and-two-smoking-lambdas
tags: 
- ruby
- closure
- syntax
images: 
  vinnie: 
    small: http://cdn.verboselogging.com/transloadit/small/db/8da51eef09f6549ed52a9444fa0201/vinnie.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/82/e37bbd0d09a85b24b1265f4a046160/vinnie.jpg
    original: http://cdn.verboselogging.com/transloadit/original/c0/eb484a3e3e543262eb884ec0ae692c/vinnie.jpg
    large: http://cdn.verboselogging.com/transloadit/large/3a/5b1ab613b31ffc526d548f8fe7ecff/vinnie.jpg
---
<img src="{{.vinnie.medium}}" class="fright bleft bbottom round medium" />

Ruby 1.9 has 4 different ways to deal with closures.

*Cue music*

## Proc

Procs are the weird ones of the bunch. Technically, all of these things I'm going to describe are Procs. By that I mean, if you check the `class`, it's a `Proc`.

A `Proc` is made by using `Proc.new` and passing a block, `Proc.new { |x| x }`, or by using the `proc` keyword, `proc { |x| x }`.

A `return` from inside exits completely out of the method enclosing the `Proc`.

A `Proc` doesn't care about the arguments passed. If you define a `Proc` with two parameters, and you pass only 1, or possibly 3, it keeps on trucking. In the case of 1 argument, the second parameter will have the value `nil`. If you pass extra arguments, they will be ignored and lost.

## Block

Blocks are when you pass an anonymous closure to a method:

    def my_method
      my_other_method(1) do |x, y|
        return x + y
      end
    end

They work exactly like a `Proc`. It wouldn't matter how many arguments `my_other_method` called `yield` with, the block would execute just fine.[^1] The `return` will also return out of `my_method`.

## Lambda

A `lambda` is probably what you deal with most of time. You make them with the `lambda` keyword: `f = lambda { |x| x + 1 }`. They are a bit different.

Unlike a `Proc`, using `return` in a `lambda` will simply return from the `lambda`, pretty much like you'd expect.

Also unlike a `Proc`, `lambda` likes to whine if you pass an incorrect number of arguments. It will blow up with an `ArgumentError`.

## Stabby

The stabby is new in Ruby 1.9, and is just syntactic sugar for `lambda`. These are equivalent:

    f = lambda { |x| x + 1 }
    f2 = ->(x) { x + 1 }

## What's all this then?

So anyway I wrote some specs, and here they are (or rather their output). If you want to check out the actual specs, or run them for yourself, head on over to [Github](https://github.com/darkhelmet/proc-block).

<script src="https://gist.github.com/1224675.js?file=out.txt"></script>

[^1]: The addition won't work too well, but hey.
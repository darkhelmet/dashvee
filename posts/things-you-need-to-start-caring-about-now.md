--- 
id: 489
author: Daniel Huckstep
title: Things You Need To Start Caring About Now
category: editorial
description: I rant about some things that I care about every day.
published: true
publishedon: 20 Jul 2011 08:00 MDT
slugs: 
- things-you-need-to-start-caring-about-now
tags: 
- git
- vim
- emacs
- textmate
- whitespace
- mysql
- mongodb
- style
---
You need to start caring about a few things. **Now.**

## Code style

Looking through code, you see all sorts of things. Some of them are
good. Some of them are downright amazing pieces of code.

**Some of them are horrible.**

Some of them are so bad you feel your grip tensing around the keyboard
and you have to restrain yourself so you don't snap the bloody thing in
half.

They might be bad decisions. They might be caused by someone who didn't
have the knowledge to make the proper decision. They might have been
good decisions then, but terrible now.

**But I don't care about those things.**

I'm here to talk about code style. For example, what's wrong with this
block of ruby from a style point of view?

<script src="https://gist.github.com/1073318.js?file=car.rb"></script>

Here's my list:

-   The `turn_on!` method is indented 3 spaces when everything else is 2
    spaces.
-   Cylinders is spelled wrong.
-   `private` doesn't start a new block, so it shouldn't be indented
    (the code afterwards shouldn't be indented either).
-   `repair` is called with parentheses, even though all other methods
    with no arguments are called without.
-   `change_spark_plugs` is called with parentheses while `Engine.new`
    is called without.
-   `drive` is defined without parentheses while `initialize` is.

I care about this kind of thing, and seeing code like this **pisses me
off**. I honestly can't understand how people can write code like this
and either not notice those things I listed, or notice but not care. I
really don't care how amazing your algorithm is, or how elegantly you
implemented something, if the code looks like shit. I **will** re-write
it in proper style and be happy.

The best quote I can think of is from [the C2
wiki](http://c2.com/cgi/wiki?CodeForTheMaintainer)

> Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.

I would add OCD to the list too.

Here's a fixed version:

<script src="https://gist.github.com/1073318.js?file=car_fixed.rb"></script>

That's how I would write it, which I believe is also the "correct" style
as judged by the ruby community. It really doesn't matter how you write
it, as long as it's consistent. **If you indent with 4 spaces, then use
4 spaces everywhere![](*

One particular point of contention for me is the use of parentheses around method calls. My rule is if the method is called without parameters, no parentheses. Otherwise, use parens)
This way, your internal decision tree to use parens or not is very
simple.

## Whitespace

I fucking hate inconsistent and inappropriate whitespace. On a bad file,
it will take me up to 5 minutes to sift through the diff chunks in
[GitX](http://gitx.frim.nl/) in order to stage only the relevant chunks,
ignoring chunks consisting only of whitespace.

**Are you kidding me?**

Set your fucking editor to strip trailing whitespace. Any editor
[worth](https://github.com/vigetlabs/whitespace-tmbundle)
[its](http://www.emacswiki.org/emacs/DeletingWhitespace)
[salt](http://vim.wikia.com/wiki/Remove_unwanted_spaces) will have a way
to do this. If not, make your
[VCS](http://snipplr.com/view/28523/git-precommit-hook-to-fix-trailing-whitespace/)
do it.

## Your environment

You're an adult and a professional, and I'm not a babysitter. I'm also
not a fan of developer setup documentation past a simple list:

-   git ([git@github.com](mailto:git@github.com):company/project.git)
-   MySQL (5.x)
-   MongoDB (>= 1.8)
-   Redis (latest)

That should be all I have to tell you to get your *environment* setup.

I don't care if you install MySQL from the dmg, MacPorts, homebrew, or
download the latest tarball and compile from source. You should probably
have a preference; you should **care about your environment.** Then, if
something doesn't work, you can probably figure out how to fix it.

I also don't want to tell you how to install MongoDB, because *I* don't
want to be told how to install MongoDB. If you've never used it before,
maybe try investigating this new technology you're going to use by
heading over the website and read, oh I don't know, the install docs.
They probably aren't very long.

## Go Forth and Care

Care about what your code looks like, not just what it does. Care about
trailing whitespace and whitespace only changes. Care about your
computer. You have to deal with this stuff every day, so you might as
well start caring about it sooner rather than later.

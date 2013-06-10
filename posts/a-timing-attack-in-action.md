--- 
id: 517
author: Daniel Huckstep
title: A Timing Attack In Action
category: programming
description: I use Go to show how a timing attack works.
published: true
publishedon: 20 Aug 2012 10:00 MDT
slugs: 
- a-timing-attack-in-action
tags: 
- golang
- security
- crypto
---
[Last week](/2012/08/17/the-crypto-chapter-in-go-the-standard-library-is-available) I wrapped up the chapter on the `crypto` package in [Go, The Standard Library](http://thestandardlibrary.com/go.html)

Within the `crypto` package we have the `crypto/subtle` package. This package contains functions for doing constant time operations which are an important part of cryptography.

Constant time functions help prevent [timing attacks](http://en.wikipedia.org/wiki/Timing_attack) which are caused when operations take different amounts of time to complete a task based on some input. **When the *time* something takes *leaks information* about what's going on.**

## Comparing Strings

Let's look at a standard string comparison algorithm. For every character in a string, compare it to the character at the same index in the other string. If they are equal, try the next character. If not, return false. Pretty straight forward, but if the first character doesn't match, the function returns immediately. If the first character matches but the second doesn't, the function takes just a little bit longer. **This difference is enough to measure, even on web applications.** See [these](http://www.cs.rice.edu/~dwallach/pub/crosby-timing2009.pdf) [two](http://crypto.stanford.edu/~dabo/papers/ssl-timing.pdf) papers for more on that. The functions in the `crypto/subtle` package use some bit twiddling to perform operations in a constant time.

Let's look at how this would work in Go:

<script src="https://gist.github.com/3375538.js?file=timing_attack.go"></script>

You can run this example with `go run timing_attack.go -compare broken` ([output](https://gist.github.com/raw/3375538/90284e22c8c787e1bd163f21dad41a0083178d48/broken.txt)) and `go run timing_attack.go -compare constant` ([output](https://gist.github.com/raw/3375538/9040110dbe5371748139d0298389bfc790033168/constant.txt)). In the broken form, we use the algorithm I described above. For each index, there is one letter that takes a noticeably longer amount of time. You can see the attack progress and eventually guess the password. Well, except for the last character, but when you get it down to one character it's pretty easy to figure out what it should be (especially in a case like the example). The timing differences in the constant time run are too small to worry about.

The call to `comp(password, guess)` could be anything. You could be hitting a web application's login action with your `guess` and then they'd be doing the comparison to `password`. I'm just calling the function to prove the point.

## The More You Know

Cryptography is a tricky subject. Using constant time functions won't make everything crypto related you do magically work, but it's an important part nonetheless. For a better look at all things cryptography, I'd recommend [Applied Cryptography by Bruce Schneier](http://www.amazon.com/Applied-Cryptography-Protocols-Algorithms-Edition/dp/0471117099).

This example is from [Go, The Standard Library](http://thestandardlibrary.com/go.html). If you like it and want to support the book, head over to [http://thestandardlibrary.com/](http://thestandardlibrary.com/) and get your copy. The book is in progress and I push updates as I go. Thanks for reading!

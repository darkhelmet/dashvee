--- 
author: Daniel Huckstep
title: "manbearpig: Mutation Testing for Go"
category: programming
description: Improve your tests with mutation testing and manbearpig.
published: true
publishedon: 11 Mar 2013 10:00 MDT
slugs: 
    - manbearpig-mutation-testing-for-go
tags: 
    - golang
    - testing
images:
    manbearpig:
        small: http://res.cloudinary.com/verboselogging/image/upload/t_small/manbearpig.jpg
        medium: http://res.cloudinary.com/verboselogging/image/upload/t_medium/manbearpig.jpg
        large: http://res.cloudinary.com/verboselogging/image/upload/t_large/manbearpig.jpg
        original: http://res.cloudinary.com/verboselogging/image/upload/manbearpig.jpg
---
[Mutation testing](http://en.wikipedia.org/wiki/Mutation_testing) isn't about testing your code, but about improving your tests.

What happens is the testing tool looks through your source code for instances of some known thing. This usually something easily tweaked, like `==`. For each instance, it changes it to some opposite value that makes sense. In the case of `==`, we can change it to `!=`. For each single change it makes, it runs the tests. The idea is that the tests should fail. If they don't, you might want to consider writing more tests to cover the cases the mutation exposed. After a test run, the mutation is reset, so as to not taint subsequent mutations.

For my book [Go, The Standard Library](http://thestandardlibrary.com/go.html) I wrote an example to show off how you can alter a Go [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree). I've reworked the example and packaged up an an application called [manbearpig](https://github.com/darkhelmet/manbearpig).

## manbearpig

![manbearpig as seen in South Park]({{.manbearpig.large}})

Get start by installing `manbearpig`

    go get github.com/darkhelmet/manbearpig

Now you can run it on a standard library to see it in action.

    manbearpig -import crypto/sha256 -mutation ==

You can see that it switches `==` to `!=`, and that the tests break, as they should.

Run `manbearpig -list` to see the list of available mutations.

## Fin

Run this on your own package to see where your tests are lacking.

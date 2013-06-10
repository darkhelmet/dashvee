--- 
id: 512
author: Daniel Huckstep
title: Go 1.0.2 Is Out
category: programming
description: Go 1.0.2 gets released.
published: true
publishedon: 14 Jun 2012 10:00 MDT
slugs: 
- go-1-0-2-is-out
tags: 
- golang
- release
---
Go 1.0.2 was released late last night.

It's a bunch of bug fixes, including some nasty ones with hashes. It's
completely backwards compatible with go1.0.1 and go1, so there's no
reason not to update:

    cd $GOROOT
    hg pull
    hg update -r go1.0.2
    cd src
    ./all.bash

And you're done! You'll probably have to update some packages along the
way. It will complain about how it was expecting a package for go1 or
go1.0.1, which just means you need to recompile.

Now get back to programming.

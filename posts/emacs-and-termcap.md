--- 
id: 342
author: Daniel Huckstep
title: Emacs And Termcap
category: software
description: Emacs has issues with termcap sometimes, and these are my findings.
published: true
publishedon: 06 May 2009 11:06 MDT
slugs: 
- emacs-and-termcap
tags: 
- ubuntu
- emacs
- termcap
- rxvt
---
I've had this problem before, but never wrote down how I fixed it. emacs
would whine about not being able to open a termcap database file, and
wouldn't start on the console. The X version worked fine, but using the
`-nw` option resulted it in dying.

The fix!

    infocmp -C rxvt-unicode | sudo tee /etc/termcap

If you strace emacs when you start it, you'll see it tries to open that
file, which doesn't exist on Ubuntu by default. I tried everything else,
the big suggestion from 1996 being install some compat library, which is
ancient, and installing libncurses5-dev, which puts the include file in
the right spot, but doesn't actually fix anything, even after
reconfiguring/compiling like you're supposed to.

Regardless, that little snippet fixes it, and now I have emacs.

EDIT: So actually that fixed it to the point that it would run, but I
didn't have colors. I don't know what I did, but I recompiled and
everything from scratch and it's good to go now.

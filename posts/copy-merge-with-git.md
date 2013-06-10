--- 
id: 464
author: Daniel Huckstep
title: Copy Merge With Git
category: programming
description: How to do a copy style merge with git
published: true
publishedon: 25 Jun 2010 18:47 MDT
slugs: 
- copy-merge-with-git
tags: 
- git
- linus-torvalds
- scm
---
A copy merge is basically where you take all of *their* changes.

Say you're in branch A and want to merge in branch B. Their might be
conflicts, but you don't care, as you want whatever is in branch B.
Almost as if you are copying from B to A.

Since you are in branch A, it is referred to as *ours*. Branch B is
referred to as *theirs*. In git land, you can do this, assuming you are
in branch A:

    git merge -s recursive --strategy-option theirs B

This will merge, and take whatever B has as the word of Linus Torvalds.

Happy merging.

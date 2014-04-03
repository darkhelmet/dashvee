---
author: Daniel Huckstep
title: The Philosophy of Naming Variables
category: software
description: Russ Cox and variable naming
published: true
publishedon: 03 Apr 2014 10:00 MST
slugs:
- philosophy-of-naming-variables
tags:
- golang
- philosophy
- russ-cox
---
Russ Cox [made a good comment on the golang-dev mailing list](https://groups.google.com/d/msg/golang-dev/CGGiLKunggo/2z051XlQO1EJ) about the philosophy of naming variables. He links to his [original short post](http://research.swtch.com/names) on the subject as well.

A TL;DR version is that `i` makes more sense than `index` when you're looking at a small loop. For local variables that are only relevant for a short number of lines, having long verbose names actually makes them less efficient.

As the context or reach of a variable increases, having longer names (to a point) makes sense. This can be seen in publicly exported types, methods, functions, constants, variables, and even the package names themselves.

Russ Cox expresses this succinctly:

<blockquote>A name's length should not exceed its information content.</blockquote>

And I agree.

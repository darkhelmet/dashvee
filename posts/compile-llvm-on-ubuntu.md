--- 
id: 383
author: Daniel Huckstep
title: Compile LLVM On Ubuntu
category: programming
description: Get LLVM running on Ubuntu from source.
published: true
publishedon: 24 Jun 2009 08:00 MDT
slugs: 
- compile-llvm-on-ubuntu
tags: 
- gcc
- llvm
- ubuntu
---
I needed to compile LLVM from scratch since the
[llvmruby](http://github.com/tombagby/llvmruby) gem needs it compiled
with [position independent
code](http://en.wikipedia.org/wiki/Position_independent_code) and the
repo version doesn't seem to be, the gem whines compiling, etc, etc.

The docs for LLVM don't seem to be that great when it comes to compiling
this stuff from scratch, so here's what I did, as one big script chunk.
You can probably copy and paste this, but I make no promises that it
will work, only that it [Works on My
Machine.](http://www.codinghorror.com/blog/archives/000818.html)

<script type="text/javascript" src="http://gist.github.com/177748.js?file=setup.sh"></script>

And that should output something like

<script type="text/javascript" src="http://gist.github.com/177748.js?file=output.txt"></script>

The last part about the LLVM build is the important part. It still
doesn't quite work with llvmruby, but maybe it's because I used the 2.5
version and the llvmruby page says 2.4. Just something else…

LLVM is up and running though, so happy LLVM'ing!

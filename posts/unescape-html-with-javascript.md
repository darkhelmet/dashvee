--- 
id: 421
author: Daniel Huckstep
title: Unescape HTML With Javascript
category: software
description: A little trick to unescape HTML with some Javascript fu.
published: true
publishedon: 06 Nov 2009 16:49 MST
slugs: 
- unescape-html-with-javascript
tags: 
- javascript
- html
---
I'm just passing this on, as I didn't do it, I just found it.

Over [here](http://erlend.oftedal.no/blog/?blogid=14) is a pretty slick
way to unescape HTML. I ran into the need for this when I was working on
some inline-editing code. I wanted to reset the contents of the textarea
to the contents of a pre tag. The contents of the tag are of course
escaped, but I want them to be proper HTML in the textarea. Using this
trick allowed me unescape the contents easily and stuff it back in the
textarea.

My function:

<script type="text/javascript" src="http://gist.github.com/228398.js?file=unescape.js"></script>

Good Stuff.&trade;

--- 
id: 393
author: Daniel Huckstep
title: Simple jQuery Timeout
category: programming
description: Timeouts with jQuery syntax.
published: true
publishedon: 15 Jul 2009 08:00 MDT
slugs: 
- simple-jquery-timeout
tags: 
- javascript
- ajax
- jquery
---
I needed [jQuery](http://jquery.com/) to fadeout an item after a certain
timeout, and I found it odd that I couldn't find a native jQuery way to
do it.

Whatever. jQuery is so awesome that it doesn't matter, because here's
what I came up with.

<script type="text/javascript" src="http://gist.github.com/177742.js?file=jquery-timeout-animate.js"></script>

EDIT 28-Nov-2009

In retrospect, all I wanted was a jQuery like syntax, but leveraging
jQuery to do the timeout is sort of wrong. After all, Javascript does
have a setTimeout function. I must have been in a *jQuery must do all of
this* mindset. This is better.

<script type="text/javascript" src="http://gist.github.com/177742.js?file=jquery-timeout-basic.js"></script>

EDIT 19-Jan-2010

Even then, with that implementation, all it does is pass the arguments
to *another* function, just in a different order, so WTF is the point?

Well I suppose you could extend it to do other things, maybe start and
stop a spinner, or if anything just to encapsulate the functionality
into jQuery. Maybe on some browsers there is a problem with setTimeout
and what you want to do, specifically, so you could put your logic to
*not* use it on that browser, and yet still have the same syntax for
running something after x amount of time. I also don't like the
parameter ordering in setTimeout, but that's just me.

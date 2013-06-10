--- 
id: 438
author: Daniel Huckstep
title: Making nth-child Work Everywhere
category: programming
description: I show you how to work around Internet Explorer's lack of CSS3's nth-child support with jQuery.
published: true
publishedon: 17 Jan 2010 08:00 MST
slugs: 
- making-nth-child-work-everywhere
tags: 
- jquery
- css3
- javascript
- nth-child
---
The [nth-child pseudo
selector](http://www.w3.org/TR/css3-selectors/#nth-child-pseudo) is a
nice feature in CSS3. Well, most of the things in CSS3 are pretty sweet.

Chris Wanstrath has [a good post](http://ozmm.org/posts/nth_child.html)
on the nth-child selector, and I'd suggest reading it for a bit more in
depth on what the nth-child selector actually does, as I just cover
getting the same effect in all browsers.

Unfortunately, while Internet Explorer does support some of the CSS3
stuff, it *doesn't* support [a bunch of
them](http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx)
either. (Disclaimer: I am considering IE 7 and 8. IE6 isn't a real web
browser…)

The nth-child selector is one of them.

Basically then nth-child selector allows you to do stuff like this in
CSS3:

    table.highlight tr:nth-child(2n+1)

This will select all the odd rows in the table. You can then give them a
different background color, to make the table easier to read. Like I
said, good thing Internet Explorer supports it.

## jQuery to the rescue!

The nice thing about jQuery is that it does support nth-child and it's
completely cross browser compatible (read: works in Internet Explorer).

Now you can change your CSS rule to something poor IE can understand:

    table.highlight tr.odd

Top it off with some jQuery sauce…

    $('table.highlight tr:nth-child(2n+1)').addClass('odd');

Now you have the same effect. In all browsers. Win.

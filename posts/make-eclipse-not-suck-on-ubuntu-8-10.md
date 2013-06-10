--- 
id: 362
author: Daniel Huckstep
title: Make Eclipse Not Suck On Ubuntu 8.10
category: software
description: Eclipse is awesome, except when it sucks. Turn down the suck on Ubuntu 8.10.
published: true
publishedon: 20 May 2009 08:00 MDT
slugs: 
- make-eclipse-not-suck-on-ubuntu-8-10
tags: 
- ubuntu
- eclipse
- printing
---
I don't know if this is a problem on Jaunty anymore, but whatever. I had
to do this on 8.10 to get Eclipse to actually run and function properly.

In a word: printing. In more words: disable it.

Who prints from Eclipse anyway?

Add this as a vmarg in your eclipse.ini

<code>-Dorg.eclipse.swt.internal.gtk.disablePrinting</code>

The long story:

When I was at school, my Eclipse instance just would not start. Well,
scratch that. A blank workspace would start fine, but a workspace that
had been loaded before just wouldn't. It worked fine when I was at home.
I used strace and discovered that it was trying to talk to my CUPS
server. I had CUPS on my server at home for printing, and then on my
laptop just had it point to that server. This worked great for printing
things, but apparently Eclipse didn't like it. After searching around
for a bit I found something about disabling printing in Eclipse. The
result is what you see above, and this prevented Eclipse from trying to
talk to the print server, and allowed it to start.

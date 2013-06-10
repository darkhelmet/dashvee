--- 
id: 373
author: Daniel Huckstep
title: Gtk And Ruby Threading Issues
category: programming
description: Gtk has some threading issues in ruby. Here's how to get around them.
published: true
publishedon: 01 Jun 2009 08:00 MDT
slugs: 
- gtk-and-ruby-threading-issues
tags: 
- ruby
- gnome
- gtk
- threading
---
In one of my classes, we used Ruby and Gtk, but some issues popped up.
The most obvious is using a block to do GUI update stuff and the like,
from another thread. Things die. Puppies are killed.

I found [this post](http://www.ruby-forum.com/topic/125038) on Ruby
Forum which fixed the problem.

Relevant code.

<script type="text/javascript" src="http://gist.github.com/177751.js?file=gtk.rb"></script>

Basically, you call the `Gtk.init_thread_protect` method first when you
start things up, then, whenever you need to do GUI update stuff, just
wrap it in a `Gtk.thread_protect {}` block. Voila! It works. No more
crashes. In looking at this code again now, some things could be made
more Rubyesque, but we'll go with it.

My version with minor changes:

<script type="text/javascript" src="http://gist.github.com/177751.js?file=gtk-mod.rb"></script>

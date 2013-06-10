--- 
id: 422
author: Daniel Huckstep
title: swfobject, Meet jQuery
category: software
description: I combine swfobject and jQuery for a match made in heaven.
published: true
publishedon: 13 Nov 2009 19:44 MST
slugs: 
- swfobject-meet-jquery
tags: 
- jquery
- swfobject
- javascript
---
I was getting sick and tired of just blindly copying and pasting embed
code for videos and every other flash thing I post. Naturally, being a
programmer I had to do something about it. Enter
[jQuery](http://jquery.com/) and
[swfobject](http://code.google.com/p/swfobject/)

Check this out:

<script type="text/javascript" src="http://gist.github.com/234339.js?file=jquery-swfobject.js"></script>

Some embed tags that are provided are only of one type: either object or
embed. This is no good since that means some browsers are excluded and
it won't work. Lame! Swfobject solves the problem by using JavaScript to
insert the correct code for the browser. You need JavaScript, so get
with the times if you don't have it turned on.h3. Your title here…

What I do is use jQuery to make a friendlier interface to swfobject. I
can then hook up a document ready hook to look for div elements I
specify with the proper class. I can hen pull other information like the
URL of the swf to embed an the video dimensions. I then scale it to fit
the width of my blog content, 600px, and finally do the embed. I also
ensure you can make the video fullscreen and that the `wmode` property
is set to opaque. Win!

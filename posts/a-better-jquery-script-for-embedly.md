--- 
id: 470
author: Daniel Huckstep
title: A Better jQuery Script For Embedly
category: programming
description: I fix up Embedly's jQuery code to not use global variables.
published: true
publishedon: 10 Sep 2010 08:00 MDT
slugs: 
- a-better-jquery-script-for-embedly
tags: 
- embedly
- javascript
- jquery
- coffeescript
images: 
  embedly_fail: 
    original: http://cdn.verboselogging.com/transloadit/original/fa/4e6438fe8ea1c2cb22fd75163c338c/embedly-fail.png
    small: http://cdn.verboselogging.com/transloadit/small/e0/1cd0ffd69aa13e40180b9b69bfe08c/embedly-fail.png
    medium: http://cdn.verboselogging.com/transloadit/medium/05/05cbaa540a511832840954e107a892/embedly-fail.png
    large: http://cdn.verboselogging.com/transloadit/large/e0/2e30d8b2f69653c7d12b15a691a2f4/embedly-fail.png
---
<p><a href="http://embed.ly/">Embedly</a> is a great service for generic embedding of content. Have you seen <a href="http://posterous.com/">posterous</a>? How they can just accept any link to a video on youtube, a picture on flickr, whatever, and it gets properly embedded? I imagine they could use Embedly to accomplish that.</p>
<p>Anyway. They have a <a href="http://github.com/embedly/embedly-jquery">jQuery script</a> to do embedding, but in the middle of if is this behemoth of a code smell:</p>
<p><figure><img src="http://cdn.verboselogging.com/transloadit/large/e0/2e30d8b2f69653c7d12b15a691a2f4/embedly-fail.png" class=" large" alt="" /></figure></p>
<p>Oh noes a global variable! The implication of this is that you can only run one call to embedly at a time. This sucks if you have different needs for different things and want to run a few at the same time, since array values get overwritten between calls, and shenanigans ensue.</p>
<p>Fear not, because I wrote a better one. I didn&#8217;t fork the repo and whatnot since I wrote mine in <a href="http://jashkenas.github.com/coffee-script/">coffeescript</a> and the compiled Javascript isn&#8217;t really something I want to just patch over top of what they have.</p>
<p>I did use their file as my starting point and then sort of converted things as I went to not use the global array and be written in coffeescript, so the basic flow of the logic is all them, I just cleaned it up.</p>
<p>The coffeescript:</p>
<script src="http://gist.github.com/569273.js?file=jquery.embedly.coffee"></script><p>The compiled Javascript:</p>
<script src="http://gist.github.com/569273.js?file=jquery.embedly.js"></script><p>Go forth and enjoy.</p>

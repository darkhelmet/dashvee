--- 
id: 433
author: Daniel Huckstep
title: Hacking MarkItUp! To Help Me Embed Videos
category: programming
description: I extend markItUp! to simplify posting videos.
published: true
publishedon: 30 Dec 2009 08:00 MST
slugs: 
- hacking-markitup-to-help-me-embed-videos
tags: 
- swfobject
- youtube
- job-for-a-cowboy
- video
- markitup
- jquery
---
I use [swfobject](http://code.google.com/p/swfobject/) to embed videos
because, as I explained [back
here](http://blog.darkhax.com/2009/11/13/swfobject-meet-jquery), just
blindly copying the embed code doesn't work that well half the time, and
videos end up being different sizes, etc.

I was getting kind of fed up with having to go back and remember how to
do it every time though. The format is pretty straightforward, but I
don't embed videos often enough to actually remember the exact syntax,
so I found myself going back to posts with videos to see how I did it,
or looking at my code.

**No more I say!**

I also use [markItUp!](http://markitup.jaysalvat.com/) for editing posts, so I have a bit of a nicer interface to editing plain Textile. Granted I chose Textile because I actually like typing it, but never you mind that...

With markItUp), you can configure the control bar, of course, so I added
a button to process selected text, or simply return a default embed
template:

<script src="https://gist.github.com/265938.js?file=div.html"></script>

Now since most embed code is pretty much the same, I can deal with the
selected text nicely:

<script type="text/javascript" src="http://gist.github.com/265938.js?file=markitup-youtube.js"></script>

This lets me paste in standard embed code, like this YouTube embed code
for a [Job for a Cowboy](http://en.wikipedia.org/wiki/Job_for_a_cowboy)
video,

<script src="https://gist.github.com/265938.js?file=embed.html"></script>

…highlight it, then click the button, and have it process it to my embed
code, with the proper values all replaced, so my script can process it
when it hits your screen.

Less work for me (in the long run), more awesome for you.

[Job For A Cowboy - Unfurling A Darkened
Gospel](http://www.youtube.com/watch?v=nl-qaTmazB0&feature=player_embedded)

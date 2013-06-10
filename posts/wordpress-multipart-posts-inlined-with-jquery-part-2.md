--- 
id: 388
author: Daniel Huckstep
title: "Wordpress Multipart Posts, Inlined With jQuery: Part 2"
category: programming
description: Part 2 of the inline multipart post debacle.
published: true
publishedon: 09 Jul 2009 08:00 MDT
slugs: 
- wordpress-multipart-posts-inlined-with-jquery-part-2
tags: 
- javascript
- wordpress
- ajax
- jquery
---
(See [(remote-inline)Part
1](http://blog.darkhax.com/2009/07/08/wordpress-multipart-posts-inlined-with-jquery-part-1))

And we're back!

So, just take a look up below the title…see that little link? Yeah go
ahead and click that. If I did my job right (tested in Safari on
Windows, Chrome, FF), the contents for Part 1 should slide in above this
post.

In *this* post, since I use the [Textile
2](http://idly.org/category/textile) plugin, I add this snippet at the
top:

    (See [(remote-inline)Part 1](/2009/07/08/wordpress-multipart-posts-inlined-with-jquery-part-1))

In textile land, that translates to a link with a class of
*remote-inline*. Then, I add this lovely javascript:

<script type="text/javascript" src="http://gist.github.com/177747.js?file=jquery-remote-inline.js"></script>

So what that does, is a bind an onclick event for all links with the
`remote-inline` class. That event, loads the href, and uses jQuery to
parse out what I want, and stuff it in the DOM. This will be different
for your blog of course. I use Disqus and Sociable, and want these
removed from the inserted contents, so I remove them, again with the
magic of jQuery.

The big second line to setup *existing* is also unique to my blog. I
work my way up from the link, through the parents (examine the source to
see for yourself), to get to the sidebar, which is what I put the new
elements in front of (the new sidebar div and new content div). It's
just the single `closest` call, which is a [jQuery 1.3
function](http://docs.jquery.com/Traversing/closest)

Then I just `slideDown` the new elements and voila! A brand new post in
the DOM, right above this Part 2, so you have Part 1 and Part 2 in
proper reading order on the page, no matter where they are.

Other little tidbits:

-   I change the text and eventually remove the element containing the
    link to part 1. There is just a little bit of feedback to show that
    it's doing something, but I don't want that link getting clicked a
    bunch, so once we load, we can just remove it.
-   I setup the inlining again after loading the new stuff. This allows
    chaining things, so I could have a 6 part post, and the 6th part
    could load 5, which could load 4, etc, etc.
-   I return false from the onclick function, so the browser doesn't
    follow the link.
-   Since I bind the onclick with jQuery, the link still works normally
    for those of you without javascript. Horray for graceful
    degradation!

Enjoy. It shouldn't take too much to get it into your own blog.

The code for all this can be found on [Github](http://github.com) in my
[wp-darkhax](http://github.com/darkhelmet/wp-darkhax/tree) repository.
Feel free to poke around.

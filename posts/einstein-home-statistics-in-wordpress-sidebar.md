--- 
id: 333
author: Daniel Huckstep
title: Einstein@Home Statistics In Wordpress Sidebar
category: programming
description: Get Einstein@Home statistics in your Wordpress sidebar. Is this meta tag really needed?
published: true
publishedon: 30 Apr 2009 19:39 MDT
slugs: 
- einstein-home-statistics-in-wordpress-sidebar
tags: 
- einstein-at-home
- php
- javascript
- wordpress
---
If, like me, you participate in some sort of grid computing project,
it's interesting to see your progress. I take part in Einstein@Home, and
I wanted to display my stats in my sidebar (on my
[other](http://www.darkhelmetlive.com) blog). I'll give you two ways to
accomplish this. First way is the quick way, which involves including
the jQuery Javascript library, and a second which involves writing your
own Javascript. The second option results in a smaller file, but the
jQuery file is already pretty small. It's up to you. I started with my
own script, then moved to jQuery when I realized it could do what was
needed in about one line, and I was already including/using jQuery.

For the record, I originally did this a long time ago when jQuery was
new and hip. Now it's just a standard.

For both options, create a php file somewhere on your server. I used my
blog root directory, so the url is [http://www.darkhelmetlive.com/blog/einstein.php](http://www.darkhelmetlive.com/blog/einstein.php)

Call it whatever you want, I used einstein.php since I'm getting
Einstein@Home stats. Anyway, paste this in:

<script type="text/javascript" src="http://gist.github.com/177772.js?file=einstein.php"></script>

Replace the 'auth-key-goes-here' with your actual auth key, which can be
had from the Einstein@Home user account pages (somewhere in there).
Also, I should add that I found the E@H XML stuff somewhere, but now I
can't find the page anywhere, so this is what works. You can do more,
but I don't know how :(

Anyway, this php script returns the unordered list and list items to sit
in the sidebar. You could write this into a widget, which I should
probably do, but it's low priority for me.

Now add something like this to the sidebar.php script of your theme:

<script type="text/javascript" src="http://gist.github.com/177772.js?file=sidebar.html"></script>

You need the div tags for the script to be able to insert the returned
HTML from the other php script.

That's the basic stuff, now off to the option specific parts.

**Option 1**

Add two script includes to your header.php file in your theme.

<script type="text/javascript" src="http://gist.github.com/177772.js?file=script-tags.php"></script>

Adapt this to your needs of course. I did it this was to allow the code
to move around. Now you can just copy and paste instead of changing the
root url. Make sure you actually download jQuery and drop it into your
"wp-includes/js" directory. Create the einstein.js file in the
"wp-includes/js" directory as well. Make it look like this:

<script type="text/javascript" src="http://gist.github.com/177772.js?file=einstein.js"></script>

Replace 'einstein-sb' with whatever id you gave the div in the previous
section, and replace the "/blog/einstein.php" with the path to your php
script you pasted out.

This will then, when the document is ready, make a jQuery call. It will
load the url (the php script), and put the contents (the returned html
code) in the innerHTML of the div, so it appears to the user. If the php
has a problem, it sticks in the error message. The nice thing about this
is it works asynchronously. Originally I had the php directly in the
sidebar.php file. Bad idea. When the E@H servers are slow, your page
loads like a dog. This works better.

**Option 2**

You can write your own JS file to do the job the jQuery does, but
seriously folks. One line, c'mon! How easy is that.

This is what I had:

<script type="text/javascript" src="http://gist.github.com/177772.js?file=einstein-by-hand.js"></script>

Basically it does the same thing, but it's smaller, since it doesn't
have all the other stuff from jQuery which you might not use. But jQuery
works on all browser, and I doubt my code above does.

You must include that code in the header file as well, in the same
manner as the jQuery file in Option 1 (again I had just included
wp-includes/js/einstein.js, and put all that code in there).

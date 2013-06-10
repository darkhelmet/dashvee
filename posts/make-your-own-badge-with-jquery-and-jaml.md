--- 
id: 449
author: Daniel Huckstep
title: Make Your Own Badge With jQuery And Jaml
category: programming
description: I show you how to make a badge out of anything with jQuery and Jaml.
published: true
publishedon: 04 Mar 2010 08:00 MST
slugs: 
- make-your-own-badge-with-jquery-and-jaml
tags: 
- jquery
- jaml
---
[jQuery](http://jquery.com/) is pretty much the gold standard for
Javascript goodness, at least in my opinion. I use it for everything,
and you should too.

[Jaml](http://github.com/edspencer/jaml) has only been around [since
October](http://github.com/edspencer/jaml/commit/6a67767d08ac78f1c07487ac60587bfd033fe50c)
but it's already pretty damn awesome.

Combining these two powers like peanut butter and jelly results in
**awesome**.

## Jaml

Jaml is a templating engine for Javascript based loosely on
[Haml](http://haml-lang.com/). It lets you write code like this:

<script type="text/javascript" src="http://gist.github.com/321408.js?file=jaml-example.js"></script>

So you can call this:

    Jaml.render('simple');

To output this:

<script type="text/javascript" src="http://gist.github.com/321408.js?file=jaml-output.html"></script>

You can also do fancier things, like setting class, id, and really any
other property of an element.

Anyway.

## So you want a Github badge

Or any other badge for that matter. I have some Github repos and my
latest shared items from Google Reader in the top panel area. I used to
grab them from the server, and cache them in the database. This means
they didn't get updated as often, and it was just another thing the
server *had* to do that the client *could* do.

So I made them into Javascript badges.

## A URL

First you need a URL. Something that gets you the information you want.
For Github it's something like this:

    http://github.com/api/v1/json/darkhelmet

Where `darkhelmet` is my username.

## A Callback

The other thing you need is a callback function. The place you're
getting JSON from has to support this, and the syntax might be
different, but you pass the name of a callback function which the JSON
gets wrapped in, so the script that's getting loaded is a function call,
with the only param being the JSON with all your data. So now your URL
looks like this:

    http://github.com/api/v1/json/darkhelmet?callback=GithubBadge

And it'll come back looking like this:

    GithubBadge({ … });

So let's define the callback:

<script type="text/javascript" src="http://gist.github.com/321408.js?file=GithubBadge.js"></script>

Ignore some of that, but basically I take the JSON, select repositories
that aren't forks and have a description, sort them randomly, and take
12 of them. The important part is:

    $('#github-badge').html(Jaml.render('github-badge', badge));

This sets the HTML of the element with the id `github-badge` to the
output of Jaml rendering the `github-badge` template with the badge
object as the parameter.

Now I define the templates:

<script type="text/javascript" src="http://gist.github.com/321408.js?file=GithubBadgeTemplate.js"></script>

I render a `div` with a CSS class, which has a header, then an unordered
list containing all the rendered repos, which consist of a link within a
list item. Then I tack on a link to my profile page on Github.

To make it all work, you use jQuery and do this:

    $.getScript('http://github.com/api/v1/json/darkhelmet?callback=GithubBadge');

This loads the script as though you included a script tag in your page,
except you do this in your body load stuff so it doesn't block the page
load. It has to wait until the page is loaded anyway to it can be sure
to find the element to insert the HTML. Don't forget to put in an
element in your page with the proper id:

    <div id='github-badge'>Loading repositories…</div>
    
Boom. Github badge on your page. I do the same thing for the Google
Reader badge. Now go forth and template!

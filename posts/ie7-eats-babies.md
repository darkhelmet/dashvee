--- 
id: 490
author: Daniel Huckstep
title: IE7 Eats Babies
category: software
description: IE7 is the new IE6
published: true
publishedon: 25 Jul 2011 08:00 MDT
slugs: 
- ie7-eats-babies
tags: 
- ie7
- jquery
---
But you already knew that, right?

These days, in fancy AJAX applications, you frequently want a link on a
page to just do asynchronous things. You don't actually want the link to
go anywhere.

Let's just ignore the fact that this goes against [progressive
enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement) okay?

## Can I see your ID please?

So sometimes the link is important enough, and you throw an `id` on it
and you can do this in jQuery.

    $('#important-link").click(function() { alert('trololol'); });

## Stay classy

Sometimes you have multiple links which need to do the same thing, so
you give it a class.

    $('.kind-of-important-link').click(function() { alert('trololol'); });

## App frameworks to the rescue…?

Sometimes, for whatever reason, the links just use anchors. The `href`
attribute of the link is something like `#my-link` instead of a real
URL.

This works fine if you are using this for its original purpose (even in
IE7), jumping to an element with the `id` of `my-link`, but if an app
was built using this as the way to do javascripty things, you'll run
into problems.[^1]

You probably want to do something like this:

    $('a[href="#my-link"').click(function() { alert('trololol'); });

In IE7 land however (or at least this specific application), the `href`
gets replaced with the entire current URL with the anchor fragment
tacked onto the end, so jQuery doesn't match `$('a[href="#my-link"')`
anymore. You need to use the `attributeEndsWith` selector.

    $('a[href$="#my-link"').click(function() { alert('trololol'); });

And there was much rejoicing.

[^1]: Any sammy.js users out there?

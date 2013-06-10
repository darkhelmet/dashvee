--- 
id: 419
author: Daniel Huckstep
title: Screen Scraping With Ruby
category: software
description: I scrape and download the internet with ruby.
published: true
publishedon: 02 Nov 2009 08:00 MST
slugs: 
- screen-scraping-with-ruby
tags: 
- ruby
- hpricot
---
Scripting languages are the bomb. I pretty much live in them right now.

Ruby is my current (and probably will be for a long time) favourite
scripting language, and it has a library for everything. Even if there
isn't a library for what you want, it's super easy to write your own.

I ran into a problem a while back that ruby solved nicely for me. I was
downloading wallpapers from a website, but it was getting annoying.
Really, I just wanted to grab them all, but of course didn't want to
spend the time doing it myself. With 4GB+ of hi resolution wallpapers to
download it would have taken me ***forever*** to download them all by
hand.

So instead I wrote a little script to do it, and let it run.

I'm not going to post the entire script verbatim, since it's old code
now, doesn't work anymore (the site is sort of gone), but I'll explain
and post relevant bits

First, there is a main page which lists all the other pages
(thankfully), so I can grab that page and get the main list of things to
download. They are all the links that match a certain regex:

<script type="text/javascript" src="http://gist.github.com/223929.js?file=links-matching.rb"></script>

It's been a while since I wrote the code, but I uniq'd and flatten'd the
`main_links` array too. Can't remember why.

There are also multiple pages per item, if that makes sense. The main
page would have links for Foo, Bar, and Baz, but then there might be
foo-2.htm, foo-3.htm, etc. These aren't linked nicely, so I just sort of
iterated up to 20 and checked to see if the page was there, and added
those too:

<script type="text/javascript" src="http://gist.github.com/223929.js?file=multiple-pages.rb"></script>

I had to check for the unavailability of the page that way, since they
did it weird, doing a redirect and then showing a 404 page, but never
giving a 404 response code. Weird.

I also threw a sleep in there, to be a little nice.

Now the fun part starts. They had a Javascript function 'protecting' the
links. In order to open the page, a Javascript function 'decoded'
something which made the link, and then this link would be the URL of
the page holding the high-res image. It was easy to rewrite said
function in ruby.

Now I was ready to process things more thoroughly:

<script type="text/javascript" src="http://gist.github.com/223929.js?file=download.rb"></script>

Iterate through, find the links I want, pull out the relevant 'code' and
decode it, visit ***that*** link, find the image I want, then download
it.

A little while later, I've got a ton of images for desktop goodness.
Ruby Win.

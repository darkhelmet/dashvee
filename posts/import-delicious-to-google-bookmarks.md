--- 
id: 478
author: Daniel Huckstep
title: Import Delicious To Google Bookmarks
category: software
description: I have the answer to migrating all your Delicious bookmarks to Google Bookmarks.
published: true
publishedon: 16 Dec 2010 23:00 MST
slugs: 
- import-delicious-to-google-bookmarks
tags: 
- delicious
- google-bookmarks
- ruby
- capybara
- selenium
---
You [may](http://gizmodo.com/5714292/rest-in-peace-delicious)
[have](http://kommons.com/questions/401)
[heard](http://www.centernetworks.com/yahoo-delicious-closure), but
Delicious is getting the boot.

I left Delicious long ago, because it never did anything for me. Yeah I
could bookmark things, share them, whatever. I never went back to the
bookmarks though. I wanted my bookmarks to work seamlessly with how I
used the web. That means, it had to work with Google.

## Back in the day

I used Google Bookmarks back when I was evaluating bookmarking apps in
2008 (when I settled on Delicious) and it wasn't that fantastic as I
remember it. Now though, it's pretty slick.

I use the Bookmark and the Web History services. That way, all my
bookmarks, as well as places I've been to but just haven't bookmarked,
are integrated into my Google searches. No more
*what-was-that-site-again* scenarios, I just search for kind of what I
need, and it's at the top of my search results. If I'm really lost, I
can go directly to the Google Bookmarks and Web History page and search
there too.

Anyway, this whole Delicious thing got me thinking. I still had 600
bookmarks in Delicious sitting around. The fact that they've been there
for 2 years without me doing anything about them should probably say
something, but if I can keep them around, why not? I'm a bit of a data
packrack.

## Most of our imports come from overseas

With Delicious, you can [export your
bookmarks](https://secure.delicious.com/settings/bookmarks/export) as
everybody and their dog is doing, but what the hell do you do with them
now?

Import them to Google Bookmarks, that's what.

## But how?

Google Bookmarks doesn't have an API, or if it does, it's hard to find.
Luckily, we live in an age of ruby and
[Selenium](http://seleniumhq.org/).

I wrote a little script that takes the Delicious export file, and uses
the capybara rubygem to operate the Google Bookmarks *Add Bookmark* form
to submit all your Delicious bookmarks to Google Bookmarks. It's pretty
quick, maybe 10 or 15 minutes for my 600. **You need Firefox installed,
or check the capybara docs on how to tell it to use a different
browser.**

Run it like so: <code>ruby delicious2Google.rb
[johndoe@gmail.com](mailto:johndoe@gmail.com) password
delicious-12345.htm</code>

<script src="https://gist.github.com/744356.js?file=delicious2Google.rb"></script>

Before I exported, I added the **delicious** tag to all my bookmarks so
I'd know which ones came from Delicious. I'd recommend this too, and
then you can refresh the Google Bookmarks page in another window to
watch the import progress.

Happy importing.

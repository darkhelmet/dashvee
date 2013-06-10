--- 
id: 366
author: Daniel Huckstep
title: RSS Fun With feedzirra
category: programming
description: Using feedzirra to mess around with RSS feeds.
published: true
publishedon: 24 May 2009 08:00 MDT
slugs: 
- rss-fun-with-feedzirra
tags: 
- ruby
- rss
- feedzirra
- nokogiri
---
Sometimes, checking RSS feeds is boring.

Sometimes you just want to grab a picture or whatever from each item.

For that, there's ruby. Oh and feedzirra.

There is an RSS feed I read, except it's more of a picture feed and I
just want to grab the pictures from it, and doing this through Google
Reader is no fun.

That's where ruby and feedzirra come in.
[feedzirra](http://github.com/pauldix/feedzirra) is a ruby gem for
dealing with RSS feeds. It's got a great interface and just works.

So let's check this out.

We can grab the feed like this:

    feed = Feedzirra::Feed::fetch_and_parse(FEED)

Assuming FEED contains the URL for the feed.

Now we can play around. The easiest thing is just to play with each
entry.

<script type="text/javascript" src="http://gist.github.com/177764.js?file=feedzirra-example.rb"></script>

The specifics for your feed will vary, but in this case I do a few
things. I first print out a message so on the command line I can see
that things are happening.

Using Nokogiri I grab the img tag and it's inner HTML (the to_html
call).

Parse out the link with some regular expressions. Now I have the actual
URL to the image I want to save. I get the filename easily with the
split line, and check that it doesn't exist. If it does, we move on.

If the file *doesn't* exist, we can use another method I from my own
[darkext](http://github.com/darkhelmet/darkext) library on the Net
module to download and save the file.

Pretty simple eh? I love ruby.
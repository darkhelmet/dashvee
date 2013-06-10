--- 
id: 488
author: Daniel Huckstep
title: Worst URL Shortener Ever
category: programming
description: I make the worst and simplest URL shortener ever.
published: true
publishedon: 26 Jun 2011 10:00 MDT
slugs: 
- worst-url-shortener-ever
tags: 
- riak
- ruby
---
I was bored last night, so I hacked this up. My original thought was
since riak has an HTTP interface, I could just proxy `GET` requests to
it when a short URL was used, but either I was doing it wrong or you
can't set the `Location` header when you `POST` documents. Oh well.

Anyway, this uses riak just to store the URL, and the riak key as the
*short* URL key. There is no error checking, UI, or anything fancy. It's
pretty much the simplest thing that could possibly work.

<script src="https://gist.github.com/1047235.js?file=shrt.rb"></script>

Also, it's kind of a lie, since the URLs it makes are actually a little
long. Whatever.

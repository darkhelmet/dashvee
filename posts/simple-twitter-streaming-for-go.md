--- 
id: 511
author: Daniel Huckstep
title: Simple Twitter Streaming For Go
category: programming
description: I made a new package for the Go programming language to do Twitter streaming.
published: true
publishedon: 15 Jun 2012 10:00 MDT
slugs: 
- simple-twitter-streaming-for-go
tags: 
- golang
- twitter
- api
---
I scratched my own itch. I made
[twitterstream](https://github.com/darkhelmet/twitterstream)

I was working on a little script to pull some images from Twitter, and
wasn't happy with what was out there. The ruby gems available were
throwing random exceptions or just pulled the JSON down into a hash.

I'm all about the [Go programming language](http://golang.org/) lately,
so I started working in Go instead.

There were two libraries available, both named twitterstream, but
neither worked the way I liked. Both use oatuh, and well, screw oauth. I
just wanted to use my username and password for this little script. One
of them hadn't been updated for Go1, and the other didn't have a proper
type for a tweet. Granted, it does let you deserialize into whatever you
want, so you could use a simple struct with only the text if that's all
you wanted, but I wanted the whole tweet.

So I wrote [twitterstream](https://github.com/darkhelmet/twitterstream)

It's pretty straightforward to use. It has a synchronous API, so you use
it like that, or dump it into a goroutine and use it asynchronously too.

Install with `go get github.com/darkhelmet/twitterstream` and use like
this:

<script src="https://gist.github.com/2928036.js?file=test.go"></script>

For the full docs, head to
[http://go.pkgdoc.org/github.com/darkhelmet/twitterstream](http://go.pkgdoc.org/github.com/darkhelmet/twitterstream)

I'll probably add oauth at some point, but not right now. If you want
to, go nuts, and send a pull request my way.

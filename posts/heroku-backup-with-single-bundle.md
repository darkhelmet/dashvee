--- 
id: 428
author: Daniel Huckstep
title: Heroku Backup With Single Bundle
category: software
description: You backup right? I show you how to backup your Heroku app with ease.
published: true
publishedon: 12 Dec 2009 21:00 MST
slugs: 
- heroku-backup-with-single-bundle
tags: 
- heroku
- ruby
- backup
- amazon
- s3
---
In case you missed it, the [Coding
Horror](http://www.codinghorror.com/), [Stack
Overflow](http://blog.stackoverflow.com/) and
[Haacked](http://haacked.com/) blogs died in almost a literal fire. Well
I don't think there was an actual fire, but basically they all hosted
their blogs in virtual machines on the same physical server, and the
backup process never backed up the virtual machine files since they were
always in use. The backup process was managed by the hosting company and
silently failed on these files. Oops.

While I'm fairly confident this blog isn't going anywhere (it's hosted
by Heroku, and they [back stuff up](http://docs.heroku.com/backups)), it
still gave me that little twitch in the back of my head that I should do
something.

Voila

<script type="text/javascript" src="http://gist.github.com/255263.js?file=gistfile1.rb"></script>

Hacked that up pretty quick. It assumes you have a single bundle enabled
for your app, which is free. I destroy any bundle there, create a new
one, download it, and push it up to Amazon's S3 service (which I'm
confident in).

Quick and dirty, but much better than nothing. It's a full dump,
including source code for that branch (with Heroku you just `git
push`).

There's no error checking so if something breaks, I'll see it in my cron
email. I'll get an email regardless, since it does output stuff to the
console.

I encourage you to use it yourself, or write your own script.

--- 
id: 390
author: Daniel Huckstep
title: "apt-runner: Just Install It For Me, Please!"
category: programming
description: A little utility to get around the apt lock problem.
published: true
publishedon: 11 Jul 2009 08:00 MDT
slugs: 
- apt-runner-just-install-it-for-me-please
tags: 
- ubuntu
- aptitude
- github
- apt-runner
---
Picture this: You are reading some tutorial or whatever, and you need to
install some things. So you run 'aptitude install prog1 prog2'. Then you
realize you need prog3 and 4 too, so you CTRL+C that, and run 'aptitude
install prog1 prog2 prog3 prog4'. Then you see you need something else.
Rinse and repeat.

This is *really* annoying.

The worst part is you can't run multiple aptitude instances, because
they'll whine about file locks or something. I just want to tell it to
install stuff for me, and do it when you get the time. I understand you
can't do it now, but install this when you can.

So I wrote this little app, which is very small, very minimal, and will
probably break, but works for me. It's pretty much [the simplest thing
that could possibly
work](http://c2.com/xp/DoTheSimplestThingThatCouldPossiblyWork.html)

[apt-runner](http://github.com/darkhelmet/apt-runner)

Basically, it watches for new files in a directory, and if a new file is
created, will pass the contents to aptitude. You need sudo NOPASSWD
enabled for the aptitude binary for this to work though.

So you run this little daemon that watches the files, and then instead
of running aptitude, you run auo-apt, and it will pass things off
through the daemon. So you can do this:

    apt-runner install foo; apt-runner install bar; apt-runner install baz

And all those programs will get installed, *eventually*. The commands
get run one by one, not necessarily in order.

This does what I want. It just accepts my commands to install things,
and does them eventually, and doesn't whine about file locks, and you
don't have to kill things.

You can use it too, if you want. Just grab the code from
[Github](http://github.com/darkhelmet/apt-runner) and try it out. More
information is in the readme.

--- 
id: 377
author: Daniel Huckstep
title: Parallel Processing In The Real World
category: editorial
description: I discuss grocery and movie lines in relation to parallel programming.
published: true
publishedon: 06 Jun 2009 08:00 MDT
slugs: 
- parallel-processing-in-the-real-world
tags: 
- concurrency
---
I go to movies. Lots of movies. Usually I get popcorn or a drink. Not
always, but usually. What can be counted on, however, is the movie
theatre staff ensuring that instead of everybody waiting in a single
line, and popping off the top like a queue, we all wait in 3 or 4
separate lines.

Why is this? It's stupid.

At the Tim Horton's in my building, they do it properly. One big line, 3
tills, and they just call the next person. The line moves so fast even
with 30 people in it.

Why is that? It's smart.

If you've ever made a Debian mirror, you'll see it uses wget. This faces
a similar problem. What it does, is make a list of all the files it
needs to download, split the list into X equal groups (where X is
defined in a config file, meaning the number of processes to use), write
out each list to a file, one URL per line, then start up X wget
processes with the URL file as the argument, which in turn downloads
each file.

Flawed! One process gets stuck downloading some large file, which is the
first one in that list, all the other processes finish, and there are 50
files left in the final list, and one process to finish downloading them
all.

You see this problem in grocery stores as well. Same problem, and you're
stuck trying to figure out the best line to be in. At the University of
Alberta bookstore during the initial semester book buy frenzy, they do
it properly. One big line, 15 tills! It works great.

I tend to notice these things now, and when it's stuff like this, it
bothers me. Think about it next time you're in line somewhere.

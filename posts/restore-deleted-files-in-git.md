--- 
id: 472
author: Daniel Huckstep
title: Restore Deleted Files In Git
category: software
description: Randomly noticed you're missing a file? Find and restore it with git!
published: true
publishedon: 19 Oct 2010 14:00 MDT
slugs: 
- restore-deleted-files-in-git
tags: 
- git
- scm
---
Ever been working on a project for a while, then go work on something
else, then come back after a few weeks? Sure you have.

Ever come back and somebody deleted your nice nginx config file you had
in there for your local dev server? Ever wonder where the hell it went?
Well wonder no more!

I had this happen a couple days ago. Somebody deleted my `nginx.conf`
file. It was just gone.

## Find it!

First things first, I had to find the file. A little bit of Googling[1]
and looking at git docs, I found this:

    git log --diff-filter=D --summary

This prints the summary of all commits that have deletes. Awesome. Now
you can look through in which commit your file was deleted.

## Restore it!

Once you have that, you can use the commit hash in the next command:

    git checkout COMMIT^ —- file

And that will restore your file. Rinse and repeat for multiple files.

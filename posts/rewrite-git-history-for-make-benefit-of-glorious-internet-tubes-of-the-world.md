--- 
id: 435
author: Daniel Huckstep
title: Rewrite Git History For Make Benefit Of Glorious Internet Tubes Of The World
category: software
description: I show you how to completely purge objects from a git repository. Use with care!
published: true
publishedon: 08 Jan 2010 08:00 MST
slugs: 
- rewrite-git-history-for-make-benefit-of-glorious-internet-tubes-of-the-world
tags: 
- git
- filter-branch
- scm
- source-control
---
Sometimes you do silly things.

Like check big binary files into source control. Ones that shouldn't be
in source control.

This causes problems. Okay, well not really *problems*, but it has some
effects.

Cloning the repository takes longer, of course, since there are big
files, and other operations can take longer too.

But fret not! If you need to purge files from Git, you can. Now, you
can't just remove the file, since it's still technically in there, and
because git deals with directories (and basically the repository) as a
whole, instead of single files like CVS, SVN, and Perforce, there isn't
an
[obliterate](http://www.perforce.com/perforce/doc.091/manuals/cmdref/obliterate.html)
command. There is *filter-branch* though.

#### Disclaimer

Doing this will alter the git repository in an irreversible manner.
Backup first, and procede with caution. Remember, this blog post comes
with [no warranty!](http://blog.darkhax.com/disclaimer)

[This blog
post](http://mocra.com/blog/2009/05/21/rewriting-history-in-git/) was
quite useful in helping remove some silly files.

It comes down to:

    git filter-branch —index-filter 'git rm -r --cached --ignore-unmatch BIGTHING' HEAD

You can replace BIGTHING with a path to a file or folder, and that thing
will be purged completely from the repository. This rewrites history all
the way back, so doing this can cause problems when you push somewhere,
or when people try to pull from you. They will have to clone a fresh
copy and your push destination will probably have to be pushed from
scratch too.

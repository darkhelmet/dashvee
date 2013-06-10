--- 
id: 361
author: Daniel Huckstep
title: Git Things I Always Forget
category: programming
description: I always forget these things.
published: true
publishedon: 18 May 2009 08:00 MDT
slugs: 
- git-things-i-always-forget
tags: 
- git
---
Create a branch locally, and push it to origin:

    git checkout -b branchname
    git push origin branchname

Get at that branch from elsewhere:

    git checkout -t -b branchname origin/branchname

--- 
id: 415
author: Daniel Huckstep
title: Why The Github's Really Are Better Than The cvsdude's
category: editorial
description: I compare companies building their own product vs utilizing and supporting 3rd party stuff to provide you a service.
published: true
publishedon: 12 Oct 2009 08:00 MDT
slugs: 
- why-the-github-s-really-are-better-than-the-cvsdude-s
tags: 
- source-control
- github
- hosting
- git
---
There are a lot of hosted source control providers out there. Github,
bitbucket, cvsdude, ProjectLocker, Codaset, SourceForge, Codeplex,
Google Code, Beanstalk, and I could probably keep going until all 5 of
you stopped reading my blog.

Personally, I'm a Github kind of guy. From the looks of things, I would
also enjoy Codaset or bitbucket.

We use cvsdude at CodeBaby, and while it gets the job done, it's not
something I'd use otherwise.

First, the rational for the use of cvsdude at work:

-   It has an acceptable SLA
    ([meh](http://blog.darkhax.com/2009/08/31/service-level-agreements-who-cares))
-   It talks SVN so it can host the older projects we have (Me
    personally, who cares about svn, but I can appreciate this)
-   It has [trac](http://trac.edgewall.org/) built-in so the old
    projects can simply import their trac data (See above)

There might have been more, but I sort of stopped caring since whining
about it wasn't going to solve anything.

I made the argument for Github, but that was shot down for a number of
reasons:

-   Lack of trac (But they integrate with everything else, and have
    built-in issue tracking)
-   Lack of SVN (I hate SVN, so this is a win for me)
-   No SLA the bosses were happy with (as above, meh)
-   Git (I love git, and we are moving to OS X, but everybody at work
    seems to have a fear of git. Plus everybody is on Windows machines
    except me)

So, whatever. It's not the end of the world for me; I just use git-svn,
and I can at least pretend.

But that's not what I wanted to talk about…

It is my firm belief that *Github and others like it are still just
better than many other hosted source control providers, specifically
those of the cvsdude kind.*

So I should probably explain, as there are some fundamental differences
between between Github and cvsdude.

**DISCLAIMER**

I am speaking from experience with Github and cvsdude. From what I have
seen, other providers (such as those I listed in the beginning) fall
into either one of the groups I will describe, however I have no actual
experience with any of them unless noted, so I am being somewhat
speculative. Take this with a grain of salt, and comment if you feel
I've made mistakes.

Here goes: *Github is new school, cvsdude is old school.* Github is on
board with new technology and ideas like git, web hooks, effective use
of ajax, and social software. They built everything (by everything I
mean the user facing stuff) from scratch, and did it all themselves. On
the other hand, cvsdude took existing, free, off the shelf products, and
hooked up a few things to make them play nice together, all controlled
from an interface that is a great example of poorly used ajax
techniques.

Github could have hooked up gitweb or cgit and redmine and called in a
day. That's basically what cvsdude does: generic SVN server + trac +
Bugzilla = profit. They are sysadmins. The Github guys are developers,
writing software for developers, and it shows. When you are using
cvsdude, you have to open a new windows to view the source (viewvc,
yuck), open a new windows to track tickets and other things (trac,
yawn), and yet another window for separate bug tracking (Bugzilla,
gross).

Github integrates everything because it's all unique to Github. They
didn't glue pieces together, they built it. Github is software by
developers, for *today's* developers, and cvsdude is just behind the
times. The other providers like Github (bitbucket, Codaset) are in a
similar boat. Custom stuff to make it stand out and rise above.

All your commits are belong to Github.

On a side note, I'm such a fanboy…

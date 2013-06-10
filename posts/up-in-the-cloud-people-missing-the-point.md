--- 
id: 358
author: Daniel Huckstep
title: "Up In The Cloud: People Missing The Point"
category: editorial
description: I rant about people comparing cloud backup to local backup.
published: true
publishedon: 17 May 2009 13:58 MDT
slugs: 
- up-in-the-cloud-people-missing-the-point
tags: 
- backup
- cloud
- hosting
---
You'll hear the phrase "the cloud is the future" a lot floating around
the tubes, and a lot of people seem to dismiss it. I came across
[this](http://www.linuxhaxor.net/2009/05/16/ubuntu-one-future-of-ubuntu/)
from my RSS feeds, and one comment in particular caught my eye.

> I can get 1.5 tb hard drives for less than 70 Euros and they are accessible even if my net connection is down.

I didn't quote the entire comment, since the poor grammar caused my head
to hurt…

This person is clearly missing the point. They've obviously never really
thought about why you have a backup. I used to backup to my server in my
house. That worked great when my laptop hard drive crashed, and I had to
get everything back quickly to get things running for school again. And
for most people that's fine.

The fundamental problem is that the backups are *on site*. For those
that don't know, there are basically on site and off site backups. On
site is where the backup resides in the same general area or building
that the original data was, and off site means it's somewhere completely
different. For example, my dad backs up to a portable hard drive, but
when he goes anywhere, family trip, even to work in the morning, he
takes the drive, so that's a bit of a blend between on and off site
backup. I now backup to [Jungle Disk](http://www.jungledisk.com/), which
goes off into the cloud on the Rackspace servers, is encrypted 6 ways
from Sunday, and just sits there. This is completely off site.

So what's the point off off site backups? What if your house burns down?
Not only is the computer you backed up gone, but the backup is gone too,
and now you have no data.

Handing off backups to some remote service just removes some of the
headaches associated with backups. If it's in the cloud, you don't have
to worry about the little things. You pay a little bit a month, for
somebody else to manage the hardware that takes care of your data.
Hopefully if you're smart and pick a good company, they have secure,
redundant, data centers, with wide pipes to the net, and a good price
point. You just install the software, select what you want to backup
(maybe just your entire home directory), and sit back and relax.

The other part of the comment above, is that the cost of hard drives
today is so cheap you're better off buying your own and doing it
yourself, if only for the cost. Well again, you're paying for an off
site backup. You're paying for this company to maintain it's amazing
server farm with full security, which, I don't care who you are, their
servers are better than whatever you can muster in your own house.
You're paying for access anywhere with internet. Some people whine about
that too, and say that the internet goes down sometimes, this that and
the other thing, and whatever else. So basically, you don't want to use
the internet because it goes down sometimes? Well have fun not using
anything ever. Your car breaks down occasionally, are you never going to
drive? The toilet plugs up once in while, are you never going to…well
you get the idea. Just because something has it's flaws and doesn't work
on occasion is no reason to dismiss it and never use it. I bet those
same people use Gmail, which is ironic, since if they lost their
internet connection randomly, they couldn't read email either, and would
be in a similar situation.

As a quick little note, in my opinion, the cloud isn't meant as a
storage place for your data, so the people that complain that they can't
put their terabytes of music and movies up there are way out to lunch.
Backing up important data (and as much as I love my music, it's not that
important) is the main purpose.

Putting things in the cloud also has applications for web hosting.
Companies like Amazon with their EC2 setup for general applications, and
[EngineYard](http://www.engineyard.com/) and
[Heroku](http://heroku.com/) for ruby/rails/rack hosting all live in the
cloud. If you need to host something, you're going to pay for it
somehow, either with bandwidth costs on your end, electricity running
servers, people costs (paying a sysadmin), or other things. Why not just
pay someone else to deal with all that stuff? You're not in the business
of providing host solutions or sysadmin work, you're in the business of
providing [software as a
service](http://en.wikipedia.org/wiki/Software_as_a_service) and you
shouldn't have to think about hosting and stuff like that. Build your
software, deploy it, profit, and pay somebody else to host it.
Everything is backed up, should scale, and everybody wins.

What it comes down to is some people are just missing the point of the
cloud. It's out there to help you solve problems that you shouldn't have
to think about. It gives you more time to think about the important
things. It gives you global, 24/7 (for argument sake, realistically it's
like 99.9% of the time) access to your 'stuff'.

Spending $100 on a new hard drive won't give you any of that, just more
data to backup.

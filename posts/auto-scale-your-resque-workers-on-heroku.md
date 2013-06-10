--- 
id: 467
author: Daniel Huckstep
title: Auto-scale Your Resque Workers On Heroku
category: programming
description: I leverage Heroku's API to keep my costs down.
published: true
publishedon: 30 Jul 2010 13:00 MDT
slugs: 
- auto-scale-your-resque-workers-on-heroku
tags: 
- heroku
- redis
- resque
- auto-scale
- redistogo
---
Let's get some background information out of the way.

I'm working on a new application, and am using crazy new things that I haven't had a chance to *really* use before. Rails 3, MongoDB, Redis and Resque, HTML5, etc. <sup>[1](#fn1)</sup>

With all these things, I figured I'll just use [EngineYard](http://www.engineyard.com/) since I can pretty much do whatever I want with the server, and they have a lot of the "stuff" taken care of. But they don't support MongoDB out of the box, and you have to some magic with [chef](http://wiki.opscode.com/display/chef/Home) scripts, and then to keep your [Resque](http://github.com/defunkt/resque) workers running, you need to write stuff for that too, and so on.

I did that originally, but frankly, I'd rather be working on my app than the infrastructure.

## Heroku to the rescue

As you might know, I'm a big fan of [Heroku](http://blog.darkhax.com/search?q=heroku). This blog runs on it, and I don't have to ever think about it. It. Just. Works.™

Now, there's nothing wrong with EngineYard, but I want to deal with as little infrastructure crap (or at least the boring parts) as possible, and Heroku lets me do that. Plus, I get some things for free, like NewRelic RPM.

## redistogo

Along comes [redistogo](http://redistogo.com/) with their Heroku integration (for beta users, which I am) and a [blog post](http://blog.redistogo.com/2010/07/26/resque-with-redis-to-go/) on how to use Resque with Heroku. What, what, what? You can just alias the rake task and Heroku's system doesn't know the difference. Oh Em Gee.

## My wife has been quite adamant about the money <sup>[2](#fn2)</sup>

This app I'm working on, I'm hopefully going to have to pay for at some point, as I hope enough people will want to use it that the free stuff from Heroku just won't cut it. However, the less I can pay the better, and background job workers aren't free on Heroku. They are, fortunately, billed by the second.

So let's get some auto-scale [up in this bitch](http://www.explosm.net/comics/1311/) shall we? <sup>[3](#fn3)</sup>

~~First off, grab my [fork of resque](http://github.com/darkhelmet/resque/tree/after_enqueue). I added `after_enqueue` hook support, which is needed for the auto-scaling. <sup>[4](#fn4)</sup>~~

**Update:** Chris Wanstrath pulled in my changes, so any version of resque 1.10 or higher has `after_enqueue` support.

You can use this in a `Gemfile` like so:

<script src="http://gist.github.com/501160.js?file=Gemfile"></script>

Now throw this in your `lib` directory,

<script src="http://gist.github.com/501160.js?file=heroku_resque_auto_scale.rb"></script>

…and `extend` any Resque job classes with it.

<script src="http://gist.github.com/501160.js?file=scaling_job.rb"></script>

You'll need to set some [Heroku config variables](http://docs.heroku.com/config-vars) for your application name, username (email), and password. You can also of course alter the scaling logic to do whatever you need it to do. Mine scales up workers after a job is enqueued based on the number of pending jobs, and after a job finishes, turns off the workers if there are no more jobs pending.

Make sure to set the workers to 1 on your command line just to make sure it works, since if you haven't done anything before that requires payment, Heroku might require you to confirm, in which case the auto-scaling fails.

Now, your workers only run when they need to. You don't need to have a bunch of workers running for those times the job queue does get a little backed up, and you don't even need to keep track of it, because it will scale itself without you having to mess with it. Enjoy.

<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> Let's see how many other buzzwords I can cram into this post…</p>

<p class="footnote" id="fn2"><a href="#fnr2"><sup>2</sup></a> Homer pays off the mob to get rid of competition for Marge's pretzel business, and Fat Tony comes back claiming "[his] wife has been quite adamant about the money" in <a href="http://en.wikipedia.org/wiki/The_Twisted_World_of_Marge_Simpson">The Twisted World of Marge Simpson</a></p>

<p class="footnote" id="fn3"><a href="#fnr3"><sup>3</sup></a> By auto-scaling, I mean spin up workers when we have work to do, and shut them down when there are no jobs.</p>

<p class="footnote" id="fn4"><a href="#fnr4"><sup>4</sup></a> I sent a pull request. If anything changes, I'll update this post.</p>

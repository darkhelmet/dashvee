--- 
id: 440
author: Daniel Huckstep
title: What Todo Indeed
category: software
description: I discuss todo list applications.
published: true
publishedon: 23 Jan 2010 08:00 MST
slugs: 
- what-todo-indeed
tags: 
- gtd
images: 
  blank_task: 
    medium: http://cdn.verboselogging.com/transloadit/medium/99/1ebfcba4d0269d87fb7ef309507c9c/blank-task.jpg
    original: http://cdn.verboselogging.com/transloadit/original/55/393ef5736e6b7d0142c97555135eda/blank-task.jpg
    large: http://cdn.verboselogging.com/transloadit/large/96/8f785dcd042fe8549c27e1901e0b07/blank-task.jpg
    small: http://cdn.verboselogging.com/transloadit/small/c1/11ede78d053851f60b1494665a9ac1/blank-task.jpg
  gmail_tasks: 
    medium: http://cdn.verboselogging.com/transloadit/medium/13/ee703952489ae41f2d46f0dc3c858a/gmail-tasks.png
    original: http://cdn.verboselogging.com/transloadit/original/66/05a72f666a95556fa766b6da38933c/gmail-tasks.png
    large: http://cdn.verboselogging.com/transloadit/large/35/0d68193aed73a7701597e1b6807da0/gmail-tasks.png
    small: http://cdn.verboselogging.com/transloadit/small/da/ebf61c34e8b7e32ba22aa0a6e7ffaa/gmail-tasks.png
  tada_lists: 
    medium: http://cdn.verboselogging.com/transloadit/medium/f4/78ce34712780eebff5b9c022036e01/tada-lists.png
    original: http://cdn.verboselogging.com/transloadit/original/f6/997635274fc94c6228d0220af1ed64/tada-lists.png
    large: http://cdn.verboselogging.com/transloadit/large/03/af13910a4fa2b844dd83db58cc1e99/tada-lists.png
    small: http://cdn.verboselogging.com/transloadit/small/db/3a02773f7b490003ccb5b0c816a3a2/tada-lists.png
  tracks: 
    medium: http://cdn.verboselogging.com/transloadit/medium/68/bc359c7fb62ef01a9ecc92ad6e1125/tracks.png
    original: http://cdn.verboselogging.com/transloadit/original/5a/aaa377bf55ceb7fdfd34931905c95f/tracks.png
    large: http://cdn.verboselogging.com/transloadit/large/da/d27745285b05ac6d866067f8af2851/tracks.png
    small: http://cdn.verboselogging.com/transloadit/small/b4/27a493433fe24f38b1f80664b5a62f/tracks.png
---
<p>You&#8217;d think the todo list problem was solved by now.</p>
<p>Email is solved. Google solved it. Srsly. If you aren&#8217;t using Gmail, what&#8217;s really stopping you? No, Yahoo! and Microsoft aren&#8217;t doing it better. Google wins.</p>
<p>Spam is pretty much solved. Google once again solved it by sheer volume, you throw millions of emails at a <a href="http://en.wikipedia.org/wiki/Bayesian_spam_filter">Bayesian filter</a> with crowd sourcing (<a href="http://img.skitch.com/20100123-b22hpd9ujep3xjb5qgrs3xjp2.png">that little button in Gmail? that&#8217;s crowd sourcing</a>) and it gets pretty damn smart.</p>
<p>Okay maybe I&#8217;m just being too picky. I want a specific type of todo list. Here&#8217;s what I&#8217;ve tried.</p>
<h2>Tracks</h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/5a/aaa377bf55ceb7fdfd34931905c95f/tracks.png"><img src="http://cdn.verboselogging.com/transloadit/medium/68/bc359c7fb62ef01a9ecc92ad6e1125/tracks.png" class="fright bleft bbottom round medium" alt="" /></a></figure></p>
<p><a href="http://getontracks.org/">Tracks</a> is a <a href="http://en.wikipedia.org/wiki/Getting_Things_Done"><span class="caps">GTD</span></a> tool. You have <em>contexts</em>, which is a <em>place</em> where you would do something. Laptop, phone, and home are all contexts. You have projects, which are small groups of things with an outcome. An example would be <em>change oil in the car</em>. You have <em>actions</em>, sometimes (probably more frequently), <em>next actions</em>. These are things you actually do. If you are going to change your own oil, your actions would be: Find out what oil I need, buy oil, change oil. Those actions would all be in the &#8216;change car oil&#8217; project, and they might be in the contexts of &#8216;car&#8217; (look in your vehicle manual), &#8216;errands&#8217; (buy the oil at the store), and &#8216;home&#8217; (in your garage).</p>
<p>I really like this system. And I really like Tracks. I have my own little instance hosted on Heroku, and it works pretty good, but lately it&#8217;s been giving me crap, and I hacked in iPhone support (read: completely gutted the mobile views to display iPhone happy stuff). It also seems to get kind of slow with a bunch of things in it.</p>
<p>Not a big deal. I <em>could</em> work on it more, speed it up, but frankly I&#8217;d rather be doing other things. It&#8217;s also on rails 2.2.2 and has a couple plugins being used that I think aren&#8217;t needed if it were running a newer version. Subsequently, the times I did tried to upgrade it and whatnot ended in frustration, because, like I said, I&#8217;d rather be <del>fishing</del> doing other things.</p>
<h2>Ta-da Lists</h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/f6/997635274fc94c6228d0220af1ed64/tada-lists.png"><img src="http://cdn.verboselogging.com/transloadit/medium/f4/78ce34712780eebff5b9c022036e01/tada-lists.png" class="fright bleft bbottom round medium" alt="" /></a></figure></p>
<p><a href="http://tadalist.com/">Ta-da Lists</a> is a <a href="http://37signals.com/">37signals</a> product, and unlike their other excellent products, it&#8217;s totally free! It has some pretty nice <a href="http://img.skitch.com/20100123-qrpqx77h4n3hcug89kt4h3q8fb.png">features</a> and is really fast since it&#8217;s so simple. Works great on the iPhone, etc, etc.</p>
<p>My problem is that Ta-da Lists is <em>too</em> simple. I don&#8217;t mind the single level organization of just having &#8216;lists&#8217;, but there is no due date support, and no way to attach notes to things, which is something I frequently do (research pickles, with a link to information about pickles). Granted this is by design, and as the simplest thing that could possibly work, Ta-da Lists is great. It&#8217;s super slick, but it&#8217;s just&#8230;not&#8230;quite&#8230;there for me. So close. It&#8217;s so nice though I <em>want</em> to like it more, but&#8230;alas.</p>
<h2>Gmail Tasks</h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/66/05a72f666a95556fa766b6da38933c/gmail-tasks.png"><img src="http://cdn.verboselogging.com/transloadit/small/da/ebf61c34e8b7e32ba22aa0a6e7ffaa/gmail-tasks.png" class="fright bleft bbottom round" alt="" /></a></figure></p>
<p><a href="http://mail.google.com/mail/help/tasks/">Gmail Tasks</a> is what I&#8217;m on right now. It&#8217;s simple like Ta-da Lists, but allows for due dates and extra notes. There is an iPhone app that talks to it, and it&#8217;s pretty good. Worth the few bucks I paid for it.</p>
<p>Are you ready for this next part? You&#8217;re going to actually say to yourself, &#8220;are you fucking kidding me?&#8221;. First let me assure you I&#8217;m not, I&#8217;m probably just <span class="caps">OCD</span> or something.</p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/55/393ef5736e6b7d0142c97555135eda/blank-task.jpg"><img src="http://cdn.verboselogging.com/transloadit/small/c1/11ede78d053851f60b1494665a9ac1/blank-task.jpg" class="fright bleft bbottom round" alt="" /></a></figure></p>
<p><strong>It has empty tasks.</strong></p>
<p>You&#8217;ve got to believe me! I&#8217;m being super serial! See that stuff on the right? That&#8217;s one of my lists with nothing in it, yet there is a task there. It&#8217;s so easy to create a task on the web side of things, they do it like it&#8217;s going out of style. There aren&#8217;t even any spinners or anything to indicate that it&#8217;s saving to the server or anything, shit just &#8220;happens&#8221;. I <em>sort</em> of like the lack of spinners. I just putter away and it works&#8230;I think. Then again, indication that it&#8217;s doing something is nice.</p>
<p>The empty tasks really kind of irk me. It&#8217;s subtle, but it&#8217;s there.</p>
<p>Everything else I&#8217;ve looked at is either too much (<a href="http://basecamphq.com/">Basecamp</a>, both in features and cost), too specific (<a href="http://culturedcode.com/things/">Things</a> for iPhone/Mac looks god, but I want a web based get-at-it-anywhere app), or just plain terrible.</p>
<p>So what else is out there? What am I missing? Is it just me? Am I just <em>way</em> too picky for my own good?</p>

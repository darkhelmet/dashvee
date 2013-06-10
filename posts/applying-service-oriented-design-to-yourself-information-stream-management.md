--- 
id: 484
author: Daniel Huckstep
title: "Applying Service Oriented Design To Yourself: Information Stream Management"
category: editorial
description: I discuss how I manage my information stream.
published: true
publishedon: 22 Mar 2011 08:00 MDT
slugs: 
- applying-service-oriented-design-to-yourself-information-stream-management
tags: 
- kindle
- kindlebility
- google-bookmarks
- google-docs
- pinboard-in
- delicious
- instapaper
- readability
- chrome
- service-oriented-architecture
- service-oriented-design
images: 
  coderio: 
    original: http://cdn.verboselogging.com/transloadit/original/0f/103e9684168766049ca3a719af6ed6/coderio.jpg
    large: http://cdn.verboselogging.com/transloadit/large/6f/70a0bc699d4186410a40a1fcec356d/coderio.jpg
    small: http://cdn.verboselogging.com/transloadit/small/70/7f601779723bae727044e7c4c351b5/coderio.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/4d/966f759f36ba2b25986aa3eda6a2cd/coderio.jpg
  kindlebility: 
    original: http://cdn.verboselogging.com/transloadit/original/17/be764cd9a96bdc9cd1bcd11785ee93/kindlebility.jpg
    large: http://cdn.verboselogging.com/transloadit/large/b1/443c9ebf962ae103e43574647418ca/kindlebility.jpg
    small: http://cdn.verboselogging.com/transloadit/small/26/b3e8199a26b38f145096e53db26dfc/kindlebility.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/b2/0610bd353e5761ce657c0a13b30ce9/kindlebility.jpg
  pinboard: 
    original: http://cdn.verboselogging.com/transloadit/original/54/37de2efb3a96edce255cbbda243bb9/pinboard.jpg
    large: http://cdn.verboselogging.com/transloadit/large/c9/46b7649c8cacc32ff94a0443172862/pinboard.jpg
    small: http://cdn.verboselogging.com/transloadit/small/16/93bea56b06c0dc28e399752c940bf3/pinboard.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/28/343e08171f55b66b013c765a25d93b/pinboard.jpg
  readability: 
    original: http://cdn.verboselogging.com/transloadit/original/31/bf7ff01d51b137e39546ec2ffdbf69/readability.jpg
    large: http://cdn.verboselogging.com/transloadit/large/35/9b563d523945beb4a81e3da471d310/readability.jpg
    small: http://cdn.verboselogging.com/transloadit/small/02/6d756a6aa83356af37fc2ad0972ff6/readability.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/31/e5f36bf28636795338ecae65e61c95/readability.jpg
---
<p>Service Oriented Design (also known as <a href="http://en.wikipedia.org/wiki/Service-oriented_architecture">Service Oriented Architecture</a>) is a design technique used in software projects, both large and small. It follows the idea that you divide up a program into separate isolated pieces, or <em>services</em>. This sort of separation has a number of advantages.</p>
<ul>
	<li>You can test and debug the pieces individually.</li>
	<li>You can change out pieces for new designs without affecting the rest of the system (provided the new systems use the same <span class="caps">API</span>).</li>
	<li>You can scale the pieces individually (you can spark up more job runners, for example).</li>
</ul>
<p>You can apply this sort of design to your own life and processes. Recently, I&#8217;ve become more aware of how this applies to my own &#8220;reading algorithm&#8221; , and with this realization have taken it even further. I feel I&#8217;ve improved the efficiency of my system, leaving me with more time to do other things.</p>
<p><strong>Like write on this damn blog.</strong></p>
<h2>So what the hell?</h2>
<p>So what&#8217;s this all about anyway? You read Twitter and people post links. You follow <span class="caps">RSS</span> feeds that have interesting articles. You see interesting things on the web in your random browsing. This is about <strong>what the hell do I do with all this information?</strong></p>
<h2>Input stream sources</h2>
<p>The first points of contact to all of this information are the various information input streams. This could be Twitter, <span class="caps">RSS</span> aggregation services like <a href="http://www.postrank.com/main">Postrank</a> and <a href="http://coder.io/">coder.io</a>, your <span class="caps">RSS</span> reader itself (fed by the aforementioned services and other feeds), and random browsing.</p>
<p>I personally use <a href="http://coder.io/">coder.io</a> fed into <a href="http://reader.google.com/">Google Reader</a>, along with various other feeds. I also use Twitter.</p>
<h3><del>Don&#8217;t Cross</del> Managing the streams</h3>
<p>There are a few initial ways to manage the flow of information. Google Reader has a nice little <em>Trends</em> feature. It keeps track of things you read (by marking as such) and don&#8217;t read. If you <em>Mark All as Read</em>, those items don&#8217;t count towards the total read count. You can then see what feeds you don&#8217;t actually read and unsubscribe from them. Google Reader Trends is a great resource for managing feeds, culling those that are of no value to you.</p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/large/6f/70a0bc699d4186410a40a1fcec356d/coderio.jpg"><img src="http://cdn.verboselogging.com/transloadit/medium/4d/966f759f36ba2b25986aa3eda6a2cd/coderio.jpg" class="fright bleft bbottom round medium" alt="" /></a></figure></p>
<p><a href="http://coder.io/">coder.io</a> is another great resource for programmers to find interesting things to read. You subscribe to various topics and get one big feed made up of articles from other feeds which are retrieved and tagged automatically. You can probably clean out any feeds from your reader relating to programming, and just subscribe to coder.io to get your daily does of programming news.</p>
<p class="clear">coder.io isn&#8217;t perfect, so I pair it with <a href="http://pipes.yahoo.com/">Yahoo Pipes</a>. It lets me filter out bogus things, like stuff from Reddit and Sourceforge, stupid titles (Follow Me on Buzz), and other things I pay attention to in other ways. For example, I subscribe to <a href="http://thechangelog.com/">The Changelog</a> with iTunes, so I don&#8217;t need to hear about it from coder.io, even if it does talk about something I care about.</p>
<h2>Round 1: Dumping ground</h2>
<p>In the first round of filtering, you throw things in the dumping ground. If it sounds cool and interesting, you throw it there. Don&#8217;t spend more than 5 seconds analyzing an article title, tweet, or intro paragraph to decide if this link should be reviewed further at a later time.</p>
<p><strong>Just dump it.</strong></p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/large/35/9b563d523945beb4a81e3da471d310/readability.jpg"><img src="http://cdn.verboselogging.com/transloadit/medium/31/e5f36bf28636795338ecae65e61c95/readability.jpg" class="fleft bbottom bright round medium" alt="" /></a></figure></p>
<p>There are three main services that can handle this job: <a href="http://www.instapaper.com/">Instapaper</a>, <a href="http://readitlaterlist.com/">Read it later</a>, and the newcomer <a href="https://www.readability.com/">Readability</a>. I&#8217;ve used all of them,  though it doesn&#8217;t really matter which one you use. I like Instapaper for the ability to have folders, though the folder editing system needs some work. Readability is super slick, though costs money (as little as $5/month), but that money goes back to the publishers you read.<sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup></p>
<p class="clear">They all have 1-click methods (typically a bookmark) to save a page for later, so it&#8217;s trivial so add things to the dumping ground. The first two also integrate with most Twitter applications, and Readability is on the way for a more complete integration.</p>
<h2>Round 2: Filtering</h2>
<p>The filtering stage is separate from the dumping ground stage. When you&#8217;re at home, digesting dinner with a nice glass of wine, you can pull out your iPad or laptop, and start filtering your dumping ground. There are typically 3 different things you can do with an article, and a fourth if you have a Kindle.</p>
<h3>Read</h3>
<p>If the article is interesting, <em>relevant</em> and short, you can probably read it right there and get the information into your brain. When I say <em>relevant</em>, I mean relevant to whatever you&#8217;re working on at work or at home. If you are working on a ruby on rails project using mongodb at work, and learning clojure at home, an article about erlang isn&#8217;t entirely relevant. If it&#8217;s at this point in the chain, it should be still be interesting to you.</p>
<p>If the article will take more than about 5 minutes to read, you can move on and shelve it.</p>
<h3>Shelve</h3>
<p>You can shelve articles that are bigger (maybe an academic paper), but you still want to actually read in the near future. This does require some discipline, in that you have to schedule time to go through your shelf and actually read things. If your dumping ground supports this (maybe you use starring for this, or a folder in the case of Instapaper) you can use it, or just use a bookmark or bookmarking service.</p>
<h3>Bookmark and archive</h3>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/large/c9/46b7649c8cacc32ff94a0443172862/pinboard.jpg"><img src="http://cdn.verboselogging.com/transloadit/medium/28/343e08171f55b66b013c765a25d93b/pinboard.jpg" class="fright bbottom bleft round medium" alt="" /></a></figure></p>
<p>With most of the things that go into the dumping ground, you can probably bookmark them. If you read or shelved it, you probably want to keep it for reference. If you didn&#8217;t read or shelve it (interesting, but not relevant), you probably want to have it for when you do start to deal with the technology or topic of discussion.</p>
<p>I find clojure and erlang interesting, so they are in my feeds. I&#8217;m not doing anything right now with the languages, so articles get quickly scanned to see if they might be useful, and then I use <a href="http://www.google.com/bookmarks">Google Bookmarks</a> to save and tag them for later.</p>
<p>I&#8217;m a big fan of Google Bookmarks since saved (starred) items show up in my searches. Say what you want about Google knowing everything about you, but this kind of thing I love. Bookmarks in my browser don&#8217;t do anything for me, since I have to make an effort to use them. Google Bookmarks integrates naturally into my everyday usage of the web. Delicious was a popular alternative, but ever since the shenanigans with Yahoo! everybody has been running away from them. I even wrote a <a href="/2010/12/16/import-delicious-to-google-bookmarks">migration tool</a>. <a href="http://pinboard.in/">Pinboard.in</a> is also quite popular and took off quite a bit when Delicious &#8220;died&#8221;, since they have a pretty solid Delicious importer.</p>
<p>If you find you end up with lots of links to PDFs, I&#8217;m a fan of <a href="https://docs.google.com/">Google Docs</a>. You can upload PDFs which can be converted into a Google Docs format if you choose, but more importantly, they can be searched (even if they are still in <span class="caps">PDF</span>). If you&#8217;re a <a href="http://www.google.com/chrome">Chrome</a> user, you can also grab the <a href="https://chrome.google.com/webstore/detail/nnbmlagghjjcbdhgmkedmbmedengocbn">Docs <span class="caps">PDF</span>/PowerPoint Viewer extension</a> which will make PDFs and other file formats open in Google Docs, allowing you to save them with 1 click.</p>
<h3>Kindle</h3>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/large/b1/443c9ebf962ae103e43574647418ca/kindlebility.jpg"><img src="http://cdn.verboselogging.com/transloadit/medium/b2/0610bd353e5761ce657c0a13b30ce9/kindlebility.jpg" class="fleft bbottom bright round medium" alt="" /></a></figure></p>
<p>If you own a <a href="http://www.amazon.com/kindle">Kindle</a>, you can sign up for my service <a href="http://kindlebility.darkhax.com/">kindlebility</a> to send articles to your Kindle, instantly. I use this for longer articles that I do want to read and are appropriate for Kindle viewing, and then I just carry my Kindle around and read at my leisure.</p>
<p>Some articles with lots of source code or important color images don&#8217;t work very well on the Kindle, and get shelved.</p>
<h2 class="clear">Wrapping it up</h2>
<p>Now you have separate processes to handle all the information you want to take in. There are tools to help figure out what you&#8217;re not getting value from, and places to easily stash things you find for later evaluation.</p>
<p>You have a straightforward method of deciding what to do with articles, whether they get read, shelved, bookmarked, or sent to your Kindle.</p>
<p>Now all you have to do is be disciplined and schedule the time to process your dumping ground, and read shelved items.</p>
<p>Pretty soon you&#8217;ll be talking about &#8220;Reading List Zero&#8221; like &#8220;Inbox Zero&#8221;.</p>
<h2>Appendix A: Books</h2>
<p>Books are another subject entirely. You can&#8217;t just read every article you find on the web and call it a day. Expand your horizons into actual books if you don&#8217;t already. The Kindle makes reading books easier than ever with instant delivery and its small form factor. We don&#8217;t even need to kill any trees!</p>
<p>I used to read a lot more actual books than I do now,<sup class="footnote" id="fnr2"><a href="#fn2">2</a></sup> but I&#8217;m trying to remedy that by simply scheduling the time. Every night, every morning, at lunch, whenever! Just pick a time, set aside an 30 minutes to an hour, and pick up a book.</p>
<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> At least that&#8217;s the plan!</p>
<p class="footnote" id="fn2"><a href="#fnr2"><sup>2</sup></a> Maybe I got sick of books from university&#8230;</p>

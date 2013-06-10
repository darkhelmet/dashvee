--- 
id: 476
author: Daniel Huckstep
title: 2 Node.js Apps That Showed Me The Light
category: programming
description: I cover 2 nodejs apps I wrote that get me excited about Javascript on the server.
published: true
publishedon: 29 Nov 2010 08:00 MST
slugs: 
- 2-node-js-apps-that-showed-me-the-light
tags: 
- nodejs
- javascript
- instapaper
- kindle
- pdf
- readability
- jsdom
- postmark
- redis
- rackspace
- mongrel2
images: 
  instapaper: 
    small: http://cdn.verboselogging.com/transloadit/small/a7/635b4171faa83a0e9bf2023b22fb74/instapaper.png
    medium: http://cdn.verboselogging.com/transloadit/medium/d2/d7e58f0d48d1e89c6a694c982a7adc/instapaper.png
    original: http://cdn.verboselogging.com/transloadit/original/f9/42c5c2a7c91f025be4ed23b81a31b0/instapaper.png
    large: http://cdn.verboselogging.com/transloadit/large/51/daa55dbffaf15e77cb6a02c64004bb/instapaper.png
---
<p>I don&#8217;t know if you know this, but <a href="http://twitter.com/#!/search/nodejs">everybody and their dog</a> is writing <a href="http://nodejs.org/">node.js</a> applications. It&#8217;s more popular than Kanye memes.</p>
<p>It&#8217;s a contagious bug, and I caught it too. I had a one specific use case that it was perfect for, since a Javascript library already existed to do it. Another idea came later, and that&#8217;s the one that started it for me.</p>
<p>So let&#8217;s get on with that.</p>
<h2><a href="https://github.com/darkhelmet/shortestpaper">shortestpaper</a></h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/f9/42c5c2a7c91f025be4ed23b81a31b0/instapaper.png"><img src="http://cdn.verboselogging.com/transloadit/medium/d2/d7e58f0d48d1e89c6a694c982a7adc/instapaper.png" class="fright bleft bbottom round medium" alt="" /></a></figure></p>
<p>This was the one I started on. The basic problem was that most times I went to read my <a href="http://www.instapaper.com/">Instapaper</a> articles, I&#8217;d have 15 minutes or so to do it. I&#8217;d want to hammer through a bunch of short ones, but I never knew which ones were the short ones.</p>
<p>Instapaper also has a &#8220;Text&#8221; feature, which works like <a href="http://lab.arc90.com/2009/03/02/readability/">Readability</a> <sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>. It strips out all the crap, and just gives you the article text, formatted nicely so you can actually read it. If I could count the number of words in the relevant element (and let&#8217;s reject words less than 3 characters), then I&#8217;d have a pretty good idea of the length of it, and if I knew the length of all them, I could sort them.</p>
<p>Proxy time!</p>
<p>The <a href="https://github.com/darkhelmet/shortestpaper">code</a> is worth a thousand words, but this is basically what happens:</p>
<ol>
	<li>Proxy all requests to www.instapaper.com</li>
	<li>If the Content-Type of the response is <span class="caps">HTML</span>, we keep it and send it to a page processing task.</li>
	<li>We also stuff in a couple script tags: one for jQuery, and one for the script from the shortestpaper application.</li>
	<li>In the page processing task, we use <a href="https://github.com/tmpvar/jsdom">jsdom</a> and jQuery to extract all the URLs, which are stuffed into a queue if nothing exists in the Redis store for that <span class="caps">URL</span>.</li>
	<li>Another process polls the queue,<sup class="footnote" id="fnr2"><a href="#fn2">2</a></sup> and requests the Instapaper text page for that <span class="caps">URL</span>.</li>
	<li>We again use jsdom and jQuery to grab the relevant element from that response, grab the innerText, split on whitespace and count the words.</li>
	<li>We store that count in Redis using the first 10 characters of the SHA1 of the <span class="caps">URL</span> as the key.</li>
</ol>
<p>Okay, so now what? Remember that script we insert to the document?</p>
<ol>
	<li>The script grabs all the URLs, calculates their SHA1, and requests some <span class="caps">JSON</span> from the server.</li>
	<li>This <span class="caps">JSON</span> is a <code>SHA1 ⇒ count</code> mapping.</li>
	<li>Sort the elements, and add the word count to the controls!</li>
</ol>
<p><strong>Now I can burn through short articles.</strong></p>
<p>I could also have done this using a Chrome extension, but developing Chrome extensions isn&#8217;t my favorite thing in the world, so I went this route. It also will work in all browsers, so that&#8217;s a big win. Future improvements are probably going to include using the Readability stuff from the next project so I&#8217;m not bound by the Instapaper rate limit.</p>
<p>If you use Instapaper, check out shortestpaper at <a href="http://shortestpaper.darkhax.com/">http://shortestpaper.darkhax.com/</a>.</p>
<h2><a href="https://github.com/darkhelmet/kindlebility">kindlebility</a></h2>
<p>kindlebility was my original use case. I wanted to be able to use Readability on the server, turn an article into a clean <span class="caps">PDF</span>, and send it to my Kindle. One click! Bookmarklet. That&#8217;s what I wanted. So I did it.</p>
<ol>
	<li>I do nothing in the request, except add a job to the queue. I used <a href="http://techno-weenie.net/2010/7/13/in-process-node-queues/">technoweenie&#8217;s chain gang</a> since it doesn&#8217;t need to be persistent.</li>
	<li>From there, the worker is a big chain of callbacks:
	<ol>
		<li>Download the page.</li>
		<li>Run <a href="https://github.com/arrix/node-readability">node-readability</a> on it.</li>
		<li>Save the <span class="caps">HTML</span> out to a file.</li>
		<li>Run <a href="http://code.google.com/p/wkhtmltopdf/">wkhtmltopdf</a> on it.</li>
		<li>Read the <span class="caps">PDF</span> in and base64 encode it.</li>
		<li>Email it to my Kindle address using <a href="http://postmarkapp.com/">Postmark</a></li>
		<li>Clean up.</li>
	</ol></li>
</ol>
<p>Ten minutes later, you&#8217;ve got the article on your Kindle, converted by Amazon to be all nice and readable. <strong>In one click.</strong></p>
<h2>Deployment</h2>
<p>Since I wanted both of these apps on port 80, and I didn&#8217;t want to run nodejs as root, so I put both apps behind <a href="http://mongrel2.org/home">Mongrel2</a> on my <a href="http://www.rackspacecloud.com/1348.html">Rackspace</a> slice.</p>
<p>The config:</p>
<script src="https://gist.github.com/717760.js?file=mongrel2.conf"></script><p>At first, shortestpaper was a bit wonky. Sometimes would be slow and sort of never finish. After talking with Zed Shaw about it, he suggested cranking up the <code>buffer_size</code> in the settings, and that did the trick. I might even crank it up some more. If you&#8217;re having problems with <code>Proxy</code> setups in Mongrel2, look at the <code>buffer_size</code>.</p>
<h2>Postmortem</h2>
<p>shortestpaper took me a few days to write, as I was just learning nodejs. Some error messages are confusing, some libraries didn&#8217;t work 100% the first time around, and I was getting use to <code>npm</code>. kindlebility took me a couple hours one day after work.</p>
<p>All in all, I&#8217;m quite impressed. nodejs seemed to like to eat the <span class="caps">CPU</span> on my slice on small spurts, and liked to eat <span class="caps">RAM</span>, though it gave it back. It&#8217;s damn fast though. Development is quick, but the error messages are sometimes frustrating. Debugging isn&#8217;t built in, but go grab <a href="https://github.com/smtlaissezfaire/ndb">ndb</a> and you can use <code>debugger;</code> in your code, and it will shell out to a debugger console. Code reloading isn&#8217;t built in either, but there are other modules that can apparently do that, and forks of nodejs with it integrated into the server.</p>
<p>These little apps, along with all the other cool nodejs stuff I&#8217;ve seen, have really convinced me. The fact that you can simulate a browser window and run Javascript designed for the client like it&#8217;s just another day of the week is pretty mind boggling, not to mention powerful. Javascript on the server is here to stay.</p>
<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> Which is what Apple used for Safari&#8217;s Reader functionality.</p>
<p class="footnote" id="fn2"><a href="#fnr2"><sup>2</sup></a> Instapaper has a rate limit, which we need to obey.</p>

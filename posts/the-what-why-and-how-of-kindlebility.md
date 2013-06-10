--- 
id: 482
author: Daniel Huckstep
title: The What, Why, and How Of Kindlebility
category: programming
description: I talk more in depth about Kindlebility.
published: true
publishedon: 20 Jan 2011 20:15 MST
slugs: 
- the-what-why-and-how-of-kindlebility
tags: 
- readability
- javascript
- jquery
- nodejs
- socketio
- postmark
- websockets
images: 
  kindlebility_step_1: 
    medium: http://cdn.verboselogging.com/transloadit/medium/f7/62f7c5df1ac5e429e57d9d5b898d40/kindlebility-step-1.jpg
    small: http://cdn.verboselogging.com/transloadit/small/ea/447389a6ea0d2586fe11fa368096e6/kindlebility-step-1.jpg
    large: http://cdn.verboselogging.com/transloadit/large/c0/ec1924dee95b7c4e599404661f66ea/kindlebility-step-1.jpg
    original: http://cdn.verboselogging.com/transloadit/original/1f/2f6810e291a2317a67bbf47b339714/kindlebility-step-1.jpg
  kindlebility_step_3: 
    medium: http://cdn.verboselogging.com/transloadit/medium/99/e851ccbabb111b3bdbba8ed4dbe16a/kindlebility-step-3.jpg
    small: http://cdn.verboselogging.com/transloadit/small/63/b1d7ad905528d630a874173a25e31e/kindlebility-step-3.jpg
    large: http://cdn.verboselogging.com/transloadit/large/f3/ad75fd336453c2a26022a95b2a35f7/kindlebility-step-3.jpg
    original: http://cdn.verboselogging.com/transloadit/original/81/486881774f4d1404efc8222d83638c/kindlebility-step-3.jpg
  kindlebility_step_2: 
    medium: http://cdn.verboselogging.com/transloadit/medium/76/db829b49c1c35762bc11adb6ce93e8/kindlebility-step-2.jpg
    small: http://cdn.verboselogging.com/transloadit/small/ee/7179c56df5d26814978f80cb104c18/kindlebility-step-2.jpg
    large: http://cdn.verboselogging.com/transloadit/large/b0/7a085deb73e1b0b00e4e9827ac9be8/kindlebility-step-2.jpg
    original: http://cdn.verboselogging.com/transloadit/original/b7/dfed1ef012083ac3016a51499148b1/kindlebility-step-2.jpg
---
<h2>Kindlebility is now <a href="http://tinderizer.com/">Tinderizer</a></h2>
<h2>TL;DR</h2>
<ul>
	<li><a href="http://kindlebility.darkhax.com/">Kindlebility</a> sends articles on the web to your Kindle.</li>
	<li>It needs your Kindle email address (@free.kindle.com addresses are fine).</li>
	<li>I don&#8217;t store your Kindle address or use it for anything else.</li>
</ul>
<ol>
	<li>Use Kindlebility to make a bookmarklet.</li>
	<li>Add <strong>kindle@darkhelmetlive.com</strong> to your <em>Kindle Approved Email List</em>.</li>
	<li>Click the bookmarklet on a page to send the article to your Kindle.</li>
</ol>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/large/c0/ec1924dee95b7c4e599404661f66ea/kindlebility-step-1.jpg"><img src="http://cdn.verboselogging.com/transloadit/small/ea/447389a6ea0d2586fe11fa368096e6/kindlebility-step-1.jpg" class="" alt="" /></a></figure> <figure><a href="http://cdn.verboselogging.com/transloadit/large/b0/7a085deb73e1b0b00e4e9827ac9be8/kindlebility-step-2.jpg"><img src="http://cdn.verboselogging.com/transloadit/small/ee/7179c56df5d26814978f80cb104c18/kindlebility-step-2.jpg" class="" alt="" /></a></figure> <figure><a href="http://cdn.verboselogging.com/transloadit/large/f3/ad75fd336453c2a26022a95b2a35f7/kindlebility-step-3.jpg"><img src="http://cdn.verboselogging.com/transloadit/small/63/b1d7ad905528d630a874173a25e31e/kindlebility-step-3.jpg" class="" alt="" /></a></figure></p>
<h2>Moving on</h2>
<p>I&#8217;ve been meaning to write some more about Kindlebility, since I&#8217;ve been making improvements to it, people are using it, and I&#8217;m getting feedback, so here it goes.</p>
<h2>What</h2>
<p><a href="http://kindlebility.darkhax.com/">Kindlebility</a> is an application I wrote after I got my Kindle. You give it your <a href="http://www.amazon.com/gp/help/customer/display.html/ref=hp_navbox_email_200375630?nodeId=200375630&amp;#email">Kindle email address</a> (free or regular), authorize the email it uses, and you get a bookmark that you can click on pretty much any page, and it will do some magic (described later) to send the page to your Kindle for easy reading.</p>
<h2>Why</h2>
<p>I was frustrated that I could send things to it to get converted and look pretty on the device, but there were always too many steps. Run this, save that, convert here, email, blah, blah, blah. I&#8217;m a programmer damnit! <strong>I can automate this.</strong></p>
<p>I put it up online because it&#8217;s not the most expensive thing in the world to run, and I figured other people would find it useful as well. You probably don&#8217;t think you need this until you use it a few times, then the value really shows.</p>
<h2>How</h2>
<p>I wanted to use the <a href="http://lab.arc90.com/experiments/readability/">Readability</a> script to grab just the relevant content and get that onto my Kindle, with one click. Since Readability is already Javascript, I figured this would be a good case for <a href="http://nodejs.org/">nodejs</a>. As it turns out, Readability was already ported to node, and I just had to integrate it. An added bonus of this, is you can sort of check to see what it&#8217;s going to produce by using the Readability script yourself.</p>
<p>I use <a href="http://code.google.com/p/wkhtmltopdf/">wkhtmltopdf</a> on the server to convert the <span class="caps">HTML</span> to a <span class="caps">PDF</span>, and then <a href="http://postmarkapp.com/">Postmark</a> to send emails.</p>
<p>To communicate with the server, I use the <a href="http://socket.io/">socket.io</a> library, since it talks to node with no problem, I get cross browser support, and it makes doing progress updates on the client side super simple.</p>
<p>I don&#8217;t need to store anything on the server side, so <strong>I don&#8217;t keep your Kindle email for anything.</strong> You can also just remove <em>kindle@darkhelmetlive.com</em> from your Kindle Approved Email List and I can&#8217;t send anything to it, so you don&#8217;t have to worry about spam.</p>
<h3>The Bookmarklet</h3>
<p>When you click the bookmarklet (if you have the latest bookmarklet), it adds a div to the page and sticks in the top left to let you know stuff is happening. Then it grabs the socket.io Javascript file if it needs it (most likely), and connects up to the server. It sends the server the <span class="caps">URL</span> and your Kindle email, and it takes it from there.</p>
<h3>The Server</h3>
<p>The server downloads the page, runs Readability on the content, and writes the new <span class="caps">HTML</span> out to a file. It kicks off a process to run wkhtmltopdf on the <span class="caps">HTML</span> file, which spits out a pretty decent looking <span class="caps">PDF</span>. It then reads that <span class="caps">PDF</span>, and POSTs it to Postmark (they have a <span class="caps">REST</span> <span class="caps">API</span> for email; awesome!) with &#8220;convert&#8221; as the subject. Amazon converts it for easier reading (allowing you to change font sizes, etc), and it gets sent to your Kindle, either over 3G or Wifi, depending on which Kindle you have and which email (free or regular) you put in the box.</p>
<h3>The Source Code</h3>
<p>If you don&#8217;t believe me on any of these points, feel free to check out the <a href="https://github.com/darkhelmet/kindlebility">source code, available on Github</a>.</p>
<h2>Fin</h2>
<p>That&#8217;s it! Go ahead and try it out. I&#8217;ll be working on it more, making further improvements, fixing bugs, and whatever else. If you have suggestions, comments, or if it&#8217;s not working quite right, please <a href="/contact">let me know</a>. If you love it so much, there&#8217;s a donate button at the bottom of the page.</p>
<p>Enjoy!</p>
<p><a href="http://kindlebility.darkhax.com/">http://kindlebility.darkhax.com/</a></p>

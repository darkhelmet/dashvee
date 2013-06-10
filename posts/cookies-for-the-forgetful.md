--- 
id: 401
author: Daniel Huckstep
title: Cookies For The Forgetful
category: software
description: I use some HTTP cookie and hostname hackery to get back into our group wiki.
published: true
publishedon: 28 Jul 2009 07:00 MDT
slugs: 
- cookies-for-the-forgetful
tags: 
- cookies
- sinatra
- password
images: 
  cookies: 
    small: http://cdn.verboselogging.com/transloadit/small/95/8f9b6e4c0d9dba53af6eaccd99d9b5/cookies.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/0e/4eb127c1dab0603253863147ffb138/cookies.jpg
    large: http://cdn.verboselogging.com/transloadit/large/0b/09faa57cbfd771a465db01e57f6d79/cookies.jpg
    original: http://cdn.verboselogging.com/transloadit/original/e6/ef157fa63ee70ce198e7312778204e/cookies.jpg
---
<p><figure><img src="http://cdn.verboselogging.com/transloadit/medium/0e/4eb127c1dab0603253863147ffb138/cookies.jpg" class="fright bleft bbottom round medium" alt="" /></figure></p>
<p>When the going gets tough, the tough mess with cookies!</p>
<p>Well sort of. I started using Chromium from the <a href="https://launchpad.net/~chromium-daily/+archive/ppa">Chromium Daily Build <span class="caps">PPA</span></a> yesterday at work. I remembered most of my passwords for things, but one eluded me.</p>
<p>The wiki.</p>
<p>The wiki system we use is <a href="http://wikkawiki.org/HomePage">WikkaWiki</a> and while it does the job, it&#8217;s not something that would be my first choice. Or second choice. Anyway.</p>
<p>The weird thing is, it does something stupid and as a result, Firefox can&#8217;t remember the password, so I couldn&#8217;t look up the password in Firefox&#8217;s little menu. We didn&#8217;t have mail setup on the wiki server (it&#8217;s a VM), so I couldn&#8217;t do the standard <em>reset my password</em> thing, and blah blah blah, pain the butt, this that and the other thing.</p>
<p>So I look at my cookies in Firefox. Hmm, they look tasty.</p>
<p>What would happen if I:</p>
<ol>
	<li>Wrote a little <a href="http://www.sinatrarb.com/">Sinatra</a> application to set the cookies to the same values as in Firefox,</li>
	<li>Set the hostname of the wiki machine to localhost in my hosts file,</li>
	<li>ssh and port forward 80 to 4567 (So I can hit the proper hostname and path but direct it to the Sinatra app on port 4567. The reason behind this is I compile ruby into my home directory, so doing this is faster than installing Sinatra and all the required gems in the system path),</li>
	<li>And finally hit the wiki path in Chrome?</li>
</ol>
<p>Would it set the cookies to the proper values, so that when I undid everything I would be logged into the wiki? <strong>You bet!</strong></p>
<p>Initially I didn&#8217;t think it would work, but in retrospect, it makes sense that it did. Still, all I have to say is <em>zomg hacks!!</em></p>

--- 
id: 434
author: Daniel Huckstep
title: Tweet Link Rollover
category: meta
description: I take links to tweets and crank them up to 11.
published: true
publishedon: 31 Dec 2009 16:46 MST
slugs: 
- tweet-link-rollover
tags: 
- skitch
- jquery
- twitter
- github
images: 
  tweet_on_blog: 
    small: http://cdn.verboselogging.com/transloadit/small/3e/640986f1ccdf1a09a8ef65be738273/tweet-on-blog.png
    medium: http://cdn.verboselogging.com/transloadit/medium/4a/4f93bec3f26f78711736d2d9c8e980/tweet-on-blog.png
    original: http://cdn.verboselogging.com/transloadit/original/f1/c694378e773712923b86258df2f9a2/tweet-on-blog.png
    large: http://cdn.verboselogging.com/transloadit/large/00/aee1c33910e24f3a4d27856feb4fd3/tweet-on-blog.png
  tweet_on_twitter: 
    small: http://cdn.verboselogging.com/transloadit/small/a2/b3b93f620a29530e1e4d84568ce045/tweet-on-twitter.png
    medium: http://cdn.verboselogging.com/transloadit/medium/90/25fa600c74c3318ec97195a0a086b6/tweet-on-twitter.png
    original: http://cdn.verboselogging.com/transloadit/original/79/3568d9252de9c52159192c0559e187/tweet-on-twitter.png
    large: http://cdn.verboselogging.com/transloadit/large/12/2c3d9663d3c9c94bfcaeb54d4baffb/tweet-on-twitter.png
---
<p>I don&#8217;t like visiting sites for something really simple. Reading a single tweet is one of them. If I link to a tweet, you shouldn&#8217;t have to go to Twitter to view it. It&#8217;s just 140 characters.</p>
<p>So what did I do? I added some codes to my blog to pull those tweets in. If I link to a tweet, I can go off to Twitter, pull in the tweet and set the <a href="http://www.w3.org/TR/html401/struct/global.html#h-7.4.3">&#8216;title&#8217; attribute on the anchor tag</a> so when you hover over the link, it shows the tweet text. Yay!</p>
<p>From this:</p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/79/3568d9252de9c52159192c0559e187/tweet-on-twitter.png"><img src="http://cdn.verboselogging.com/transloadit/medium/90/25fa600c74c3318ec97195a0a086b6/tweet-on-twitter.png" class=" medium" alt="" /></a></figure></p>
<p>&#8230;to this:</p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/f1/c694378e773712923b86258df2f9a2/tweet-on-blog.png"><img src="http://cdn.verboselogging.com/transloadit/medium/4a/4f93bec3f26f78711736d2d9c8e980/tweet-on-blog.png" class=" medium" alt="" /></a></figure></p>
<p>Better? I think so. Code <a href="http://github.com/darkhelmet/darkblog/commit/98d7029fd0744300c47f2483b792bff8d7d74736">here</a>.</p>
<p><a href="http://twitter.com/darkhelmetlive/status/7216865563">Here&#8217;s a live example.</a></p>
<p>&lt;speech type=&#8216;Oscar&#8217;&gt; I&#8217;d like to thank jQuery, Twitter, Heroku, Ruby, and everybody that worked with me on this project!!&lt;/speech&gt;</p>

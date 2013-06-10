--- 
id: 457
author: Daniel Huckstep
title: Obligatory iPhone SDK EULA Change Post
category: editorial
description: Everybody else is writing about the iPhone SDK EULA change, so why not me too?
published: true
publishedon: 12 Apr 2010 08:00 MDT
slugs: 
- obligatory-iphone-sdk-eula-change-post
tags: 
- iphone
- sdk
- adobe
- monotouch
- john-gruber
images: 
  palpatine: 
    small: http://cdn.verboselogging.com/transloadit/small/26/a73a3b75ccd9afb74d97c76f7873d9/palpatine.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/da/723d36203a34c8a0e309c24ccf2e1c/palpatine.jpg
    original: http://cdn.verboselogging.com/transloadit/original/78/87d1a0d27667c7cd6ac600dff99b45/palpatine.jpg
    large: http://cdn.verboselogging.com/transloadit/large/8c/6e22d21dca11bb8e1642fa04f77c7c/palpatine.jpg
---
<p>If you don&#8217;t already know what this is going to be about, just skip it. If you haven&#8217;t already become aware of what&#8217;s happening, be thankful, and move on. If you <em>really</em> want to know, Google around for <a href="http://lmgtfy.com/?q=iphone+sdk+3.3.1">iphone sdk 3.3.1</a> and you can read up on the details.</p>
<p>I&#8217;m writing this article as:</p>
<ul>
	<li>A software engineer (<a href="http://www.apegga.org/Applicants/Engineers/mit.html"><span class="caps">EIT</span></a>)</li>
	<li>An iPhone user</li>
	<li>Someone who originally wanted to develop for the iPhone, but now (even before these changes) lost interest</li>
</ul>
<h2>Basics</h2>
<p><strong>Before</strong></p>
<blockquote>
<p>3.3.1 — Applications may only use Documented APIs in the manner prescribed by Apple and must not use or call any private APIs.</p>
</blockquote>
<p><strong>After</strong></p>
<blockquote>
<p>3.3.1 — Applications may only use Documented APIs in the manner prescribed by Apple and must not use or call any private APIs. Applications must be originally written in Objective-C, C, C++, or JavaScript as executed by the iPhone OS WebKit engine, and only code written in C, C++, and Objective-C may compile and directly link against the Documented APIs (e.g., Applications that link to Documented APIs through an intermediary translation or compatibility layer or tool are prohibited).</p>
</blockquote>
<h2>The engineer</h2>
<p><figure><img src="http://cdn.verboselogging.com/transloadit/medium/da/723d36203a34c8a0e309c24ccf2e1c/palpatine.jpg" class="fright bleft bbottom round medium" alt="" /></figure></p>
<p>When it comes down to it, it&#8217;s Apple&#8217;s platform, and they can do whatever they want with it. Making a change like this wasn&#8217;t just the legal department making a few random tweaks; they really thought about this. It affects the number and quality of applications that get submitted, the number of developers working on iPhone applications, all the other companies producing middleman software to write iPhone applications, and as Emperor Palpatine says, &#8220;a great many things.&#8221;</p>
<p>On the other hand, I hate being told what technology I have to use to accomplish a goal. If I want to write a program to do something for myself, I can write it in whatever I&#8217;m feeling like that day, and it makes me happy. Now I&#8217;m being told that if I want to write an iPhone application for other people to use, I <strong>must</strong> use Objective-C? Lame. Have you looked at Objective-C lately? It&#8217;s disgusting.</p>
<p>And I&#8217;ve written Motorola 68K assembly.</p>
<p>From the new wording, I gather that you could write it in C, which I probably would. It&#8217;s not like you get the benefits of garbage collection on the iPhone anyway, though by using C you could probably use a garbage collection library.</p>
<p>It comes down to being an annoyance and time consuming more than anything. If you want to develop on the iPhone, you&#8217;re using an <em>approved</em> language. If you want to go multi-platform, you&#8217;re writing two completely separate applications. This should result in better applications, which I&#8217;ll talk about later.</p>
<p>If you&#8217;ve already invested a lot of time in your MonoTouch application (which doesn&#8217;t suffer from the multi-platform problem, since MonoTouch is exclusively for iPhone development) or any other platform that gets kaboshed by this change, then I guess it&#8217;s time to learn Objective-C.</p>
<p>Overall, I&#8217;m not a fan of the change. When it&#8217;s all said an done, Evelyn Beatrice Hall said it best:</p>
<blockquote>
<p>I disapprove of what you say, but I will defend to the death your right to say it.</p>
</blockquote>
<h2>The iPhone user</h2>
<p>Unless you&#8217;ve been waiting on an application that will now not come to fruition because it&#8217;s being written in MonoTouch, you probably don&#8217;t have any reason to worry, or even care. If anything, applications might end up being of better quality.</p>
<h2>The developer who doesn&#8217;t care anymore</h2>
<p>At first, I thought I&#8217;d get a phone I could love to use and develop for. Then I got it, got all the stuff, started to look at tutorials, and started to read about Objective-C. Fuck that noise. I disliked Objective-C the moment I looked at it.</p>
<p>Then I found these other things like <a href="http://www.appcelerator.com/">Titanium from appcelerator</a>, <a href="http://monotouch.net/">MonoTouch</a> and a few others that would allow me to develop for the iPhone without touching Objective-C. Yay! I started to play with that, but lost interest. It&#8217;s another huge platform to learn regardless of which language you are developing in, and I&#8217;ve got shit to do thank you very much.</p>
<p>At first I had a purpose. I had a specific app I want to write, but after a little searching, I found one in the App Store that did what I needed. And all for the low low price of free. Why waste my time if somebody has already built something to do what I want?</p>
<h2>The multi-platform-apps-result-in-lower-quality argument</h2>
<p>This argument is completely valid. If you write an application using a multi-platform framework (like Qt, Java, or whatever), it just won&#8217;t work as well or look as good as if you wrote separate application for each platform. Simple as that. You can frequently tell as soon as you use the application (much more prominent with desktop applications).</p>
<p>Your appcelerator application might work pretty good, but it&#8217;s not going to wow anybody on either platform (Android or iPhone). The native applications are traditionally always better than the multi-platform.</p>
<h2>Adobe/MonoTouch/appcelerator/etc</h2>
<p><a href="http://www.urbandictionary.com/define.php?term=fml"><span class="caps">FML</span></a></p>
<h2>The lock-in advantage</h2>
<p>John Gruber covers this, so read <a href="http://daringfireball.net/2010/04/why_apple_changed_section_331">his post</a>.</p>
<h2>The omg-we-hav-2-lern-C-and-memory-management argument</h2>
<p>We&#8217;ll talk about that later.</p>

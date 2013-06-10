--- 
id: 444
author: Daniel Huckstep
title: Mac OS X Server Is Just Awful
category: editorial
description: I love my MacBook, but OS X Server is pretty much the worst thing ever.
published: true
publishedon: 10 Feb 2010 08:00 MST
slugs: 
- mac-os-x-server-is-just-awful
tags: 
- mac-osx-server
- squirrel-mail
images: 
  mail: 
    original: http://cdn.verboselogging.com/transloadit/original/8b/689df762b65c2accc19627cb2ef53c/mail.png
    large: http://cdn.verboselogging.com/transloadit/large/6e/a6f59ad92bbc487a1a11e0ac38f017/mail.png
    small: http://cdn.verboselogging.com/transloadit/small/fe/a7334c92f43a24844cd3d56c492eff/mail.png
    medium: http://cdn.verboselogging.com/transloadit/medium/ce/641039ee123df8df653e7ffafadbf3/mail.png
  saving_event: 
    original: http://cdn.verboselogging.com/transloadit/original/98/1cb80ffd715e1b6de2eed5507b7103/saving-event.png
    large: http://cdn.verboselogging.com/transloadit/large/0d/87c111f76e68b91de267638274741a/saving-event.png
    small: http://cdn.verboselogging.com/transloadit/small/5b/5fbcd66f96acc9d6a940e55f413c93/saving-event.png
    medium: http://cdn.verboselogging.com/transloadit/medium/15/d4f787e6da105d216b35975c748de0/saving-event.png
  stupid_calendar_ajax: 
    original: http://cdn.verboselogging.com/transloadit/original/5d/a45f51d45799760c4badff90fe7e6a/stupid-calendar-ajax.png
    large: http://cdn.verboselogging.com/transloadit/large/bf/8b3b91407d628345d7a05b21f7f6ca/stupid-calendar-ajax.png
    small: http://cdn.verboselogging.com/transloadit/small/49/20f18accf5dc880c8ca67f90b3cb0b/stupid-calendar-ajax.png
    medium: http://cdn.verboselogging.com/transloadit/medium/80/c70872e896e551c19971718eaf94da/stupid-calendar-ajax.png
---
<p>I am in the unfortunate position where I have to use Mac OS X Server on a regular basis. Hey, at least it&#8217;s not <a href="http://stackoverflow.com/questions/238177/worst-ui-youve-ever-used/238191#238191">Lotus Notes</a>.</p>
<p>Since it fills me with so much rage, let&#8217;s just get right into it.</p>
<h2>Everything is shiny except mail</h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/8b/689df762b65c2accc19627cb2ef53c/mail.png"><img src="http://cdn.verboselogging.com/transloadit/medium/ce/641039ee123df8df653e7ffafadbf3/mail.png" class="fright bbottom bleft round medium" alt="" /></a></figure></p>
<p>When you first hit the login page, it looks good. The blogs and wikis look good. The calendar looks good. The mail interface is, comparatively, bloody terrible. They wrote their own stuff for everything except mail, where they just slapped on Squirrel mail. Really? It reminds me of this quote from the movie <em>Hotshots!</em>:</p>
<blockquote>
<p>Many of you are wondering what&#8217;s wrong with my pants, well they started running short on materials right before they got to the knees so don&#8217;t give me any shit.</p>
</blockquote>
<p>It&#8217;s like they just ran out of time and said &#8220;Fuck it! Just use Squirrel mail!&#8221;</p>
<p>For me this isn&#8217;t a big deal since I can feed stuff through the Gmail interface anyway, but <em>at least</em> I can do that.</p>
<h2>iCal blocks the UI when doing simple things</h2>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/5d/a45f51d45799760c4badff90fe7e6a/stupid-calendar-ajax.png"><img src="http://cdn.verboselogging.com/transloadit/small/49/20f18accf5dc880c8ca67f90b3cb0b/stupid-calendar-ajax.png" class="fright bbottom bleft round" alt="" /></a></figure></p>
<p><figure><a href="http://cdn.verboselogging.com/transloadit/original/98/1cb80ffd715e1b6de2eed5507b7103/saving-event.png"><img src="http://cdn.verboselogging.com/transloadit/small/5b/5fbcd66f96acc9d6a940e55f413c93/saving-event.png" class="fright bbottom bleft round" alt="" /></a></figure></p>
<p>Pretty much everything you do while viewing a calendar that results in a post back to the server blocks the UI. Oh it&#8217;s <span class="caps">AJAX</span>; it doesn&#8217;t do a full post and have to render the page again. It just blocks your screen. A spinner comes up, the screen does that lightbox thing, and fucking blocks. Have 5 meeting invites you have to accept? Have fun clicking accept, waiting 5 seconds for the server to respond, then clicking accept on the next one, waiting 5 seconds, and so on. <span class="caps">AJAX</span> my ass.</p>
<h2>iCal can&#8217;t talk to Google Calendar</h2>
<p>Not much to say about this. From Google Calendar:</p>
<blockquote>
<p>If you know the address to a calendar (in iCal format), you can type in the address here.</p>
</blockquote>
<p>I&#8217;m using iCal; it&#8217;s in <span class="caps">URL</span>. Where&#8217;s the <span class="caps">URL</span> I have to give to Google? I found (not easily mind you) two URLs that could possibly work, but they don&#8217;t. They just don&#8217;t, since they&#8217;re not iCal, but CalDav. If you know of a way to get this to talk to Google Calendar, please tell me.</p>
<h2>Inviting people to events is painful</h2>
<p>Depending on how you invite people, they may or may not know about it. If you use the calendar interface, it just shows up in their calendar, and they have to accept it. There is no email notification, but presumably if you use iCal on the desktop, you&#8217;d get an iCal notification or something informing you of the meeting.</p>
<p>All in all, like the title says, it&#8217;s just painful. Painful to use, painful to look at, and painful to think about. It hurt writing this post, just a little bit. I&#8217;m going to tend to my wounds.</p>

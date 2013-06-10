--- 
id: 412
author: Daniel Huckstep
title: Web Syntax Highlighters
category: software
description: I compare syntax highlighters for bloggers that show code.
published: true
publishedon: 23 Sep 2009 08:00 MDT
slugs: 
- web-syntax-highlighters
tags: 
- syntax-hightlight
- web
- blog
---
Anybody who blogs about programming related topics needs to post code at
times.

When I was on Wordpress, I used the
[WP-CodeBox](http://wordpress.org/extend/plugins/wp-codebox/) plugin. It
worked quite well, but it was server side. This is fine if you intend to
stay with your software forever, but when I moved off Wordpress to my
custom solution, it became a problem.

## [syntaxhighlighter](http://code.google.com/p/syntaxhighlighter/)

syntaxhighlighter is a fairly popular solution, and for good reason. It
is entirely javascript based so there is no reliance on anything on the
server. Your code is in your post (or whatever) and the javascript takes
care of business.

Some downsides include the fact that you have to include the brushes.
They are separate, so you can include selectively, or just include all
of them. Also, as the docs say, you should replace the '<' character
with the HTML equivalent '<'

## [Pastie.org](http://pastie.org/)

Pastie is quite popular among the irc folks. You paste some stuff, and
it takes care of storing it, and highlighting everything for you. You
then just put the embed code in your blog, and away it goes.

The downside for something like this, is that if Pastie is down, your
blog hangs while it's trying to load the script. On top of that, your
code isn't in the post. It won't show up in RSS feeds (probably,
depending on how awesome your reader is), and therefore won't be seen by
search engines (good or bad, whatever).

## [gist](http://gist.github.com/)

I moved everything from WP-CodeBox to GitHub's gist. I have faith that
GitHub isn't going anywhere anytime soon, and despite some minor issues
as of late (which will hopefully be remedied by the move off Engine
Yard), the scripts load reliably and quick. As an added bonus, gists's
are all backed by git, so you can check them out and edit in your own
text editor, fork them, and comment on the progress as you change them.
Awesome.

The downsides are the same as Pastie.

What is everyone else using?

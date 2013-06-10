--- 
id: 459
author: Daniel Huckstep
title: Getting Rid Of Transactions For The Poor Man
category: programming
description: Remove transactions from Ruby on Rails' ActiveRecord framework
published: true
publishedon: 20 Apr 2010 17:41 MDT
slugs: 
- getting-rid-of-transactions-for-the-poor-man
tags: 
- activerecord
- ruby
- rails
- mysql
---
A quick post for today.

Want to get rid of transactions from ActiveRecord for something? Here's
a cheap way to do it.

<script type='text/javascript' src="http://gist.github.com/373215.js?file=no_transactions.rb"></script>

It only works for MySQL obviously, but you can roll your own if you are
on postgres. I'll make it a bit less crappy and make it a gem or
something.

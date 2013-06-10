--- 
id: 371
author: Daniel Huckstep
title: Using Ruby's Eval To Make Cucumber Bigger And Greener
category: programming
description: Some interesting use of eval to help write cucumber stories.
published: true
publishedon: 29 May 2009 16:42 MDT
slugs: 
- using-ruby-s-eval-to-make-cucumber-bigger-and-greener
tags: 
- ruby
- testing
- cucumber
---
In case you just crawled out from under your rock just to read my blog,
and haven't the foggiest, [cucumber](http://cukes.info) is a ruby
acceptance testing framework, and works great with rails.

I was writing features for admin users in this application, and needed a
step like this:

    Then I should be editing "test@example.com"

Where the quoted email is the login. Later on (in fact right after…I was
testing edit functionality, and after safe you end up on the view user
page), I had:

    Then I should be viewing "test@example.com"

So I had two steps:

<script type="text/javascript" src="http://gist.github.com/177757.js?file=cucumber-no-eval.rb"></script>

That's all good and fun, except they are virtually the same. Ruby has a
great feature (like some other languages) call `eval`. You can pass it
some ruby code, and it runs it in the current binding (or scope,
context, whatever you want to call it. Ruby calls it `binding`). While
using eval is sort of like goto, in that sometimes it can be dangerous,
test code isn't exactly customer facing, so we can assume that test code
is safe to do bad things. You wouldn't want to blindly eval user input
for example.

In this case however, I could make things better:

<script type="text/javascript" src="http://gist.github.com/177757.js?file=cucumber-eval.rb"></script>

So I have the step which is good for editing or viewing, checks the
method, and makes the function name based on which method
(`edit_user_path` or `user_path`), then eval that, getting the user by
login. The login object is local to the block and the eval just sucks it
in, since the binding ends up being the same. In short: it just works.

Behold the power of ruby!

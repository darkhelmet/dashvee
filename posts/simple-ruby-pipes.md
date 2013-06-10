--- 
id: 486
author: Daniel Huckstep
title: Simple Ruby Pipes
category: programming
description: Bash like pipes in ruby with some simple metaprogramming.
published: true
publishedon: 06 May 2011 08:00 MDT
slugs: 
- simple-ruby-pipes
tags: 
- ruby
- metaprogramming
- bash
---
Here's something I cooked up this evening. Nothing too epic, but it's a
neat illustration of metaprogramming with ruby.

<script src="https://gist.github.com/958433.js?file=pipes.rb"></script>

Ruby allows you to reopen classes and add methods to them. You can also
make a `Module` and `include` that in a class to add methods. I've added
four methods to the `Symbol` class and overridden one method in the
`Array` class (using `alias` to keep the old method around since `super`
doesn't quite work).

Now we can pipe arrays like bash using a simple syntax! Wee!

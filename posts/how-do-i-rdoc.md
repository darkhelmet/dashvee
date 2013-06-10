--- 
author: Daniel Huckstep
title: How Do I RDoc? Documenting Ruby
category: programming
description: How you can improve the Ruby Standard Library documentation.
published: true
publishedon: 05 Apr 2013 10:00 MDT
slugs: 
    - how-do-i-rdoc
tags: 
    - ruby
    - documentation
    - open-source
---
Yesterday I [did a talk](https://speakerdeck.com/darkhelmetlive/ruby-batteries-included) at Mountain West Ruby Conf 2013 all about the Ruby Standard Library.

The basic premise is you should be looking to the standard library first, before running to RubyGems.org and GitHub for new code. **If all you need is a hammer, you don't need to buy the hardware store.**

## Where are the docs?

The problem is that sometimes, the standard library doesn't have the documentation you might want. Maybe it's not that great of an example, maybe it's missing completely. Maybe it's almost perfect, but just needs that one last sentence to button it up.

## How do I Ruby?

The solution is you. Ruby is open source, and they love getting pull requests for documentation updates.

How do you add docs to Ruby? Let's see...

## Get yours and I'll get mine!

First, go to [the GitHub repo](https://github.com/ruby/ruby) and fork it for yourself. Clone the repo to your local machine.

## If it ain't broke...

In your new ruby directory, run `autoconf` to generate the `configure` script, then run `./configure`. Now run `make rdoc-coverage`. This will tell you how much documentation coverage ruby has. It will also give you a list of things that don't have documentation (just scroll up). Find something that needs docs, and go to town!

If it actually doesn't need documentation (methods that start with `_` for example probably don't need rdoc documentation), you can comment with `:nodoc:`.

Big ups to Ryan Davis for help with these steps!

## See your progress

If you want to see what your docs will look like online, that's pretty easy too. Run `rdoc path/to/file.{rb,c} -o html -O` and you'll get an `html` directory with stuff. Open up `html/index.html` in your browser, and you can see how things look.

If you are working on a big file, you can run `rdoc -C path/to/file.{rb,c}` to get a coverage report for the individual file, to see what you need to work on next.

## Push it real good

Once you've got some documentation written, commit your changes to a branch. Push that branch up to GitHub and make a pull request.

**BOOM.**

## Fin

Every little bit of documentation helps folks. If you are using something, and you're learning about it, put that knowledge into documentation if those docs are lacking. You're helping everybody.

--- 
id: 432
author: Daniel Huckstep
title: My Ruby Style
category: programming
description: My ruby programming style, as inspired by Thoughtbot's Ruby Community Survey.
published: true
publishedon: 18 Dec 2009 08:00 MST
slugs: 
- my-ruby-style
tags: 
- ruby
- style
- thoughtbot
---
The folks at Thoughtbot have a [Ruby community
survey](http://robots.thoughtbot.com/post/276620679/ruby-community-survey)
online, and you should all go take it. Well, as long as you are a ruby
developer. Otherwise it doesn't really matter.

Anyway, I wanted to throw out what I do for ruby style (and general
programming style in some cases).

-   I hate the 80 character limit. Get a real monitor would you please?
-   I don't align assignment operators.
-   I don't indent private/protected keywords.
-   I keep the code after private/protected indented the same as the
    rest.
-   I don't add blank lines after method/class definitions.
-   I use parentheses on method definitions when the method takes
    arguments, otherwise, no dice!
-   I only use parens when calling a method which I need to pass
    arguments to.
-   I prefer `class << self` over `def self.name`.
-   I use single quotes unless I need to interpolate. Interpolation is
    [faster](http://www.igvita.com/2008/07/08/6-optimization-tips-for-ruby-mri/)
    anyway.
-   I use bang methods (methods ending with a !) to denote methods that
    throw exceptions (instead of returning nil), or methods that alter
    the data structure (instead of returning a new instance).
-   I don't use exceptions for program flow (well maybe in a one off
    script hack).
-   I love inline rescue.
-   I use both global rescue and explicit rescue, depending on the
    situation.
-   I don't enforce LOC count on methods, but I keep them short enough
    to be manageable.
-   I don't use the `return` keyword unless I need it. It's faster, but
    I can't find the benchmark.
-   I love `.each` and use enumeration operators whenever possible.
-   I use self only when I need it.
-   I love metaprogramming, but I try to not overdo it.
-   I love `method_missing`, but again, try to not overdo it.
-   I like `map` over `collect` because I feel `collect` just makes no
    sense.
-   I prefer `object.nil?` when it clarifies meaning, but embrace the
    implicit cast.
-   I use the singular (or a really short name) for the argument to an
    `each` block.
-   I like the `#try` syntax.
-   I like NULL in the database for strings, but not other things.
-   I usually write a down method for migrations, unless it just doesn't
    make sense.
-   I raise an `IrreversibleMigration` exception if the migration calls
    for it.
-   I try to remember to index foreign key columns, but it usually comes
    down to doing it if there is a performance problem.
-   I use Haml, since I hate writing HTML, and ERB might as well be
    HTML. Haml forces me into it's indentation format, which I like.
-   I typically generate HTML in the views, but where appropriate use
    helper methods.
-   I don't vender gems, unless I need to change code in the gem.
-   I put global partials in a 'shared' folder.
-   I use the RESTful names, but add others when needed.
-   I use `:except` in `routes.rb` to prevent mapping of routes I don't
    want.
-   If code isn't in a library designed to be used by other developers,
    I usually don't document it. If it's complicated enough that you
    can't understand what's going on by reading the code, then it either
    needs to be reworked, or some minor commenting needs to be done if
    it can't be simplified.
-   I commit style changes to source control.

Well, that's me. Here's a bit of an example:

<script type="text/javascript" src="http://gist.github.com/259248.js?file=style.rb"></script>

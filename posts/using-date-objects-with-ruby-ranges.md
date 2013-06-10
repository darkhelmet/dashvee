--- 
id: 436
author: Daniel Huckstep
title: Using Date Objects With Ruby Ranges
category: programming
description: I simplify some code utilizing ruby's Range and Date classes.
published: true
publishedon: 09 Jan 2010 14:00 MST
slugs: 
- using-date-objects-with-ruby-ranges
tags: 
- ruby
- date
---
I used to have some *really* ugly code to generate the archive links you
see on the right column of this blog. It was terrible. Granted it was
some of the first code I wrote on this blog, and I was cruising through
it because I just wanted to get it done and working, but still, it's not
really a valid excuse. [It can be seen
here.](http://github.com/darkhelmet/darkblog/commit/f2eb11f9a07355a1de9e28ad8a1e4618445f75be)

I had a thought the other day that it would be much better handled by
the [Range](http://ruby-doc.org/core/classes/Range.html) class, and
boy was I right, although it involved a tweak.

The `Range` class allows to request values from some value to another
value (inclusive or exclusive) using this syntax:

    1..10

See the little dots in the middle? That would return me a `Range` with
the numbers 1 up to 10 (inclusive). If I use 3 dots like this:

    1...10

I would get 1 up to 9, or 1 to 10 exclusive.

Inclusive and exclusive in this case refer to the last value in the
`Range`.

How does `Range` get the values to put in there? The `#succ` method!

The successor is the thing that follows something, so the successor of 1
is 2 (in the Integer space anyway), and `Range` uses this to generate
the list of items.

You can leverage this too, since `#succ` is just another method.

I created an `ArchiveDate` class which inherits from `Date` and defined
`#succ` to be:

    self + 1.month

I require active_support for the `#month` method. So now, if I do
something like this:

    ArchiveDate.new(2009,4,1)..ArchiveDate.new(2010,1,1)

I'll get a list of `ArchiveDate` objects, which are by extension `Date`
objects, each one representing the first of the month. So I get April,
May, June, etc. Then I can loop through them and print out the required
archive links in my sidebar. Much better than the old code!

The commit where I changed this over is
[here](http://github.com/darkhelmet/darkblog/commit/f2eb11f9a07355a1de9e28ad8a1e4618445f75be)
so feel free to check it out, and make fun of it, or suggest even better
ways to do it.

--- 
id: 479
author: Daniel Huckstep
title: Most Dangerous Programming Errors, 5-1
category: programming
description: I finally wrap up the Top 25 Most Dangerous Programming Errors with number 5-1.
published: false
publishedon: 03 Jan 2011 08:00 MST
slugs: 
- most-dangerous-programming-errors-5-1
tags: 
- authorization
---
Since it's thoroughly into the new year, I guess I should get off my ass
and wrap up the [Top 25 Most Dangerous Software
Errors.](http://cwe.mitre.org/top25/index.html)

## [5. Improper Access Control [Authorization]](http://cwe.mitre.org/data/definitions/285.html)

This is about *authorization* as opposed to *authentication*.
Authorization is about "can this user access this resource or do this
action".

Oh sure, you locked down your app with totally sweet authentication, no
clear text passwords for you! But then you completely overlook whether
or not the user can do what they want to do. The most common instance of
this in a rails application looks something like this:

<script src="https://gist.github.com/763206.js?file=authenticated_resources_controller.rb"></script>

This was actually one of the big problems in the
[diaspora](https://github.com/diaspora/diaspora) codebase when they
first opened it up. You probably only generate links to the resources
that the user owns, but if they throw some *curl-fu* your way, they can
delete anything they want, even if they don't own it.

### Ways around it

You don't want to fall into the mindset that users can only access the
URLs you generate and display to them.[^1]

In the simple example, you should probably be doing something like:

    current_user.resources.find(params[:id])

Or using some sort of authorization framework. In rails land there are
1001 different frameworks, with a few main ones taking the stage
regularly.

To be nice and safe (and this applies to authentication too), use a
whitelist instead of a blacklist. In other words, deny access to
everything by default, and open up access in small doses as required.

## [4. Cross-Site Request Forgery [CSRF]](http://cwe.mitre.org/data/definitions/352.html)

Cross site requests are nasty. This is the sort of thing that lets
attackers just make any old request to your application using Javascript
or curl (or anything that can make an HTTP request), and as long as they
have some working authenticated cookie, they can do whatever they want.

### Ways around it

If you're using a web framework, it probably has this built in. In
rails, you just need to add `before_filter :verify_authenticity_token`
in `application_controller.rb`. If you are doing AJAX stuff, you'll need
some extra magic, but a little Google action can fix that.

The basic premise is you generate a fresh random token for each full
`GET` request (per user), stuff that in generated forms, and when you
`POST` back to the server, the token gets sent back and checked.

It's not the hardest thing in the world, but I wouldn't call it trivial
either. If something is provided by your framework, use it. If you
aren't using a framework, or it doesn't have anything built in, go read
some more extensive material on the subject to make sure you get the
implementation correct.

## [3. Buffer Copy without Checking Size of Input [Classic Buffer Overflow]](http://cwe.mitre.org/data/definitions/120.html)

The buffer overflow is a classic. Essentially, when you try to put more
data into a block than the block can hold, it *overflows*. It's just
like filling up a glass of water; if you put too much in it, it
*overflows*.

The CWE has a pretty straight forward example:

<script src="https://gist.github.com/763206.js?file=overflow.c"></script>

If you enter more than 20 characters, it will put the first 20 in
`char last_name[]`, but where do the remaining characters go? We know
where they go; they end up past the end of the array. The problem is
that memory doesn't belong to the array `last_name`. Who it belongs to
can be somewhat of a mystery. Is it program data (code), or is it
another variable? Regardless, writing data to this memory willy nilly is
**not** cool.

Buffer overflows can be exploited if the memory layout is just right,
and the data that gets written to the random memory is just right. It
can lead to terrible things, like attackers getting root access to the
target system, among other things.

[Intel has some examples](http://software.intel.com/en-us/articles/collection-of-examples-of-64-bit-errors-in-real-programs/)
pertaining mainly to 64-bit systems, but they are good examples of
things that work *by accident* in 32-bit land, but turn into buffer
overflows in 64-bit land.

### Ways around it

Buffer overflows can be avoided, though some aren't as obvious as
others. There are a few things you can force yourself to do in order to
avoid the majority of buffer overflows.

#### Use safe functions

Using the *safe* versions of most functions can get you out of a lot of
trouble. Instead of `strcpy`, use `strncpy`. The latter accepts a length
parameter and only looks that far. If you use the unsafe version, it
looks for a `NULL` terminator. If the `NULL` terminator isn't there
(sneaky hackers!), then it will probably run off the end of the string
into bogus memory land.

### Stack poisoning

`-fstack-protector` in gcc

### Address space layout randomization

[http://en.wikipedia.org/wiki/ASLR](http://en.wikipedia.org/wiki/ASLR)

## [2. Improper Neutralization of Special Elements used in an SQL Command [SQL Injection]](http://cwe.mitre.org/data/definitions/89.html)

### Ways around it

## [1. Improper Neutralization of Input During Web Page Generation [Cross-site Scripting]](http://cwe.mitre.org/data/definitions/79.html)

### Ways around it

[^1]: [CWE-425: Direct Request ("Forced
    Browsing")](http://cwe.mitre.org/data/definitions/425.html)

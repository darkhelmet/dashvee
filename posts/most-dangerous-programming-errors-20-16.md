--- 
id: 461
author: Daniel Huckstep
title: Most Dangerous Programming Errors, 20-16
category: programming
description: I talk about 20-16 of the the Top 25 Most Dangerous Programming Errors.
published: true
publishedon: 11 May 2010 08:00 MDT
slugs: 
- most-dangerous-programming-errors-20-16
tags: 
- dns
- crypto
- security
- c
---
I continue the look at 5 more of the [Top 25 Most Dangerous Programming
Errors](http://cwe.mitre.org/top25/index.html). [Here's part 1
(25-21)](/2010/05/03/most-dangerous-programming-errors-25-21)

## [20. Download of Code Without Integrity Check](http://cwe.mitre.org/data/definitions/494.html)

You might not think of this at first, but it's a doozy. If you are
downloading things, like files, code, updates, whatever, they could be
compromised. DNS poisoning or redirects could make your request for a
file go to a different location. There could be a [man in the
middle](http://en.wikipedia.org/wiki/Man-in-the-middle_attack) messing
with your data, or the download could just be corrupt.

Regardless, if anything happens along the way, it could wreak havoc on
your running application.

### Ways around it

The obvious way around this is checking the integrity of downloaded
packages with a SHA1 or other secure hash algorithm. The non-obvious
extra protection is doing proper DNS checks (forward *and* reverse) on
your network requests (as per the CWE prevention techniques). A third
way (again, by the CWE), is to actually encrypt (using an encryption
algorithm like AES) your downloaded content.

Doing all three is not that much work when you think about it. Checking
a hash is an extra method call and an extra `if` statement to confirm
the hash. Doing the DNS lookups is a small method. Doing the full
decryption isn't that bad either, as most encryption algorithms have
nice APIs for whatever language you are working in.

The point is: don't just download stuff and execute it. It's not cool.

## [19. Missing Authentication for Critical Function](http://cwe.mitre.org/data/definitions/306.html)

This one is a little more tricky. You can't just add some code in a few
spots to make this happen. All of the CWE recommendations are
architecture related, in that you have to think about them before you go
and write a bunch of code.

### Ways around it

The latter two points the CWE makes regarding mitigation are more
obvious.

1.  Duplicate client side security checks on the sever side. Duh. Don't
    ever rely on just client side authentication. If you authenticate
    solely on the client side, it's sending a message to the server at
    some point saying that everything is all good. If the client has
    full control over this message, an attacker pretty much owns your
    system. Have fun with that.
2.  Avoid custom authentication systems. If you are using a framework
    that provides authentication, use it. If you can't, but the
    operating system provides features you can leverage, use them.

The first point they make is a little more interesting, and harder to
implement. If you have a C library, for example, and you only expose so
much in your header file, it doesn't really matter. There are ways to
see what functions are defined and you can create your own header file
to expose *those* functions to your program. If they don't require
authentication…

Same thing with web applications. Assume you have your authentication
page A, and a secure page B. If you can navigate to page B manually, and
it assumes you came from A so you *must* be authenticated, then your
application needs work.

## [18. Incorrect Calculation of Buffer Size](http://cwe.mitre.org/data/definitions/131.html)

This error occurs in languages where you need to explicitly allocate a
certain amount of memory. C, C++, Java, C# all require you, in certain
cases, to make a decision about how much memory to allocate. Ruby
arrays, as an example, can expand dynamically, as well as some types in
C# and Java. Know your datatypes!

If you allocate a certain amount of memory, but then try to read more
data into that block of memory than it can hold, ~~hilarity~~ chaos
ensues.

Bad:

<script type="text/javascript" src="http://gist.github.com/395758.js?file=buffer_size.c"></script>

The `gets` function just reads stuff into a buffer up to the newline
character. What if I feed in a TON of data? FAIL!

### Ways around it

All except one of the CWE recommendations for mitigating this error are
in the implementation area (meaning, in the code you write).

When it comes down to it, there are a few things you need to do:

1.  Validate your input.
2.  Think about your input.
3.  Use safe functions.

If you are accepting a integer as input, and you expect it to be within
a certain range, check that it is.

From the CWE example, if you are working with data you are HTML
escaping, remember that things like `&` get converted to `&amp;`, so
your output buffer needs to be much larger than your input buffer.

Use safe methods that accept sizes for inputs, like `fgets`.

Good:

<script type="text/javascript" src="http://gist.github.com/395758.js?file=better_buffer_size.c"></script>

Some other things they recommend are just good practice, like examining
compiler warnings. If your compiler is spitting out warnings about
casting and other things, you should probably give it a look see. I
prefer it when my code compiles cleanly, and cleanly is defined as
*without warning*.

## [17. Integer Overflow or Wraparound](http://cwe.mitre.org/data/definitions/190.html)

Oh integer overflow. We all know this one. You add a couple of numbers
and get a horrible negative number. This is usually more of a problem in
the C family of languages, but can occur in something like Java too.
Just because Java is this magical compiled bytecode garbage collecting
language doesn't make it immune to integer overflow. Ruby, on the other
hand, seamlessly switches between *normal* integers and *big decimals*.
Ruby has native support for arbitrarily large numbers, so you don't have
to worry about it.

### Ways around it

First steps, think about your datatypes and check your inputs. Don't
accept inputs you know will cause overflows. If you have to be able to
accept those inputs, use large types (long, or long long, instead of
int, for example). You can double your range if you don't have to worry
about negatives either; use the unsigned varieties.

The CWE also points out libraries such as SafeInt and IntegerLib for
dealing with large values in a safe manner. Sometimes using a library
like these is a safe an effective way out of the problem.

If you have some fancy compiler, or are working in a language that can
naturally do this, ensure bounds checking warnings are enabled.

## [16. Information Exposure Through an Error Message](http://cwe.mitre.org/data/definitions/209.html)

This is pretty straightforward. You shouldn't blindly throw error
messages up on the screen. If something is going on the screen, you
should think about it, and putting every random exception message up
there isn't going to help anybody. It might even hurt.

Maybe your database user and password are in that message (for some
stupid reason). Then what?

Exactly.

### Ways around it

The simplest way would be to type check errors passed to your error
display code (you have a method for displaying errors to the user
right?). What I mean by that is only accept exceptions of the type
`UserSafeException`, or something like that. Then, in the rest of your
code, you can catch an exception (database error, what have you), and
wrap up a new `UserSafeException` with a nice friendly message for the
user. You can go one step further and predefine error messages the user
should be able to see, and ensure your `UserSafeException` can only
accept those.

These techniques ensure with a number of safegaurds that no user should
ever see any gross error messages meant for the eyes of a programmer.

This is really caused by programmers being lazy, so just don't be lazy!

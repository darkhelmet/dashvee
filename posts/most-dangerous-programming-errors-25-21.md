--- 
id: 460
author: Daniel Huckstep
title: Most Dangerous Programming Errors, 25-21
category: programming
description: I talk about 25-21 of the the Top 25 Most Dangerous Programming Errors.
published: true
publishedon: 03 May 2010 08:00 MDT
slugs: 
- most-dangerous-programming-errors-25-21
tags: 
- compare-and-swap
- race-condition
- security
- ruby
- permissions
- crypto
---
The [Common Weakness Enumeration](http://cwe.mitre.org/) posted their
[Top 25 Most Dangerous Programming Errors](http://cwe.mitre.org/top25/)
last month. Most everything in the list is completely avoidable, but
most new programmers, and especially those without *real world*
experience (as opposed to trivial classroom projects), fall victim to at
least some of them. A lot of them bit me in university and I still get
nipped by some of them today.

Proper education is the first step, and the CWE have done a good job of
describing their top 25, along with code samples of what not to do. I'd
like to cover them here, not only for myself (since by explaining you
understand more fully), but for new programmers as well.

When it comes to learning about safe and secure software, the sooner the
better. CWE shows examples of breaking code, and they have mitigation
techniques, but I couldn't find code examples of how to fix the problem,
so I'll try to include some of those.

**Disclaimer:** I don't pretend to be a security expert. If you are
working on a banking or other similar system, don't take my word! In
fact, take all of this with a grain of salt, and think for yourself
before blindly implementing things I think are pretty good. The code
shown might not work exactly, and probably doesn't do much other error
checking. Treat it like pseudo-code, and please don't copy and paste too
much.

## [25. Race condition](http://cwe.mitre.org/data/definitions/362.html)

In its simplest form, a race condition occurs when two or more processes
try to use a single resource. Two users try to save a wiki page at the
same time, as an example. The example shown is a bank transaction: read
balance, check that the balance minus the withdrawal amount is greater
than or equal to zero, and if it is, allow the transaction, and update
the balance.

<script type="text/javascript" src="http://gist.github.com/387484.js?file=balance_update.rb"></script>

So what if you have $1000, and you want to withdraw $900? What if at
the exact same time, in another process, you try to withdraw $10. You
get the balance ($1000) and in both cases the withdrawal is allowed,
but what if the balance gets updated twice: once to $100 and once to
$990. You now have $910 in your hand, and you bank balance says $990.
Woohoo!

### Ways around it

#### Datastore operations

This is clearly a problem. To deal with things like this, locking and
atomic operations are probably needed. If your datastore supports it,
using the atomic operations it provides would most likely be best.
[MongoDB supports a few atomic
operations](http://www.mongodb.org/display/DOCS/Atomic+Operations) and
most relational database systems provide functionality to handle these
types of situations.

#### Other locking techniques

If you absolutely must handle the logic in your application and not the
datastore, use atomic operations provided by your environment. Locking a
file on a Linux system (presumably any of the \*NIX systems) is an
atomic operation, and will block, or possibly fail. This style of
locking could be used to ensure only one process is using the account at
any given time. If you are working in one process with threads, using
atomic update operations like
[compare-and-swap](http://en.wikipedia.org/wiki/Compare-and-swap) and
other threadsafe atomic operations is the way to go.

The ruby example, fixed up:

<script type="text/javascript" src="http://gist.github.com/387484.js?file=better_balance_update.rb"></script>

## [24. Use of a Broken or Risky Cryptographic Algorithm](http://cwe.mitre.org/data/definitions/327.html)

It should be pretty obvious what the problems are here. If the algorithm
sucks, then it's easy to break, then all your data is out.

### Ways around it

#### Don't write your own cryptography algorithm. Ever.

You're probably not smart enough. If you are, why are you reading my
blog? Shouldn't you be hanging out with [Bruce
Schneier](http://www.schneier.com/)? Mathematicians spend years building
an algorithm, then more years trying to break it. AES went through 5
years of evaluation along with others before the [National Institute of
Standards and
Technology](http://en.wikipedia.org/wiki/National_Institute_of_Standards_and_Technology)
approved it. You think you can do better? Probably not.

Don't worry though, it's nothing to be ashamed of. Writing cryptography
algorithms is hard. Leave it up to those smart math folks, and we can
get on with our day writing the next big Facebook.

#### Don't use broken algorithms

Some algorithms are broken. If you are picking one to use, go find out
what's good, and what's broken. MD5 (a hash function) is basically
broken, so maybe you should use SHA1, or more preferably SHA256 or
SHA512 instead if you need a hash function. Don't use DES as it's
basically broken too. Right now, AES is the way to go.

#### Don't hope for security by obscurity

This goes back to the first point, but if you run your data through a
couple XOR and SHIFT operations and think it's secure just because your
potential attackers don't know what algorithm you used, think again.
Your potential attackers are also probably smarter than you and will eat
your application for breakfast, and crap out your supposedly secure
data. AES is awesome because the the algorithm is out in the open and
they still can't break it. That's the best kind of security.

## [23. URL Redirection to Untrusted Site ('Open Redirect')](http://cwe.mitre.org/data/definitions/601.html)

This is blindly redirecting people to a site not your own. The CWE PHP
example is pretty straightforward:

<script type="text/javascript" src="http://gist.github.com/387484.js?file=bad_redirect.php"></script>

The problems here are more for your users than anything. If you blindly
redirect them to sites and you don't really control where they are
going, that's kind of a dick move, honestly. An exception (sort of) is a
URL shortening site, like bit.ly, which is the whole point of the site.

### Ways around it

The first two CWE mitigations are pretty solid, and I don't have much to
add, so I'll summarize:

1.  Use a whitelist, input validation or spam checking service to reject
    bad inputs (URLs).
2.  Use a disclaimer page with a long timeout before redirecting,
    showing the destination URL, or force the user to manually click the
    URL.

The latter two are a bit more specific, so you can read up on those on
their site if you want.

#### [22. Allocation of Resources Without Limits or Throttling](http://cwe.mitre.org/data/definitions/770.html)

This one can be fun. Blindly forking (or creating threads) without any
concept of how many times you've forked (or how many threads are out
there). Stuff like that. Another example given is check that a length is
greater than zero…but that's it. What if the length is `INT_MAX`? Are
you going to `malloc` that shit?

### Ways around it

#### Have limits. Obey them.

If you can only handle 500 connections, make sure your app doesn't deal
with more than that. If you are working with threads, use a thread pool
to cap the max number of threads. Have a memory pool that you can reuse
instead of blindly allocating memory every time.

Bad:

    if (length > 0) { … }

Good:

    if (length > 0 && length < MAX_LENGTH) { … }

Bad:

<script type="text/javascript" src="http://gist.github.com/387484.js?file=bad_threads.rb"></script>

Good:

<script type="text/javascript" src="http://gist.github.com/387484.js?file=good_threads.rb"></script>

## [21. Incorrect Permission Assignment for Critical Resources](http://cwe.mitre.org/data/definitions/732.html)

This problem is more towards the system admin side of things, but your
software can do some things to help. If you app server is running as
root, it can pretty much do anything. If your apache config is setup
such that your .htaccess files can be served, they anybody can read
them.

### Ways around it

The first point the CWE makes regarding implementation is a good idea,
but not something a lot of software does, as far as I know. Wordpress
warns you (if I remember right) if your config file has weird
permissions.

If you are reading a config file, it probably shouldn't be writable by
everybody. Maybe you should check that, and raise an error if it is.

Stay tuned for errors 20-16!
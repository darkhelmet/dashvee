--- 
id: 463
author: Daniel Huckstep
title: Most Dangerous Programming Errors, 15-11
category: programming
description: I talk about 15-11 of the the Top 25 Most Dangerous Programming Errors.
published: true
publishedon: 31 May 2010 08:00 MDT
slugs: 
- most-dangerous-programming-errors-15-11
tags: 
- php
- ruby
- java
- dep
- aslr
- python
images: 
  spaghetti_os: 
    large: http://cdn.verboselogging.com/transloadit/large/6f/91ad08124eb58ce9dfdb08792cf782/spaghetti-os.jpg
    small: http://cdn.verboselogging.com/transloadit/small/9c/c8b6fe7527d60caccfcaf5de36035b/spaghetti-os.jpg
    original: http://cdn.verboselogging.com/transloadit/original/2b/7309d6abf824d82045acc0a2c0c6ee/spaghetti-os.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/ce/a09988eb66dfcb1dd268a1584f6efc/spaghetti-os.jpg
---
It's been a while, but I've been busy pwning n00bs at Modern Warfare 2 and Bad Company 2, and [buying a car](http://blog.darkhelmetlive.com/new-car-153), so life has been pretty busy as of late.

Have no fear though! I continue the look at the [Top 25 Most Dangerous Programming Errors](http://cwe.mitre.org/top25/index.html) with numbers 15 to 11.

## [15. Improper Check for Unusual or Exceptional Conditions](http://cwe.mitre.org/data/definitions/754.html)

> When you ASSUME things, you make an ASS out of U and ME.

This is all about assumptions. You assume something will work, you assume permissions will be set correctly, you assume there is a network connection.

In some cases, fine, make the assumptions and move on, but for the most part, you need to think these things through. Hackers like to abuse assumptions, and it can end badly.

The example they give is using `fgets` to read something, and then using `strcpy`.

<script type='text/javascript' src='http://gist.github.com/418817.js?file=strcopy_fail.c'></script>

Mad props on using `fgets` with the limit so you don't overrun your buffer, but if an error occurs, the resultant string in `buf` might *not* be null terminated, in which case `strcpy` could run off the edge and explode. `strncpy` is better, and it should not be assumed that `fgets` will work flawlessly.

### Ways around it

Don't make assumptions.

Don't assume that because you're making a system call to something that *couldn't possibly fail* you don't have to check errors. There is always (okay, usually) something in the docs about what happens if somethings fails, so use that information and catch the case. File, console and network IO, file operations, and memory allocation can all fail, and while chances are they'll work, there are those few times they don't, and then your server gets owned!

## [14. Improper Validation of Array Index](http://cwe.mitre.org/data/definitions/129.html)

> There are only two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors.

While not the original quote, it's pretty funny and illustrates the point. Improperly indexing arrays *can* cause havoc. I say can because you might inadvertently access memory you're not supposed to, or you may access completely valid data, but not what you were expecting (depending on how the stack/heap is organized, compiler optimizations, kernel settings, and many other things).

We've all done this one. Using `<=` versus `<` can make all the difference. Blindly accepting user input as an array index can also lead to problems.

In some languages, like ruby, it might not be that big of a deal. If you index an array with an index value that is out of bounds, it just returns `nil`, so as long as you deal with that as a return value, you're probably good.

Essentially, this error can lead to the standard [buffer overflow](http://en.wikipedia.org/wiki/Buffer_overflow), which can lead to an attacker executing their own code, and doing all sorts of nasty things. Try to keep your arrays in check.

### Ways around it

Ways around this error are definitely language dependent. In Java, depending on what data structure you are working with, a `ArrayOutOfBoundsException`, `IndexOutOfBoundsException`, or other exception *may* be raised, which you could catch and deal with. Ruby simply returns `nil`, somebody you can also deal with gracefully. Lower level languages like C *may* continue to work fine, but may also explode and die in a (sometimes literal) fire.

In those scenarios, you'll want to validate your input before indexing the array in the first place, and dealing with incorrect input appropriately.

This problem is really solved by the practice of sanitizing your inputs. Doing that will reduce your Tylenol bill.

## [13. Improper Control of Filename for Include/Require Statement in PHP Program ('PHP File Inclusion')](http://cwe.mitre.org/data/definitions/98.html)

As the title says, this is specific to PHP.

Okay so that's not entirely true. While the actual weakness on the CWE site is specific to PHP, you can have the same problem with ruby, or really any other language that allows dynamic code loading.

If you are using user input to load files, and by that I mean using the input directly in a `require` or `include` statement, an attacker can pretty much do whatever they want.

### Ways around it

Don't do it? That seems like a pretty solid way around it.

Other ways are to at least validate the input. If you are expecting the value to be a theme name, check that the theme exists in the proper directory. This gets around directory traversal problems.

Specific to PHP, in your `php.ini` file, you can set `allow_url_fopen` to `false` to prevent remote files from being included. In ruby, remote files aren't a problem since `require` and `load` only deal with files on disk.

## [12. Buffer Access with Incorrect Length Value](http://cwe.mitre.org/data/definitions/805.html)

<img src="{{.spaghetti_os.small}}" class="fright bleft bbottom round" />

Uh oh! Another buffer overflow problem. These are so common, and potentially so dangerous, but they don't get the respect they deserve.

Anyway. This type of buffer overflow problem comes from using incorrect values and making assumptions. It's always those stupid assumptions that get you! I'm going to use their example:

<div class='clear'></div>

<script type='text/javascript' src='http://gist.github.com/418817.js?file=bad_length.c'></script>

Only 64 bytes for a hostname? That's not that much when it comes down to it, and if you do end up with a hostname longer than 63 characters (that last one is for the null terminator), the `strcpy` is going to end badly.

### Ways around it

In this specific example, you should be using the safe variation, `strncpy`:

    strncpy(hostname, hp->h_name, 63); /* Leave 1 byte for null terminator */

In this case, the `hostname` might not contain the correct (entire) hostname, but at least nothing explodes.

If you are using a language without such strict memory allocation requirements, you probably don't have to worry about this kind of stuff.

I also like the CWE potential mitigations under the 'Operation' heading: ensuring [Data Execution Prevention](http://en.wikipedia.org/wiki/Data_execution_prevention) and [address space layout randomization](http://en.wikipedia.org/wiki/ASLR) are enabled if available. As they point out, they aren't complete catch all solutions, though they do make it much harder for attackers to do anything, so even if there is a buffer access problem, it will hopefully just crash the application, and not pose a huge security hole. *Hopefully*.

## [11. Use of Hard-coded Credentials](http://cwe.mitre.org/data/definitions/798.html)

I've done this. Granted, only for one-off scripts, but it's not good. If you write code like this:

    MyDatabase.connect('localhost', 'theuser', 'thepassword');

You're doing it wrong. If you're writing code like this:

    RemoteService.getData('remoteuser', 'remotepassword');

You're doing it wrong.

Connecting to your main application datastore, or another remote service with hardcoded credentials is just bad. You can dump the strings of a binary file, or decompile a Java class to get the strings in it. Ruby? Well it's just plain text. Python? Plain text. Compiled python files (.pyc)? You could probably dump strings from those, and you can decompile them as well.

Basically, putting usernames and passwords in your source code is just bad. As soon as you do, they end up in version control, and they they are hanging out in your version control history forever. Not cool.

### Ways around it

Don't do it. Simple. Use a config file if you need passwords for anything.

If you are accepting passwords (like a web application), you'll want to store a salted and hashed version of the passwords your users feed you. Storing passwords in cleartext in the database is for suckers.
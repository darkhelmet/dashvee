--- 
id: 468
author: Daniel Huckstep
title: Most Dangerous Programming Errors, 10-6
category: programming
description: I talk about 10-6 of the the Top 25 Most Dangerous Programming Errors.
published: true
publishedon: 20 Aug 2010 08:00 MDT
slugs: 
- most-dangerous-programming-errors-10-6
tags: 
- plaintext
- ssl
- exec
- ruby
- perl
- sql-injection
- command-line
- shell-injection
- php
- paperclip
- rails
- apparmor
- selinux
- chroot
---
It's been a while, but we're continuing the [Top 25 Most Dangerous
Software Errors](http://cwe.mitre.org/top25/index.html) with numbers
10-6.

## [10. Missing Encryption of Sensitive Data](http://cwe.mitre.org/data/definitions/311.html)

Have you ever signed up for some website or service, only to receive an
email 30 seconds later WITH YOUR PASSWORD IN IT! Doesn't it just fucking
kill you?

Have you ever used a 'Forgot your password' page only to be blindly
given your password? Fantastic. I highly doubt they are doing any
encryption with your 'secret' question and answer.

These are serious problems that are all over the place. Storing
passwords in plaintext (in the database and in cookies), connecting to
services requiring authentication over non-secure transport layers
(would you want to crank up an EC2 instance with their API if they
didn't have SSL?), and sending encryption keys that are supposed to be
secret over insecure mediums in plaintext are some of the problems seen,
and are completely avoidable. [^1]

### Ways around it

#### Don't write your own encryption algorithm.

You can't. The people that write encryption algorithms are smarter than
you. They spend years working on them, then other people spend years
trying to find flaws, and you think you can bang out something quick and
easy over the weekend? Have fun with that. Just use whatever is best out
there at the time, and move on.

##### Use one-way salted hashes for passwords.

Don't store things like that in the database please. Storing passwords
in plaintext is an amateur move, and it's not worth it.

##### Think!

When you are moving credentials around, or dealing with sensitive
information, think about it first. Think about how you would feel if
this information about you was flying around the tubes in plaintext.

## [9. Improper Neutralization of Special Elements used in an OS Command - OS Command Injection](http://cwe.mitre.org/data/definitions/78.html)

This one is pretty straightforward. It's basically blindly using input
of questionable validity in system commands. It's like SQL injection
(which we'll cover in the next article) for system commands.

Imagine you let users download things they have uploaded in a compressed
archive, and that you let them specify a compression option:

<script src="http://gist.github.com/518206.js?file=archive.rb"></script>

Have when some script kiddie passes something like this as the
`compression_level` parameter:

<script src="http://gist.github.com/518206.js?file=pain.rb"></script>

And now a your files are gone. Sweet.

### Ways around it

#### Don't trust use input

This should be a no brainer. Don't ever trust for a second that your
users are giving you correct information. In the above example, we
expected a number from 1 to 9.

Check.

That.

Shit.

If you expect something, check and confirm it. Make sure to also check
the *entire* input, in other words, don't check that it matches a regex,
check that then entire input (using `^` and `$`) matches the regex.

Or something along those lines, but don't just blindly take whatever
they give you and use it in potentially unsafe situations.

#### Use safe OS calls

The example above is ruby, and there is a better way to use `system`.

<script src="http://gist.github.com/518206.js?file=better_archive.rb"></script>

Okay that's maybe not 100% going to work with `7za`, but close enough.
With ruby's `system` command, you can pass multiple parameters. The
first is the actual command to run, and the rest are the parameters to
it. The nice thing about this is those parameters get properly dealt
with, in that when somebody tries to wipe your filesystem, they fail,
because the arguments are properly passed without shell expansion. If
you just pass one big string, it's basically the same as you pasting
that string into your terminal window and hitting Enter.

#### Use features built in to the language

Perl and ruby both have a `-T` flag for doing tainting checks. If you
bring values in from external sources, they will be *tainted* and it
prevents you from doing certain things with them, like running commands.
This isn't a one stop shop for all your OS command injection needs, but
it sure can help.

## [8. Unrestricted Upload of File with Dangerous Type](http://cwe.mitre.org/data/definitions/434.html)

The main issue with this, as outlined by CWE, is when you allow users to
upload files which are placed in public locations such that the web
browser can serve them without any help from your application.

If you have a PHP application, and you allow users to upload profile
images which end up in the public directory, and somebody uploads a PHP
file, what's going to happen to it? Sure the image manipulation might
fail, but will the original (the PHP script) still be in the public
folder? Does your web server allow execution of PHP files in the public
directory? Think about it.

### Ways around it

You can't really do much on the client side, since you can use curl, or
disable javascript, or edit the HTML to get around anything you put in
place. You have to go to the server side code to do it.

You'll want to confirm that whatever gets uploaded is, in fact, an
image. You can do this with mime type checking or even the `file`
command. Running `file` on an image I get:

    public/images/cancel.png: PNG image, 24 x 24, 16-bit/color RGBA, non-interlaced

I know it's an image.

If you are using ruby and [paperclip](http://github.com/thoughtbot/paperclip) for your attached files, it has the `validates_attachment_content_type` class method which allows you to specify mime types that are allowed. These are checked before a record is saved and the record is rejected if the mime types doesn't match anything you allowed.

Moral of the story: don't trust your users. Most will be fine, but
there's always the few that try to screw with the system.

## [7. Improper Limitation of a Pathname to a Restricted Directory - Path Traversal](http://cwe.mitre.org/data/definitions/22.html)

Oh path traversal, my old nemesis.

Okay not really, it just felt right to say. Anyway, path traversal is
basically the problem of taking user input, and using it in a path to a
file on the filesystem.

While I can't imagine why anybody would do this, the CWE example is
pretty solid.

<script src="http://gist.github.com/518206.js?file=show_info.pl"></script>

If you store user information in a file, and then use the username to
blindly read the file, you've got a problem. As they point out, if the
username used (maybe it's from a query parameter) includes the magic
`..`, the file your application reads could be something bizarre, like,
say the system `passwd` file.

The reason this happens is that the `..` means *parent* in directory
terms. If you are looking in `/app/foo/users` for a user named
`../../../etc/passwd`, and you join these two paths, you get
`/app/foo/users/../../../etc/passwd`. Open up your IRB prompt and drop
that into `File.expand_path`, and you get `/etc/passwd`.

Awesome. If that perl program was your app, as the CWE points out, it
would print out the contents of the `passwd` file.

The other example given is not so obvious: blindly accepting variables
that users shouldn't have access to.

Using a configuration variable without checking its validity, even
though you, as the application owner, control the configuration file and
hence its values, is just as bad. The server could have compromised and
the file changed to contain malicious values. How do you know?

### Ways around it

#### Canonical paths and validation

When getting around this problem, your best friends are the equivalent
of ruby's `File.expand_path`, and validation.

In ruby, `File.expand_path` takes a path with relative bits and other
things in it, and spits out the canonical path. Now you've got something
that you can validate. Always feed your path through something like
this. The CWE gives you some examples:

-   `realpath()` in C
-   `getCanonicalPath()` in Java
-   `GetFullPath()` in ASP.NET
-   `realpath()` or abs path() in Perl
-   `realpath()` in PHP

#### Jail

Do not pass Go, do not collect $200.

Okay not quite, but you can run application servers in a `chroot` or
jail, to make it seem like, to the application, they're the only thing
there. They can't stomp random files, because as far as they're
concerned, there are no other files; only the ones in the jail!

There's AppArmor, SELinux, and other things. I've never used any of
them, so you're on your own.

## [6. Reliance on Untrusted Inputs in a Security Decision](http://cwe.mitre.org/data/definitions/807.html)

For this one, we're just going to talk about the session cookie, since
it's in the big one.

In the case of Rails, it marshals and Base64 encodes a ruby hash and
stores that in the cookie. Imagine if that's where it stopped. A user
could copy the cookie, open up `irb` and convert the cookie back into an
actual hash, and then examine and change data. Serialize it again and
set the cookie in the browser, and it's now sent back to the server on
the next request.

If you have some data in the cookie like `admin => true`, a hacker could
alter the value and all of a sudden have admin access.

### Ways around it

The way Rails gets around this is pretty simple. When you make your
application, you need a big random session secret (check
`config/initializers/session_store.rb`). The cookie data is then
serialized, the session secret is used as a salt, and a hash of the
secret and cookie data is concatenated with the *actual* cookie data,
and that is used as the cookie.

You can still look at the cookie, but you can't tamper with it. You can
still put the cookie into `irb` and look at everything, but if you
change anything, you won't be able to calculate the proper hash to use
in the cookie. When the server gets the cookie on then next request, it
calculates the hash again, sees that it's wrong, and rejects the cookie.

You still don't want to put sensitive information in the cookie, since
it's completely visible, but at least people can't tamper with the data
now, and that's what you want.

As always, refer to the individual pages for more info and other
mitigation techniques.

[^1]: Check the "Observed Examples" section of the [weakness
    page](http://cwe.mitre.org/data/definitions/311.html) for a good
    list of these and other problems.

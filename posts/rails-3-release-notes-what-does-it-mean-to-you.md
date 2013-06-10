--- 
id: 443
author: Daniel Huckstep
title: "Rails 3 Release Notes: What Does It Mean To You?"
category: software
description: I lay the Rails 3 release notes on the table like Batman lays out criminals. Easily.
published: true
publishedon: 06 Feb 2010 08:00 MST
slugs: 
- rails-3-release-notes-what-does-it-mean-to-you
tags: 
- ruby
- rails
- activerecord
- bundler
---
The Rails 3 Beta got dropped a few days ago, and the release notes for
Rails were put out [a bit before
that](http://guides.rails.info/3_0_release_notes.html).

The list of changes is long; this is a big release. There's a lot to
sift through, a lot to change to upgrade your existing application, and
a lot to learn whether you are upgrading or starting a new app.

The big question is: WTF does all this mean to me?

Don't worry, I'm going to tell you. If you want to read the full release
notes, go for it, and I recommend you do, but I'm just going to cover
the stuff (in the same order that it's in the release notes) that has
the bigger impact on you, the developer.

## No config.gem, only ~~Zool~~ bundler

[Bundler](http://github.com/carlhuda/bundler) has been going for a while
now, and they [just released
0.9](http://yehudakatz.com/2010/02/01/bundler-0-9-heading-toward-1-0/)
(and 0.9.2 shortly after). Bundler is a generic ruby gem dependency
system. Note I said *ruby* and not *rails*. It works on any ruby
application; I'm using in on this blog (which is sinatra based).

Basically, you have to put all the config.gem stuff from your
environment.rb file into a Gemfile in the root of your app. For my blog
(which isn't rails, remember), it looks like this:

<script type="text/javascript" src="http://gist.github.com/296564.js?file=gistfile1.rb"></script>

Not a big deal, and don't worry, you'll like the system more anyway.
Like I said, it's a *ruby* system, not rails, so it's the same wherever
you go.

Oh, and there's [a plugin](http://github.com/rails/rails_upgrade) to do
the work converting to the new syntax for you. Aren't you glad you work
with ruby?

WTF does it mean? Less rails-specific system, better dependency
resolution, and better vendoring of gems.

## New routing syntax

The new syntax for routes basically makes the routes file look nicer. It
makes a bit more sense, and you feel that warm fuzzy feeling when you
write it.

<script type="text/javascript" src="http://gist.github.com/296564.js?file=gistfile2.rb"></script>

Now, normally you'd probably have more routes, but as an example, those
two routes handle creating a blog post. Doesn't the new way look much
better. You like that, don't you?

You can do other fancy things, like easily map other rack applications
to routes. [Check out all the new
hotness](http://yehudakatz.com/2009/12/26/the-rails-3-router-rack-it-up/).

WTF does it mean? Prettier, more readable code, which means we all win.

## Action ~~Jackson~~ View

Action View now has Unobtrusive Javascript Support and
[DHH](http://twitter.com/dhh) [tells
why](http://twitter.com/dhh/status/8391549740). Oh, and it's awesome. It
means you don't need a hack to use jQuery instead of prototype; it just
works. It also means that your HTML isn't filled with
`onclick="omg('hax');"` stuff. Everything is nice, and *unobtrusive*. It
uses HTML5 goodness to accomplish things, and we all love HTML5. Well,
except for, you know, Adobe.

## ActiveRecord Query Interface

This is the fun one. [Pratik Naik has the
goods](http://m.onkey.org/2010/1/22/active-record-query-interface) on
this one. Read it, trust me.

All this new query stuff looks scary at first, but the good stuff is
packed into [arel](http://github.com/nkallen/arel). Arel is a
[relational algebra](http://en.wikipedia.org/wiki/Relational_algebra)
(get it? arel? Bazinga!) and it treats database queries the way they
should be treated, not like a drunken hobo that stumbled into your web
application. Using arel results in a much better and cleaner way to
generate SQL (or even No-SQL queries), optimize them, chain them, and
then spit them out to a string to be sent to the database. Previous to
arel, ActiveRecord was, as far as I know, a really complicated and
specific string builder. It had power, now it has finesse.

WTF does this mean? Your queries, when you write them, should look
better and make more sense. Queries should be able to be optimized
better, lazily executed, and therefore your queries might end up faster,
and your app should be faster too.

And it's so very sexy.

## ActionMailer Awesomeness

ActionMailer performs like a controller now. There is a good write up
[over
here](http://lindsaar.net/2010/1/26/new-actionmailer-api-in-rails-3)
that explains most of the good stuff.

They are in a nice location, namely 'app/mailers'.

They return nice `Mail::Message` objects.

What more can you want?

WTF does it mean? You'll be happier writing mailers, it'll make more
sense, and the world will rejoice.

## What else?

Most everything else is pretty awesome, but doesn't overly affect your
day to day work when writing your rails app. ActiveRecord is cleaned up
so you can add validations and callbacks to any ruby class.
ActiveSupport is cleaned up so you can require something, and it pulls
in its dependencies, versus having to explicitly require it yourself.
ActionController is split up so you can make your own lean controller to
handle actions that need to be fast.

Like I said, go read the full release notes. They cover all the new
changes, and will hopefully prepare you for some awesomeness. Make sure
to read the articles I linked to as well, since they have excellent
information regarding the new stuff.

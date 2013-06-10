--- 
id: 516
author: Daniel Huckstep
title: "rc Files and You: Automating Your Project"
category: programming
description: I encourage you to setup an rc file in your project, and for extra points, use sub
published: true
publishedon: 06 Nov 2012 10:00 MST
slugs: 
- rc-files-and-you-automating-your-project
tags: 
- configuration
- 37signals
- bash
- ruby
- python
- pascal
- haskell
---
I gave a lightning talk at [RubyConf 2012 in Denver](http://rubyconf.org/).

**Man was I nervous.**

Apparently I did an okay job though, and I'd like to thank all the people who were and took time out of their day to listen to me. Thanks! If you want to view the original talk, the [video is here](http://www.justin.tv/confreaks/b/337863983). Scroll to 10:15 to find me, but I recommend watching them all.

A few people had more questions (I talked really fast since it was a lightning talk after all) and this was originally going to be a blog post in the first place, so here it is, in blog form.

## Your app is not one language.

It's not just ruby/python/java/go/pascal/ada/whatever. It really isn't.

You at least have bash, or whatever shell you use, and it gives you a bunch of tools.

Bash for example has functions, loops and conditionals, so you're well on your way to programming yourself out of a paper bag.

Another trick with bash (and most other shells) is that you can *source* files to load things into the current process. You do this everytime you start a shell actually. A `.profile` or `.bashrc` probably loads up a bunch of stuff. I have a whole mess of stuff in my *dotfiles*.

What I like to do is dump a bunch of project specific things into a file in the root project directory named `rc`. This way, I can `cd` into the directory and then type `. rc` and bash will load up all that stuff, kind of setting me up to work on the project.

## My rc File For ForrestFire (source for [Tinderizer.com](https://Tinderizer.com))

I built [Tinderizer.com](https://Tinderizer.com) and the source repo is called ForrestFire. I have this little blob in its `rc` file. I set a `GOPATH` variable, grab some configuration values from Heroku where the site is hosted, and have a function to tell the server to reload the bookmarklet when I change it.

<script src="https://gist.github.com/4021205.js?file=ForrestFire.sh"></script>

I can load it up like this:

<script src="https://gist.github.com/4021205.js?file=source.txt"></script>

Now I can run `watch` and it will run `puncher` with the appropriate arguments. I can also access the 3 environment variables in my application.

## My rc File For darkblog2 (source for the admin to this blog)

<script src="https://gist.github.com/4021205.js?file=blog.sh"></script>

I run postgres and memcached, so I have functions to start and stop both of those. I also need to load postgres dumps into my local database, so I automate that with another function. I also alias `rake` because nobody likes typing `bundle exec rake`.

## The rc File For [Yardstick Measure](http://getyardstick.com)

We also use an `rc` file at work, but it's much shorter, yet more powerful.

    alias rake='bundle exec rake'
    eval "$(./sub/bin/ys init -)"

That's weird...what's that `eval "$(./sub/bin/ys init -)"` nonsense?

After sourcing that file, I get the `ys` command. When I type that without any arguments, it spits out this:

<script src="https://gist.github.com/4021205.js?file=ys.txt"></script>

We use [sub](https://github.com/37signals/sub) from the fine folks at 37Signals to do this. Once you setup your `sub`, you dump appropriately named scripts in its `libexec` directory, and you get access to those commands as `subcommands` of the main command. `rbenv` uses `sub` if you're familiar with that.

In our setup, the `sub` is named `ys`, and we have the `bugs` command which opens up our bug tracking software from the command line. I can type `ys bugs` and FogBugz opens in my browser.

## sub is awesome

This isn't a full look at `sub`, but the **docs are great.** Give them a good read if you decide to play with it.

## sub basics

<pre>
git clone git://github.com/37signals/sub.git [name of your sub]
cd [name of your sub]
./prepare.sh [name of your sub]
</pre>

In my example above from Yardstick, I would have typed `./prepare.sh ys`

## Then...

* Remove the `.git` directory.
* Start writing your commands in `<where sub is>/libexec/<name of sub>-<command name>`
* Add the eval/init stuff to your `rc` file.

## DROP THE BASS!!!

[Skrillex - Cinema](http://www.youtube.com/watch?v=k6lVhGeyXuw&t=1m18s)

<pre>
Brrrrrrrrrrr........
Wob..Wob..Wob.......
Pfffffffthhhhhhhhhh
Grrrrrrrrr........
Pfffffffffthhhhhhhh..
Wob....Wob...Wob...
Pfffthhh....Brrrrrrrr.
</pre>

## What Else?

It supports... 

* Autocompletion: Add a magic comment and a hook to tell it what to autocomplete.
* Documentation: Add magic comments at the top of the file for docs when running your `sub` command without any args or when using the builtin `help` command.

## But wait, there's more!

You don't *have* to use bash. You can write scripts in ruby, python, haskell, whatever! Just dump it in the `libexec` directoy, name it appropriately, and include the proper hashbang to run the script and you're set.

I think you can use compiled binaries too, but I'm not sure how the documentation and autocompletion would work in that case.

## What now?

Don't do anything more than once by hand what a computer can do for you. 

Automate all the things. You don't have any excuses anymore.

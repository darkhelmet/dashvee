--- 
author: Daniel Huckstep
title: Basecamp Next Todo Migrator
category: programming
description: Basecamp Personal came out, and there's no easy way to migrate todos. Until now.
published: true
publishedon: 24 Jan 2013 10:00 MST
slugs: 
- basecamp-next-todo-migrator
- bcx-todo-migrator
tags: 
- basecamp
- bcx
- ruby
- api
images:
    twitter:
        small: http://res.cloudinary.com/verboselogging/image/upload/t_small/bcx-migration.png
        medium: http://res.cloudinary.com/verboselogging/image/upload/t_medium/bcx-migration.png
        large: http://res.cloudinary.com/verboselogging/image/upload/t_large/bcx-migration.png
        original: http://res.cloudinary.com/verboselogging/image/upload/bcx-migration.png
---

I had this conversation on Twitter yesterday.

![Twitter conversation with @37Signals about migrating a BCX project]({{.twitter.large}})

That's fine. 37Signals is known for saying no to things in the interest of a better product. A migrator for BCX isn't exactly something that would add enough value to the product to warrant spending their time on it.

**It's cool.**

## Don't worry, I got this

I built one. It only took a couple hours to throw together and clean up. It's super basic, but it did the job for me. It handles todolists with their todos and comments, but no attachments.

<script src="https://gist.github.com/4618013.js"></script>

It's not my best code, but whatever it works. The `rescue`/`retry` stuff was a last minute eye roller because I got an SSL error of sorts. Just keep an eye on it if it gets out of hand. Completed lists are migrated as well, so you have a record of that stuff too.

It migrated my 800+ todos in my Basecamp Next project to Basecamp Personal in about 24 minutes. Now I can save some bucks in the long run. 

**Happy migrating!**

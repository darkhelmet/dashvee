--- 
id: 392
author: Daniel Huckstep
title: "role_on: Really Simple Roles (For Rails)"
category: programming
description: My little gem to handle roles in rails, really simply.
published: true
publishedon: 14 Jul 2009 08:00 MDT
slugs: 
- role_on-really-simple-roles-for-rails
tags: 
- ruby
- rails
- role_on
---
I looked at a few role systems for Rails, but never found what I wanted.
They were all object based systems, never just "allow a user with this
role to do this action". Either that or I never found the systems that
did that, or totally missed the docs on how to configure those systems
to do what I wanted. Well, actually acl9 seemed to do that, but
whatever.

So I made [role_on](https://github.com/darkhelmet/role_on)

The instructions are on Github, so I won't repeat them here, but it's
pretty straight forward. You control your roles yourself (which are just
habtm between User, and identified by a string), and this just allows
you to say something like this in your controller:

<script type="text/javascript" src="http://gist.github.com/177743.js?file=setup-role.rb"></script>

It also add a method on the User class to check roles, so you can do
something like this in views:

    if current_user.has_role?(:amin) # do stuff…

Enjoy.

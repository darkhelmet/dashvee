--- 
id: 513
author: Daniel Huckstep
title: Bash Brace Expansion For Less Typing
category: software
description: bash is pretty awesome, yo! Use brace expansion to boost productivity.
published: true
publishedon: 18 Jun 2012 10:00 MDT
slugs: 
- bash-brace-expansion-for-less-typing
tags: 
- bash
- console
- terminal
---
Named a file wrong? Need to move it to another directory? **No big
deal.**

What if you named a view file foo.haml instead of the proper
foo.html.haml?

    mv app/views/widgets/foo.{haml,html.haml}

Does exactly what you think it does. It expands to:

    mv app/views/widgets/foo.haml app/views/widgets/foo.html.haml

Since it's just bash, it also works with git:

    git mv app/views/widgets/foo.{haml,html.haml}

Works within the path too:

    git mv app/views/{widget,whatsit}/foo.html.haml

--- 
id: 359
author: Daniel Huckstep
title: Stubs Vs mocks
category: programming
description: The basic difference between stubs and mocks.
published: true
publishedon: 17 May 2009 15:00 MDT
slugs: 
- stubs-vs-mocks
tags: 
- stub
- mock
- testing
---
I keep coming back to asking myself what the difference between stub and
mock objects are and I have it figured out, so here it is:

Stubs just return whatever you tell them do, and that's it. Mocks have
expectations and cause tests to fail if those expectations aren't met.

--- 
id: 382
author: Daniel Huckstep
title: Use Net::SSH With Amazon EC2
category: programming
description: Use ruby's net-ssh with Amazon EC2.
published: true
publishedon: 22 Jun 2009 10:51 MDT
slugs: 
- use-net-ssh-with-amazon-ec2
tags: 
- ruby
- amazon
- ec2
- ssh
---
I'm writing up some scripts to automate some
[EC2](http://aws.amazon.com/ec2/) setup, and
[SSH](http://en.wikipedia.org/wiki/Secure_Shell) is required. All the
examples for [Net::SSH](http://net-ssh.rubyforge.org/) show using just a
username and password, which is all good, but the Amazon stuff requires
a key file. Here's how to do it:

    Net::SSH.start('my.amazon.hostname.amazonaws.com', 'user', :keys => '/path/to/keypair.pem') { |ssh| … }

According to the docs, the `:keys` named param takes

> an array of file names of private keys to use for publickey and
> hostbased authentication

but even when I give it a string instead of an array of strings, it
works fine.

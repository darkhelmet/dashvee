--- 
id: 474
author: Daniel Huckstep
title: Instant NoSQL Cluster With Chef, Cassandra, And Your Favorite Cloud Hosting Provider
category: software
description: Crank up a Cassandra NoSQL cluster with the magic of Chef and cloud providers.
published: true
publishedon: 05 Nov 2010 08:00 MDT
slugs: 
- instant-nosql-cluster-with-chef-cassandra-and-your-favorite-cloud-hosting-provider
tags: 
- chef
- cassandra
- nosql
- rackspace
- amazon
images: 
  dr_nick: 
    small: http://cdn.verboselogging.com/transloadit/small/ba/ee1338a73e50dae3cb628fd414d180/dr-nick.gif
    medium: http://cdn.verboselogging.com/transloadit/medium/ef/943cb0c0aa1f0e47175ed7b2e5eea5/dr-nick.gif
    original: http://cdn.verboselogging.com/transloadit/original/b0/6426354b2b4f5b1b0042a3e1e1ac93/dr-nick.gif
    large: http://cdn.verboselogging.com/transloadit/large/8f/f861556e7576616711011b4b343bde/dr-nick.gif
---
<img src="{{.dr_nick.medium}}" class="fright bbottom bleft round medium" />

## Hi everybody!

Okay, so don't worry, I'm not [Dr. Nick Riviera](http://en.wikipedia.org/wiki/Dr._Nick_Riviera), I'm not going to take your liver out. Well, not unless you need to sell it!

I am going to tell how to get your NoSQL on with a little bit of Cassandra, a little bit of Chef, and a little bit of sensual.. NO NO NO! Nevermind, none of that.

## Seriously

No really, we're going to get some [/dev/null](http://www.xtranormal.com/watch/6995033/) web scale up [in this bitch](http://www.explosm.net/db/files/Comics/Rob/upinthisbitch.png)

But not with MongoDB. This setup is more suited to a Dynamo style system, and not a master-master, or replica system like CouchDB or MongoDB.

## No really, seriously let's do this

Okay enough shtick. Let's do this. Before we get too far, I should tell I'm not going to teach you how to use Chef. Or how to configure Cassandra. Those are other balls of wax. I'll just show you cool stuff you can do with a really sweet feature of Chef to crank up your cluster. 

## What's so cool about Chef?

Chef is pretty cool. It's along the same lines as [puppet](http://www.puppetlabs.com/) if you've used that. It has a central server which keeps track of hosts (nodes in Chef-speak), and the really cool feature I was talking about is the ability to search your nodes when you are setting one up. You can do some stuff like this:

    search(:node, 'name:db*')

in a recipe to get all the nodes whose name starts with "db". Awesome! You could set up `iptables` to only allow connections from the hosts in your network. You could...um...do some pretty cool stuff. You really can. We're going to use this feature to setup our cluster.

## Searching, LIKE A BOSS!

With Cassandra, you setup a single node, and it has *seeds*. Well okay, it really only needs one to get started. The seeds are just nodes it *gossips* with to figure out where everything is. Then it can continue on its merry way, migrating data around, scaling your app by [adding another server](http://jamesgolick.com/2010/10/27/we-are-experiencing-too-much-load-lets-add-a-new-server..html).

So. Where does Chef search come in?

When we crank up another Cassandra node, we can search for and find all the other nodes in the Cassandra cluster, and set those as the seeds so it can gossip like the stereotypical office secretary. It not super exciting since it will figure out where all the nodes are given just one, but it's good stuff anyway. Cassandra also has a very open security model (was designed for situations where you control the LAN, AFAIK), so that thing I talked about before? Setting up iptables to only accept connections from a certain set of nodes? Pretty useful now, isn't it!

## Show me some code already!

Alright, but only a peak!

<script src="https://gist.github.com/662132.js?file=default.rb"></script>

This is the relevant chunk of the `default.rb` from the Chef recipe. We search for the nodes that have similar names (I was going for the cassandra1, cassandra2 kind of setup), grab their private IP address (you can adapt this for Amazon or Rackspace, or both), and throw these in the config file for the seeds value.

That search is *everything*. I'm just using it to setup the seeds, but you can use it for iptables, for setting up replication between CouchDB or MySQL servers, or setting up an nginx load balancer. You just search for the relevant nodes you need, and away you go.

Maybe it's just the wine, but I'm excited about that search. It's not like it's new, it didn't just come out in a new version of Chef, but it's damn exciting. This isn't your dad's [devops](http://en.wikipedia.org/wiki/DevOps), it's automation cranked up to 11.
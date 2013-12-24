--- 
author: Daniel Huckstep
title: Custom Scout Plugins For Lonely Sysadmins
category: software
description: A couple simple scout plugins for lonely sysadmins and their Ubuntu servers.
published: true
publishedon: 30 Dec 2013 10:00 MST
slugs: 
- custom-scout-plugins-for-lonely-sysadmins
- custom-scout-plugins
tags: 
- ruby
- sysadmin
- devops
- scout
- ubuntu
---
When you run servers, there are certain things you need to know. When you're the only one running the servers, there are a few more things you need to know.

## One is the loneliest number

Since I'm basically the only person running the servers keeping [Yardstick Measure](http://GetYardstick.com/) alive, I need to know as much as I can about them. More than that, I need to know things you might not really care about if you have a team of dedicated people managing the servers.

## Scout

I use [Scout](https://scoutapp.com/) to track server metrics and keep an eye on things. I try my best to install the relevant plugins, have them setup properly and alert me when problems show up. When something happens and I don't hear about it right away, I try to find a new plugin on Scout to give better insight to what happened.

Sometimes you need some piece of information that Scout doesn't have a plugin for. Luckily, writing custom plugins is easy. I won't cover the entire process, because Scout has a [great page on creating custom plugins](https://scoutapp.com/info/creating_a_plugin). I made a couple simple plugins to make sure I stay on top of of a couple things. These work on Ubuntu boxes.

## Reboots

The first plugin tells me if the server requires a reboot. Pretty simple, but if you don't login it and see the `reboot required` as part of the MOTD, then you don't really know that there is a kernel update that hasn't taken effect because the box needs a reboot. I can then alert on the `reboot_required` metric when it hits `1.0` to send me an email. It doesn't need to go to [PagerDuty](http://www.pagerduty.com/) or anything. The alert also shows up in the Scout dashboard.

<script src="https://gist.github.com/darkhelmet/8109026.js?file=reboot_required.rb"></script>

## Updates

The second plugin tracks the number of pending updates, breaking out the number of security updates into their own metric. This way I can alert on the number of security upates pending so I know I need to run an update. This actually made me aware of the fact that the automatic security updates were only working on one of my servers. So that's nice.

<script src="https://gist.github.com/darkhelmet/8109026.js?file=updates_available.rb"></script>

They're nothing fancy, but they help me along with my sysadmin related tasks.

--- 
author: Daniel Huckstep
title: NewRelic with Rails 2.3.x and Sinatra Metal Controllers
category: software
description: NewRelic has a quirk if you're using Sinatra metal controllers, but they helped fix it.
published: true
publishedon: 29 Jul 2013 10:00 MDT
slugs: 
    - newrelic-sinatra-rails-metal-controllers
tags: 
    - newrelic
    - ruby
    - rails
    - metal
---
Our application at [Yardstick](http://getyardstick.com/) is Rails 2.3.x, and we use some Sinatra based [metal controllers](http://www.railsinside.com/deployment/180-metal-super-fast-endpoints-within-your-rails-apps.html). We also use [NewRelic](http://newrelic.com/our-home) to monitor things.

## Get Low

Something got updated somewhere, maybe the NewRelic gem, maybe something else. Our [Apdex](https://newrelic.com/docs/site/apdex-measuring-user-satisfaction) hit 0.3 or something stupid and stayed there.

After a long debugging period going back and forth with the NewRelic folks, we figured it out.

## Problem, meet Solution

The way a metal controller in Rails 2.3 works is that the app hits the stack, it works its way through all the metal controllers, then hits the main Rails controller. The metal controllers either handle the request, or returns a 404. When a 404 is encountered, Rails hits the next controller.

The problem was that when Sinatra hits a 404, NewRelic was treating it as an error. This meant the request was considered failed, and marked as being "frustrating". We monkeypatched the NewRelic Sinatra instrumentation to ignore the request when calculating apdex if the request was a 404.

The other problem is that when Sinatra hits that 404, it puts an entry in the Rack environment. We setup the monkeypatch to delete the Sinatra error from the Rack environment, and clear the NewRelic exceptions.

Now our app reports a correct Apdex. Yay!

If you are running Rails 2.3.x, are using Sinatra metal controllers, and are monitoring with NewRelic, you probably want to dump this in an initializer in your app.

<script src="https://gist.github.com/darkhelmet/6100243.js"></script>

--- 
id: 379
author: Daniel Huckstep
title: Riding Rails With Selenium
category: programming
description: Sometimes selenium gives you problems. Here are workarounds for some of them.
published: true
publishedon: 11 Jun 2009 08:00 MDT
slugs: 
- riding-rails-with-selenium
tags: 
- ruby
- rails
- testing
- cucumber
- selenium
- sqlite
---
[Selenium](http://seleniumhq.org/) *is a suite of tools to automate web
app testing across many platforms.* [Cucumber](http://cukes.info/) is a
BDD framework that allows you to write things in English (or whatever
language you want, really), and have that execute as code. Put those
together with webrat and rspec and you have a pretty mean stack to test
your ruby on rails web application with. Sort of.

I've been having some problems with it, getting it set up, but it's
coming along.

This isn't a post about how to setup Selenium from scratch. There are
other resources out there for that, like [this
page](http://wiki.github.com/aslakhellesoy/cucumber/setting-up-selenium)

I'm just going to rant about some of the problems I've come across and
some fixes for them.

1.  **All users have wrong passwords, no data in DB.** You can't have
    transactional fixtures when using selenium, so turn those off in
    your env.rb file. You can use
    [database_cleaner](https://github.com/bmabey/database_cleaner/tree)
    to try and help with that, but I'm still working out kinks with that
    too it seems. A step in the right direction.
2.  **current_url checks fail randomly.** Sometimes selenium doesn't
    wait long enough for pages to load, especially after form POST's.
    You need to tell selenium to wait after certain things by calling
    `selenium.wait_for_page_to_load` This of course only works
    when using selenium so wrap it up to only call this if you are using
    selenium, so that you can still run your tests in normal
    rails/webrat mode and not die in a fire.
3.  **Database busy/timeout when using sqlite.** This came up a few
    times randomly, but adding **timeout: 1000** to the test database in
    database.yml worked wonders. Some say it was because of the
    transactional fixtures problem, but it occurred with me even when
    they were turned off.
4.  **Catch those confirms.** You have to catch confirms in selenium,
    with `selenium.get_confirmation`, so wrap that up, and put it in your
    step definitions after things that you know pop up confirmation
    dialogs.

The selenium-client docs also provide some good information if you are
having problems. Get them [here](http://selenium-client.rubyforge.org/)

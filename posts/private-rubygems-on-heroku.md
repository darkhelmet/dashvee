--- 
id: 508
author: Daniel Huckstep
title: Private Rubygems on Heroku
category: programming
description: Github and ssh_config are your friends for getting private gems on Heroku
published: true
publishedon: 25 May 2012 10:00 MDT
slugs: 
- private-rubygems-on-heroku
tags: 
- heroku
- ruby
- github
- git
---
Maybe Heroku changed something, or maybe it's the new [Cedar
stack](https://devcenter.heroku.com/articles/cedar), but using private
gems from Github is pretty easy. It apparently [didn't
work](http://underpantsgnome.com/2011/01/05/how-to-install-private-gems-on-heroku)
[before](https://groups.google.com/group/heroku/tree/browse_frm/month/2010-08/dec5a42c5c8d8096?rnum=101&_done=%2Fgroup%2Fheroku%2Fbrowse_frm%2Fmonth%2F2010-08%3Ffwc%3D1%26).

The important part is in your `~/.ssh/config`

    Host heroku.com
        ForwardAgent yes

After that it's no big deal. Just use an ssh URL to Github (or wherever,
the Github part doesn't really matter) in your `Gemfile` and off you go!

    source :rubygems
    ruby '1.9.3'
    gem 'sinatra', :git => 'git@github.com:darkhelmet/sinatra.git'
    gem 'thin'
    gem 'heroku'

The code [here](https://github.com/darkhelmet/private-gem) is running on
Heroku:
[http://private-gem.herokuapp.com/](http://private-gem.herokuapp.com/)

So if you need a private gem on Heroku for work or something, go right
ahead.

It's no big deal.

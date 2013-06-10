--- 
id: 404
author: Daniel Huckstep
title: "respond_to With respond_glue: Override respond_to"
category: programming
description: I hack up a way to 'override' respond_to blocks in your rails application.
published: true
publishedon: 21 Aug 2009 08:00 MDT
slugs: 
- respond_to-with-respond_glue-override-respond_to
tags: 
- ruby
- rails
- inheritance
- oop
---
So check this: you have a nice little Rails app. You have some stuff for
a JSON API type system. You've got an
[STI](http://juixe.com/techknow/index.php/2006/06/03/rails-single-table-inheritance/)
setup with the
[Widget](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/models/widget.rb)
model class and the more concrete
[FancyWidget](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/models/fancy_widget.rb)
and
[WeirdWidget](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/models/weird_widget.rb)
classes. You've got a
[WidgetsController](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/controllers/widgets_controller.rb),
and the corresponding
[FancyWidgetsController](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/controllers/fancy_widgets_controller.rb)
and
[WeirdWidgetsController](http://github.com/darkhelmet/respond_glue-example/blob/822086637d7360594a615da4a928fa8acc1d3211/app/controllers/weird_widgets_controller.rb)

Yay. It works. You can deal with both types of Widgets using JSON.

Now you need an HTML interface to it.

Fine, you can just throw in a *format.html* in the *emit* method. Oh
wait that won't work. The JSON just returns the same thing all the time,
since it has that valid method on there, so if a save fails, valid will
be false, and then whatever deals with the JSON can handle when valid is
false.

So what to do? Well, you could duplicate the code in emit to all the
methods in the
[WidgetsController](http://github.com/darkhelmet/respond_glue-example/blob/9da9d47ad0b79aea7e1b06ed4f5aed5b63f79bd4/app/controllers/widgets_controller.rb)
and it would probably work out. Then you just do some [fun things in the
views](http://github.com/darkhelmet/respond_glue-example/commit/9da9d47ad0b79aea7e1b06ed4f5aed5b63f79bd4)
to generate the right paths (`fancy_widget_path` instead of
`widget_path`).

But that's no fun. Then you have all this duplicate code, and it's still
a pain to override methods in the Fancy and Weird Widget controllers
since you can't really call super, since there is that format.html and
render call and they don't exactly replace each other. Pain. And
Suffering

Who cares, because we have blocks. Tasty ruby blocks that when mixed
with anything result in a tasty meal.

So I threw together
[respond_glue](http://github.com/darkhelmet/respond_glue/tree)

A little plugin to fix this problem, with minimal crap.

In its simplest form, it's this

<script type="text/javascript" src="http://gist.github.com/177740.js?file=respond_glue.rb"></script>

This gets included into ActionController::Base, which lets you do stuff
like this:

<script type="text/javascript" src="http://gist.github.com/177740.js?file=controllers.rb"></script>

The `respond_glue` lines setup blocks to be used when calling
format.html (or js, xml, whatever. In the example, format.html). The
`glue_for` line sets up the glue for the index action. This must be
called after the methods passed in have been defined (so if you want
`glue_for(:index,:show,:new)` then you must call it after defining the
index, show and new actions. The `superglue_for` call sets up the other
actions so they run the default superclass action, and actually render.

So what happens when the app hits the index action on the
FancyWidgetsController? It's pretty straightforward:

1.  `FancyWidgetsController#index` gets called
2.  …which is actually defined by the `glue_for` line
3.  …so the newly defined method calls the original method
4.  …and it calls super
5.  …which calls `WidgetsController#index`
6.  …which sets up some format handlers
7.  …which returns and continues in `FancyWidgetsController#index`
8.  …which replaces the html handler originally defined in
    `WidgetsController#index`
9.  …which returns, and then the new method (defined by the `glue_for`)
    calls the `respond_to` block

So. You get nice inheritance where you can reuse code in the parent
class, and still override the `respond_to` stuff.

Opinions? Ideas? Did I just do a bunch of work to solve a problem that
is better solved another way?

Check out the example
[here](http://github.com/darkhelmet/respond_glue-example/tree) and get
the plugin [here](http://github.com/darkhelmet/respond_glue/tree)

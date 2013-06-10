--- 
id: 446
author: Daniel Huckstep
title: Hijack AJAX Requests Like A Terrorist
category: programming
description: I show you how to hijack AJAX requests.
published: true
publishedon: 20 Feb 2010 18:00 MST
slugs: 
- hijack-ajax-requests-like-a-terrorist
tags: 
- ajax
- web
- javascript
- jquery
images: 
  intercept_ajax: 
    small: http://cdn.verboselogging.com/transloadit/small/5f/4d5b14ee10f3dfc67a71d0dd46ee42/intercept-ajax.png
    medium: http://cdn.verboselogging.com/transloadit/medium/0a/a4014d183da1be296b81a31c2e4842/intercept-ajax.png
    large: http://cdn.verboselogging.com/transloadit/large/88/659d05da0b90ee51e3704a2d71d675/intercept-ajax.png
    original: http://cdn.verboselogging.com/transloadit/original/43/470c6b7fa8f6fdc599545dd7fd45dd/intercept-ajax.png
---
AJAX requests are a grand thing. They let you request things from your server without refreshing the page. Now, if you are trying to proxy a page, you can rewrite all the links in the page to point back through your proxy, but AJAX requests are another thing.

**Oh wait no they're not!**

You can't rewrite them when you proxy the page (by proxy, I mean you request my page with a URL param to another page, and I pull in that page, do some stuff, and serve it to you), but you still want the AJAX to go through your proxy, since otherwise it won't work.

Luckily there's a solution!

No matter what framework you use, [jQuery](http://jquery.com/), [Prototype](http://prototypejs.org/), whatever, they all go through the [XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest) interface. That is unless you are rockin' IE6, in which case they use an `ActiveXObject`. I don't deal with that, although I'm sure you can do something similar with it.

Anyway.

So you have this `XMLHttpRequest` thing, and as an example, in the jQuery code they do this:

    new window.XMLHttpRequest();

See that `new` in there? They are creating a new _object_ (for varying definitions of `object`). But whatever, this means we can use the magic of *prototype*. There's [a bunch](http://www.howtocreate.co.uk/tutorials/javascript/objects) [of stuff](http://www.packtpub.com/article/using-prototype-property-in-javascript) [out there](http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work on prototype), so I won't cover it, but let's get some code.

<script type="text/javascript" src="http://gist.github.com/309973.js?file=ajaxIntercept.js"></script>

And it works like this:

[<img src="{{.intercept_ajax.large}}" />]({{.intercept_ajax.original}})

So check this out. First, we define an anonymous function that we call immediately:

    (function() {
    })();

The reason we need to do this is so that we can have a reference to the original `open` method without having to have other weird things kicking around just for that. So we call the method with the original `open` method as the only parameter:

    (function(open) {
    })(XMLHttpRequest.open);

Then with the prototype method, we redefine the `code` method on all XMLHttpRequest objects:

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) { }

While keeping the original method around so we can intercept calls to it.

    // Do some magic
    open.call(...);

Put it all together and you get the AJAX interception code.

<script type="text/javascript" src="http://gist.github.com/309973.js?file=ajaxIntercept.js"></script>

Simply replace the `// Do some magic` comment with your code to rewrite the URL, or do whatever with the request. Now when you proxy the request, just prepend a script tag to the `head` element (make it the first element inside the `head` tag) so it gets loaded before any other of the scripts on the page.
--- 
id: 334
author: Daniel Huckstep
title: Borland C++ Builder 5, How I Hate Thee
category: software
description: Borland C++ Builder is just, terrible. Just terrible.
published: true
publishedon: 30 Apr 2009 20:32 MDT
slugs: 
- borland-c-builder-5-how-i-hate-thee
tags: 
- borland
- cpp
- ide
- fml
---
I'm pretty sure Borland's C++ Builder 5 is the worst IDE ever.

It's **slow**. If you try to use tooltips or code completion, it takes a
good 5 seconds before anything shows up. On top of that, since they
didn't put the tooltip activity in a separate thread , the entire
application is frozen and you get the hourglass while it's looking for
something to display. Super. Not only does it take forever to get a
tooltip, but the default timeout is too short, so scrolling through code
results in this happening numerous times when you don't even want it to.
Luckily this can be turned off. Too bad, because hovering over variables
to get the type, and having good code completion is a nice benefit of a
quality IDE.

This brings me to my next point: even when you do hover over a variable,
**nothing spectacular happens**. If you let it sit long enough to popup
a tooltip, it just shows you the variable name and the file you're in.
Because that's exactly what I wanted to know.

The IDE itself and the package manager seem to treat header files as
second rate code. In the project, all you see are the C*+ source files
(.cpp). If you include a header file in the source file (for example,
include foo.h in foo.cpp), sure you can right click somewhere and select
some option relating to switching to the header files (if you're in the
source file), or the source file (if you're in the header). Not too bad,
but how about just editing other header files, like a debug.h header or
something? You might have that header in an include directory not in the
project root. Oh no, you can't just tell it to open that header, because
despite the fact that the compiler can be told to look in multiple
directories for includes, apparently the IDE can't. And if it can be
configured, it shouldn't have to be. I should be able to at least have a
nice way to just open a header file that I have in my project. Like,
maybe if the stupid project manager listed header files too. But no that
would be too easy. If there was an option to change all this, I couldn't
find it.

The compiler…is slow. **Very slow**.

The text editor is just painful. It's basically just a basic text box
control. What's up with it just moving the cursor anywhere? Granted some
people like this option, but if I'm at the end of a long line, and I
press down to move to the line below me, and it's much shorter, I want
the cursor at the end of the text, not immediately below my position. I
can't even figure out what to call this "feature" to be able to disable
it in the options somewhere, if it can be disabled. :( Furthermore, when
I press Home, I enjoy when the cursor goes to the start of the text,
then if I want, I can press Home again, and move the start of the line.
That's how basically all the other IDE text editors I've used work (for
that matter, any good text editor). It's great; but not Borland. Tabs
are confusing too. I can't get it to do anything I want with tabs.

I hate this app. I was happy to quit using it, and I'm happy that I
don't have to use it at my new job :D

--- 
id: 381
author: Daniel Huckstep
title: Calculating Age
category: programming
description: An interesting way to calculate age.
published: true
publishedon: 17 Jun 2009 08:00 MDT
slugs: 
- calculating-age
tags: 
- stackoverflow
- datetime
---
I found this little snippet on
[stackoverflow](http://stackoverflow.com/)

<blockquote>
<p>
This is a strange way to do it, but if you format the date to yyyymmdd
and subtract the date of birth from the current date then drop the last
4 digits you've got the age :)

I don't know C#, but i believe this will work in any language.

20080814 - 19800703 = 280111

drop the last 4 digits = 28

</p>
</blockquote>
All credit goes to
[ScArcher2](http://stackoverflow.com/users/1310/scarcher2)

This is just a great little snippet of code, and as an upside, dates in
that format are easily sortable by standard numerical sorting methods
(read: fast).

[Original
question](http://stackoverflow.com/questions/9/how-do-i-calculate-someones-age-in-c)
and
[answer](http://stackoverflow.com/questions/9/how-do-i-calculate-someones-age-in-c/11942#11942)

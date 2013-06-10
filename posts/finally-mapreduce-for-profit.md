--- 
id: 453
author: Daniel Huckstep
title: Finally, MapReduce For Profit!
category: programming
description: Part 2 of the Super MongoDB MapReduce Max Out! series.
published: true
publishedon: 28 Mar 2010 08:00 MDT
slugs: 
- finally-mapreduce-for-profit
tags: 
- mongodb
- map-reduce
---
*This post is part 2 in the Super MongoDB MapReduce Max Out! series.
[Read Part 1](/2010/03/22/super-mongodb-mapreduce-max-out)*

Now, from the last post, you might still be wondering what's the whole
point behind this MapReduce stuff? What can you really do with it?

Well hold on, I'm going to tell you.

But first, some back story.

## History lesson

So I work at [CodeBaby](http://www.codebaby.com/) and we sell CodeBaby
Characters and CodeBaby Conversations to live on your website and bring
some emotion to a static page. In order to do this to the best of our
abilities, we track the usage of these conversations.

A lot of these metrics are things like progression markers through an
individual segment , button clicks in dialog boxes, and other bits like
that. This information helps our people make the conversation better and
prove the value to our customers.

## Why MongoDB, again?

I wanted to start playing with these new fangled databases, and I landed
on MongoDB for a few reasons:

* This particular metrics problem was well suited to the type of
database that MongoDB is.
* Phil Ripperger had [already played with
CouchDB](http://www.pdatasolutions.com/blog/archive/2009/09/three_weeks_with_couchdb.html)
for this exact purpose.
* If databases were ninjas and two of them were to fight, it would be
MongoDB and CouchDB.

Using MongoDB seemed like the natural choice to start getting into these
databases. We're not using this in production, it was just a side
project for me between work and home to learn MongoDB.

Anyway, enough history, let's reduce some maps! Or whatever…

So let's pretend we are making a CodeBaby Conversation for **Fizzbin
Cloud Services** and the problem they are having is that not enough
people are signing up for their **Super Fantastic Cloud Hosting**. So we
make them a conversation, and start getting metrics back. We load them
up into MongoDB and they look a little like this:

<script type="text/javascript" src="http://gist.github.com/346635.js?file=schema-example.js"></script>

This is an example of a segment progress metric. It says that the user
with the specific uid watched the segment named *Intro welcome* to 75%.
There are also events for the 0% (initially start playing) and 25 and 50
percent markers. The *time* field is the time the event came in as per
the server clock.

There's actually a bit more information, but that's all that's relevant
for this article.

## Segment retention

Something that's quite relevant is *segment retention*. This tells us if
people are actually watching the segments. If everybody only makes it to
50%:

-   Maybe we should be changing something.
-   Maybe they are only making it to 50% because they know what they
    want, there is a dialog box on the screen and have already clicked
    away.

Regardless, we want to see how many unique users hit each stage (0, 25,
50, 75, and 100 percent) of a segment. This type of thing is important
in various other places too: are people paying attention to our shit?

## MongoDB's *group* command

Using the group functionality of MongoDB, we can count **all events**,
but not unique users. This means that if every user watches each segment
twice, these numbers will be twice as high as the numbers we actually
want. This information is also useful, but for other reasons. It looks a
little like this.

<script type="text/javascript" src="http://gist.github.com/346635.js?file=segment-retention-group.js"></script>

It gives you back an array of objects that look like this.

<script type="text/javascript" src="http://gist.github.com/346635.js?file=group-out.js"></script>

That says that for the *Intro welcome* segment, we had ~5000 events, and they are distributed as it shows. Fantastic.

That does the job for *that* information, but it has its flaws. The results of the query have to fit in memory, and it can be a little slow.

## MapReduce to the rescue

To get the unique user information, we can use MapReduce and do something like this.

<script type="text/javascript" src="http://gist.github.com/346635.js?file=segment-retention.js"></script>

This gives us the good stuff.

What happens is it puts results in a random database as individual documents, which you can then retrieve. They look like this.

<script type="text/javascript" src="http://gist.github.com/346635.js?file=map-reduce-out.js"></script>

From this we can see that ~1000 users started playing the
segment, and as it went on, that number drops off. This is information
we can use. This is information we take to the bank.

Using MapReduce for this has some nice perks. Since MongoDB can be
easily setup for sharding, it would make sense that the MapReduce would
be able to run in parallel across the shards; it can. Oh yeah.
Seriously, you have MapReduce in your database, and it scales across
your shards, how awesome is that.

## Conclusions

All in all, MongoDB has some very powerful features, not the least of
which is its built in MapReduce functionality. If you are in that range
where using Hadoop might be overkill, but MySQL just can't hack it
(either in volume of data or processing capability), then MongoDB is
probably your choice. Put it to work, shard it, MapReduce it.

Then make a weird 10 minute music video of it. I'm looking at you Lady
Gaga.

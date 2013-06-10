--- 
id: 452
author: Daniel Huckstep
title: Super MongoDB MapReduce Max Out!
category: programming
description: I smack my data up with some MapReduce, courtesy of MongoDB.
published: true
publishedon: 22 Mar 2010 08:00 MDT
slugs: 
- super-mongodb-mapreduce-max-out
tags: 
- mongodb
- map-reduce
images: 
  mongodb: 
    original: http://cdn.verboselogging.com/transloadit/original/14/03bd5f35cb28de55a0aa0423e936a9/mongodb.png
    small: http://cdn.verboselogging.com/transloadit/small/02/619d28f5750684ac1e7ed8ce82b3bc/mongodb.png
    medium: http://cdn.verboselogging.com/transloadit/medium/c7/61f246fe2bd12b719c1aa056f8b4ed/mongodb.png
    large: http://cdn.verboselogging.com/transloadit/large/2b/e9476795b800d893cd6d4a16f3d6e2/mongodb.png
---
<img src="{{.mongodb.original}}" class="fright bleft bbottom round" />

I've been playing with [MongoDB](http://www.mongodb.org/) lately, and I must say, it's the shit. In case you haven't heard of MongoDB, let's drop some buzz words:

* Document oriented
* Dynamic queries
* Index support
* Replication support
* Query profiling
* MapReduce
* Auto sharding

There are some more things, so check out their website for the full meal deal. I'm going to talk about the MapReduce part of things.

## [MapReduce](http://en.wikipedia.org/wiki/MapReduce)

The idea behind MapReduce has been around for a while; since the Lisp days. Here's the basic idea:

* Gather list of items (list 1).
* Apply the map function to each item in list 1, generating a new list (list 2).
* Apply the reduce function to the resultant list (list 2) as a whole.
* Return value return by reduce.
* Profit!

In the MongoDB world, you run the mapReduce command, and it takes a few arguments:

* *mapFunction*
	* A function that takes an individual document (`{ "value": 1 }`) and (possibly) emits a value (or emit multiple values), whether that be a new document, or a single value (like a number).
	* The emit function takes a key, and a value.

<script type="text/javascript" src="http://gist.github.com/339677.js?file=mongo-map.js"></script>

* *reduceFunction*
	* A function that takes a list of values emitted from the map function and a key, and produces a single value.

<script type="text/javascript" src="http://gist.github.com/339677.js?file=mongo-reduce.js"></script>

* *optional options*
	* *query*
		* A MongoDB style query. Like any database query, this selects which documents you are going to apply your map function to.
	* *out collection*
		* The name of a collection to output into.
	* *finalize function*
		* A function to further apply to the reduced value.

Here's an example from the mongo shell.

<script type="text/javascript" src="http://gist.github.com/339677.js?file=mongo-example.js"></script>

So at the bottom there, you can see the result is 60.

We could rewrite this to move the `if` statement in the map function into a query. Then we cover less items, and don't have to do the check in the map function.

<script type="text/javascript" src="http://gist.github.com/339677.js?file=mongo-example-query.js"></script>

It returns the same result as above.

With me so far? MapReduce is interesting if you've never seen it before or never done any functional programming, but once you get it, you understand its power.

## Caveats

In the MongoDB environment, it's incredibly important that your reduce function is idempotent. Stealing their example straight from the MongoDB website, it means:

	for all k,vals : reduce( k, [reduce(k,vals)] ) == reduce(k,vals)

This is because the reduce function might be executed a number of times with results from various stages. Since MapReduce can be done across multiple servers, they will run their map and subsequent reduce functions on their data, but then the master server has to further reduce those results, so it takes the return values from all the reduce functions, and puts them into a list, and passes that to the reduce function again.

Basically, make sure the structure of what you return from reduce, is the same structure as whatever you are emitting in the map function. If you emit an integer, reduce should return an integer as well. In the sum example, it's really straight forward in that we just add stuff up. In other situations it can get more complicated.

Next, I'll talk about getting MapReduce to do, you know, useful things. Stay tuned!
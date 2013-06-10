--- 
id: 454
author: Daniel Huckstep
title: Writing User Defined Functions For Pig
category: programming
description: Pig is a powerful language for processing data. I show you how to leverage Java to write custom UDFs to help you out.
published: true
publishedon: 31 Mar 2010 08:00 MDT
slugs: 
- writing-user-defined-functions-for-pig
tags: 
- pig
- java
- hadoop
images: 
  pig: 
    original: http://cdn.verboselogging.com/transloadit/original/3c/da79d4fd788979554ab06a1c11306b/pig.jpg
    large: http://cdn.verboselogging.com/transloadit/large/01/33d69c0b0a67bcc695f0ea94e5fce9/pig.jpg
    small: http://cdn.verboselogging.com/transloadit/small/f9/9801c101f570f638d27f2682c76664/pig.jpg
    medium: http://cdn.verboselogging.com/transloadit/medium/ed/1e386bc5d83835a6fe66bb4d9cc7e3/pig.jpg
---
<img src="{{.pig.medium}}" class="fright bleft bbottom round" />

If you are processing a bunch of data, grouping it, joining it, filtering it, then you should probably be using [pig](http://hadoop.apache.org/pig/).

So go download that, and get it all setup. You need:

* Java 1.6 (with `JAVA_HOME` setup)
* [Hadoop](http://hadoop.apache.org/common/) (with `HADOOP_HOME` setup)
* pig (of course)

Put all the relevant stuff in your `PATH` too.

<div class='clear'></div>

## pig 101

So here's a simple pig script.

<script type="text/javascript" src="http://gist.github.com/348301.js?file=example.pig"></script>

This registers a jar file and defines a custom UDF(User Defined Function) for doing whatever. It happens to be a log line parser function.

We load a bzipped log file from apache (it can just read the bzipped files! Wee!) and by using the `TextLoader`, each line comes in as a `chararray` (in pig terms, a string).

Now, `FOREACH` line, run it through the parser function we defined ealier. We'll look at this shortly. We can now do some fun stuff, like `GROUP` on the action, and generate the counts of all these things.

Okay so that might look a little weird, but if you read it, it makes perfect sense. Let's cover a few things before we get to the UDF fun.

## `FOREACH` and `GENERATE`

In pig, the `FOREACH` and `GENERATE` combination does sort of what it says. It's essentially the map function (and you should be familiar with map functions from the [previous](/2010/03/22/super-mongodb-mapreduce-max-out) [posts](/2010/03/28/finally-mapreduce-for-profit)). For every *thing* in the bag (a bag is a pig datatype), *generate* something. In this case, we are telling pig to use our custom class to take the line, and generate some stuff (a tuple, actually).

## Tuples and Schemas

Tuples are ordered groups of things, and in pig, the fields can be named. You see tuples in Haskell, lisp (I think), and other programming languages. In the scripts, the `logs` variable represents a bunch of tuples, where each tuple is a single item, and that single item is named *line*. We got this because when we said:

    logs = LOAD 'apache.log.bz2' USING TextLoader AS (line: chararray);

It's telling pig

> Load the file and treat it as a text file, splitting on newlines, and give me a bunch of tuples, where each tuple has a single item that is a chararray named line.

You could load the file the same way, omitting the `AS (line: chararray)` part, but then the resulting tuples would have no *schema*.

The schema is essentially type information about the tuple. You can have a tuple without a schema, but it's much more useful to have one, since you can refer to field by name, instead of by field number (like indexing an array).

## User Defined Functions

A User Defined Function is exactly that; it's something you write that pig loads and uses. In this case, we are writing a Java class (Java is the only language you can use for this currently). For this example, we are going to write a function to parse a line in a log file and return a tuple so pig can then work its magic with the tuples. So normally this takes 30 minutes to bake, but I've got one already in the oven!

<script type="text/javascript" src="http://gist.github.com/348301.js?file=LogParser.java"></script>

## Play by play

Okay, first of all remember to add to your classpath the pig jar file. It's the `pig-VERSION-core.jar` in the pig directory. Add it in Eclipse, or whatever, so when you compile it has access to everything.

Inherit your class from `EvalFunc<Tuple>` since that's exactly what we are making: an `EvalFunc` (as opposed to a filter function or something else) that returns a tuple.

The exec method is your main method that has to return the proper type (tuple in our case) and takes a tuple. We check to ensure the input tuple is nice, in that it exists and has only one item (the line of text). We can then get the first item and cast it to a `String` so we can work with it.

We use a `try/catch` block to handle errors and make sure we just return `null` if there are any problems. If you return null, [everything in the tuple is null](http://stackoverflow.com/questions/2540071/does-throwing-an-exception-in-an-evalfunc-pig-udf-skip-just-that-line-or-stop-co/2541842#2541842) so you can filter that out using standard pig stuff.

We use the `TupleFactory` singleton to get a tuple, append our values in the order we want them to appear (in this case, just the HTTP method, IP address, and date), and return it. Yay!

## I can haz schema?

Yes you can. You could write the schema in the pig script.

    log_events = FOREACH logs GENERATE FLATTEN(Parser(line)) AS (action: chararray, ip: chararray, date: chararray);

This does have benefits, the main one being the schema is right there and you can see it. This makes writing the rest of the script a little easier, since you don't have to remember exactly what's in the tuples. The downside is you have to change code in two separate spots.

We decided to put the schema in the java class, so you can do some more programmatic things with it, and when you have to change it, it's right there next to the `exec` method you are also changing.

Building a schema is a little epic in Java (verbose much?) but it's not terrible. We create a new schema, and add in the same order we added things in the `exec` method, the names and types of the things we added.

* HTTP method: String/chararray
* IP address: String/chararray
* Date: String/chararray

You add to the new schema a `Schema.FieldSchema` object where you specify the name (what you want to reference the field as in pig) and the type (a byte, but just use the `DataType` enum values).

Now, if you `DESCRIBE log_events;` in the pig shell, it will tell you the schema. You can also now use named indexes into the tuple, as with `GROUP log_events BY action` to make your code more readable.
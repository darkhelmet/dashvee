--- 
id: 462
author: Daniel Huckstep
title: Find Queries Missing Indexes In Your Rails Application
category: programming
description: I help find all those pesky SQL queries without indexes by analyzing your log file.
published: true
publishedon: 14 May 2010 10:00 MDT
slugs: 
- find-queries-missing-indexes-in-your-rails-application
tags: 
- activerecord
- rails
- ruby
- mysql
---
Rails developers aren't exactly known for getting their indexes right
(or even at all) on their databases. Granted, databases are a tough
subject, and some people and companies make their living dealing with
only databases, and some only with one database (like MySQL or Oracle).

If you're coming to web development with no formal background in
databases, and it's all new to you, then it's totally understandable to
maybe forget about indexes initially, but luckily they can be added
later. Not adding indexes right away can be a benefit as well, since you
can see what your application is doing, and index only what you need.

Luckily pretty much all of the databases are smart and can tell you if
queries are using indexes or not, but you still have to ask. In MySQL
land, this is done with the `EXPLAIN` syntax. The
[docs](http://dev.mysql.com/doc/refman/5.5/en/explain.html) for it are
short and sweet, but basically you just feed it a `SELECT` query and it
gives you some nice output. As an example, here's the result of
`EXPLAIN SELECT * FROM tf_users WHERE user_id = 'darkhelmet';` on the
`users` table from [TorrentFlux](http://www.torrentflux.com/). [^1]

<script type="text/javascript" src="http://gist.github.com/397868.js?file=explain.sql"></script>

As you can see, it has the column named `possible_keys` which is `NULL`,
as well as the `key` column, also showing `NULL`.[^2]

Bad [DBA](http://en.wikipedia.org/wiki/Database_administrator!)

## SHOW INDEX

If you run `SHOW INDEX` on the database, it will tell you what indexes
you already have:

<script type="text/javascript" src="http://gist.github.com/397868.js?file=show_lack_of_indexes.sql"></script>

This one just has the primary key on the `uid` column. If your app is
actually finding people by user_id (and TorrentFlux does when you
login), this is a big slowdown when you have lots of users. **Any query
not using an index will take longer than a query using proper indexes.**
As a downside, indexes result in slightly slower inserts (more so if the
index is unique) and require more disk space to store. More RAM is also
needed, but frankly the pros outweigh the cons.

Anyway.

## CREATE INDEX

If we add an index to this table, we can see the differences:

<script type="text/javascript" src="http://gist.github.com/397868.js?file=with_index.sql"></script>

Now `possible_keys` and `keys` are populated with the key name we set
up.

## Now what?

Okay so the title of this post is *Find queries missing indexes in your
Rails application*, and so far I've just explained why you should use
indexes and shown some MySQL syntax to make them. Here comes the Rails
part.

<script type="text/javascript" src="http://gist.github.com/397868.js?file=find_bad_queries.rb"></script>

Put that in your script directory and smoke it. Seriously. It's for
Rails 3, but I'm sure you can change that top line to make it work in
Rails 2.x.

This script goes through the log file for your current Rails
environment, grabs all the `SELECT` queries and uses the
[Soundex](http://en.wikipedia.org/wiki/Soundex) algorithm explained
[here](http://www.devarticles.com/c/a/Development-Cycles/Tame-the-Beast-by-Matching-Similar-Strings/3/)
to weed out queries that are similar enough. In my test it took 2000+
queries down to about 300. There will still be some duplicates, but it's
close enough. It then feeds them all to the database with `EXPLAIN`
stuffed in front, and checks if the `key` column is `nil`, and prints
out any queries that don't have indexes. You can then at your leisure
feed them to your database, show the indexes and figure out what you
need to add to make the query happy. Add a migration and you're set.

You could even modify this script to be able to run when you run unit
tests and fail if a query doesn't have an index.

So get on it. You don't have an excuse anymore.

[^1]: This was just a good example, though not a Rails application.

[^2]: It also shows `rows` being 1, since there is only 1 user in the
    database. If there were more, that number would be the number of
    rows in the database. Since there is no index, it would have to go
    through all rows.

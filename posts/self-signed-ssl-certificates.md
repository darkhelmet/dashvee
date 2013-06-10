--- 
id: 375
author: Daniel Huckstep
title: Self Signed SSL Certificates
category: software
description: I always forget this. How to create an SSL certificate for yourself.
published: true
publishedon: 03 Jun 2009 08:00 MDT
slugs: 
- self-signed-ssl-certificates
tags: 
- apache
- ssl
---
I don't really care, I just want a certificate. Gimme!

For my stuff, I just want the SSL for my own personal use. It's not for
a variety of random people I don't know, just me, so I don't care.

How?

    openssl req -new -x509 -days 365 -nodes -out out.pem -keyout out.pem

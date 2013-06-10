--- 
id: 340
author: Daniel Huckstep
title: The Dell E521 Hates Me
category: hardware
description: The Dell E521 is not exactly Linux friendly.
published: true
publishedon: 04 May 2009 21:31 MDT
slugs: 
- the-dell-e521-hates-me
tags: 
- ubuntu
- jaunty
- amd64
- dell
- linux
---
So today I started my new job. There was much rejoicing. Mainly by my
father, whose bank account I slowly siphoned away whilst at university.

Being a software engineer (member-in-training), I work on a computer.
This computer happened to be a Dell E521. Not a top end machine, but for
what I was going to be doing it was plenty of machine.

I could do with it what I wanted I was told; awesome. I'm now the first
person at [CodeBaby](http://www.codebaby.com) to be running Ubuntu as my
main operating system.

I installed Ubuntu 9.04 Jaunty AMD64 and there was much rejoicing. But
then my mouse stopped working. Well that's odd. Luckily I can get around
with just the keyboard, and Ubuntu has the ability to use the numpad as
a way to move the mouse cursor. So I got some more things installed and
let some things finish, and restarted. The mouse worked. For about 3
minutes. After fumbling with the mouse, keyboard and networking dongle,
all USB, I concluded it must be the networking dongle. Unplug that, use
the computer for a bit, and it works! Except I spoke too soon, and the
mouse stops working.

In comes Google to the rescue (queue Superman theme), and the Dell
support forum informs me this computer is notoriously bad with Linux,
and just in general with USB stuff, with mice not working on various
distros (actually including FreeBSD) and even Windows. Apparently though
the fix is a BIOS update. Anything past 1.1.6 supposedly fixes the
problems. I tap my numpad into action and whiz over to find the BIOS
update file. It's a Windows executable. Damn.

Well now what do I do? After a few ideas, I whiz home to grab my BartPE
disc, have a bite to eat and back to the office. Put the disc in, start
up, and black screen. I get the "System is scanning …." line, and then
just a black screen. The disc spins up but does nothing. Odd. Maybe I
can just install Windows on my USB key or swap partition so I don't have
to install over Ubuntu and have to do that all over again. Except the
Windows CD does exactly the same thing.

Well now what do I do? I want to use Ubuntu, but in order to do so I
need to update the BIOS. To update the BIOS I need to at least run
Windows, which I can't do. So even if I threw up my arms in defeat and
said "whatever I'll just use Windows", I can't install it.

Luckily, a few others at the office had this computer, so I borrowed a
hard drive from them (which, scoring brownie points for Dell, pop out of
the case very easily), put it in mine, booted, flashed the BIOS, and
went along my merry way. Then I just had to play with the boot options
(using noapic on top of the defaults) and it seems to work.

And you know the best part of this whole thing? The computer doesn't
have any PS/2 ports, so I couldn't even plug in a non-USB mouse to use
while my USB ones broke. **sigh**

Yay me, boo Dell.

--- 
id: 346
author: Daniel Huckstep
title: Slow And Expensive Please
category: software
description: CloudBerry Explorer has a really weird option.
published: true
publishedon: 11 May 2009 17:30 MDT
slugs: 
- slow-and-expensive-please
tags: 
- amazon
- s3
images: 
  cloudberry_explorer: 
    medium: http://cdn.verboselogging.com/transloadit/medium/77/7a423675607ce86b70c3f63d72f2bf/cloudberry-explorer.png
    small: http://cdn.verboselogging.com/transloadit/small/4c/01fa3a03c9ca3daf45e6f3db338550/cloudberry-explorer.png
    large: http://cdn.verboselogging.com/transloadit/large/5d/2a6a8fb5b7019f193cbb6d434a6495/cloudberry-explorer.png
    original: http://cdn.verboselogging.com/transloadit/original/00/3fd0822bda8ac0b0dd04846d473408/cloudberry-explorer.png
---
I was looking around for an Amazon S3 browser and cam across [digital inspiration](http://www.labnol.org/software/amazon-s3-client-for-windows-free/5431/) talking about CloudBerry Explorer. The first thing that caught my eye was this screenshot.

<img src="{{.cloudberry_explorer.large}}" class="large" />

If you read around it, you can see you have two options of moving files between S3 instances. While options are nice, I'm not sure why anybody in their right mind would want to select the slow and expensive way. If you move between S3 instances on S3, it costs zero dollars. If you do it the old fashioned way, of downloading and then uploading to the new instance, it costs bandwidth both ways, as well as the costs to hit the files (although this is minor).

Maybe somebody can enlighten me, but I see no reason to use the second option there, and hence wonder why it's an option at all.

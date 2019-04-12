---
title: What is Purr?
layout: article
group: blog
snip: >
  A very short introduction to Purr. Learn about its goals, and how it plans to achieve them.
---

For the past 5 years i've been thinking about, and experimenting with, ways in which programming could be better. Although I did not have a clear direction for most of that time, I believe I have a good idea of what "better" means to me now, and that's what this research blog will be about.


<h2>Table of Contents</h2>

  * TOC
{:toc}


## What is Purr?

Purr is a new programming environment for collaborative programming. In other words, the primary goal of Purr is to support the idea of programs that are built by many people, concurrently. Purr also extends the notion of collaboration to computers, so they become active agents in the process of programming, being able to answer questions and offer suggestions.

The environment also takes into account that programming (and other human activities) is increasingly done in a distributed way. People don't need to be in the same building to collaborate anymore. We can use tools like instant messaging, video conferences, and even edit documents together in real-time. The range of ways we can interact with each other and collaborate on a project has grown significantly in the last 70 years.

But, when you compare programming with other human activities, there are some very particular issues that we shouldn't ignore. One of them is that most of the collaborative work in programming is *not coordinated*. We develop independent components, and we're expected to put them together into some working program, and make sure that program continues working despite its components changing under you all the time.

Purr's primary goal is to make software engineering reasonable under these circumstances. To allow components to be written and evolved independently, but still combined in several different contexts (many of which the original developers didn't intend for) without issues. To support software that relies on the work of many different people, some of which you may not fully trust with your data. These problems currently underlie every mainstream programming tool, and sometimes it's a wonder that things work at all. [Particularly with respect to security and privacy](https://www.hillelwayne.com/post/stamping-on-eventstream/).

A secondary goal for Purr is to support the idea of computers as personal assistants. This is not a novel idea; you can see a lot of this in the 60s and 70s. For example, Alan Kay suggested something similar with his [Dynabook](https://www.mprove.de/visionreality/media/kay72.html) idea. It also shows up in a lot of places today—Siri and Cortana might the most popular examples—, but not much in programming. Programmers mostly just get the computer to tell them "I'm sorry Dave, I'm afraid I can't do that.", over and over and over again.

![A screenshot of an inscrutable type error message in Haskell](/media/files/2019-04-computer-says-no.png)
*An inscrutable type error message in Haskell*
{: .centred-image .border-on-image }


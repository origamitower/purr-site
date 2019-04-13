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


## Why do we need collaboration in software?

Imagine that you're writing a big application for helping writers bring their creations to life. Of course, a big part of this application is an editor where writers will be able to type their drafts and edit the novel. But they also must be able to keep track of characters, locations, events, etc.

You predict that your application will require many different screens, with buttons, images, text fields, etc. Most of what your application *needs* is not really related to the core value you're providing to your users. A text field isn't that much different in a writer application compared to any other application. If you had to write everything from scratch, you'd never ship anything. With that in mind, you add some GUI libraries to your project in order to focus on the important bits.

### The problem of extending components

Four months into development, things are going really well, and you have a working prototype of your project. But there's a problem: the rich text editor that you're using doesn't allow annotations to be attached to slices of text. One of the primary values your software should deliver is allowing writers to collaborate with others and quickly access reference information. For now you're putting this information in a side-bar, but users are getting confused by it—it's not a very good user experience.

Because you've only realised this late in the project, you have a few choices:

  1. Pick a different GUI library that would allow this, which requires throwing your 4 months of work away;
  2. Write your own rich text editor component, and figure out how to make it work with the rest of the GUI library;
  3. Extend the rich text editor component to do what you need;
  4. Fork the library and build the functionality you need on top;

(1) is clearly a bad choice: at that point your project may just as well be dead. That leaves us with (2) and (3).

Object-Oriented design promises you (3), but that only works if the components were designed for extension, which is often not the case. And mainstream languages supporting this kind of OOP design will generally not guide you towards designing-for-extension. For example, [in Java state is accessed directly by the methods, which makes most changes impractical](https://www.quora.com/In-object-oriented-programming-why-is-it-bad-practice-to-make-data-members-public-when-the-get-set-public-members-modify-it-anyway/answer/Quildreen-Motta).

(2) is trickier. In a sense, parts of the component may be available for you to use (through composition), but there's no guarantee that your component will be accepted by the library. If the library uses a closed set of types, like FRP might, then you're out of luck. It also puts on you the burden of re-implementing any new feature the GUI library adds, which you'd get for free with option (3).

(4) always works, as long as you have access to the source code, but it also requires taking over maintenance for the library, and that's a significant commitment. Particularly so because the original library will continue to evolve.

We can't really assume that components will always be designed for extensibility. The library authors most likely don't know that you're going to use their library. Your use case might never have crossed their minds, even if what they've implemented is *close enough* to what you wanted. And the library authors have other consumers, so they can't really change the library to suit you—and you alone.

So we need a system that allows extensibility *despite* people not designing for it, or coordinating their changes with all consumers. 


### The problem of combining components

Let's say you're lucky in this case that the library designers defined extension points that work for your use case. You extend their rich text editor component and continue on with your life. Now you're at a point where your beta users are finding a lot of errors that should've been fixed in each new version. That's making your software seem unreliable, and your users are getting more frustrated by the day. You decide to finally invest a bit in automated tests.


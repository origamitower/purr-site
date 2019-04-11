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


## The history so far...

Over the last 70 years programming has changed significantly. Largely because, as our computing capacity grew, we started tackling more and more complex problems. Unlike the 50s, computers now support very complex systems—we can store large amounts of information in tiny spaces, and process them quickly. Unlike the 70s, we're not limited to text interfaces—we can present rich information to the user, and allow equally rich, precise input through touch or motion. And very unlike the 90s, we're not limited to a few well-known computers in networked systems—our distributed systems today span many different devices and virtual machines, which may very well not be entirely under our control.

Programming has changed significantly, yet programming tools haven't kept up with the trend. Particularly if you look at the mainstream options. Our primary tools for tackling these problems are programming languages, and most ideas (even in the most progressive ones) are over 40 years old. Tools to support them don't fare much better, being largely limited to terminal emulators, as if we were forever stuck in the 70s.

There's still another aspect of computing that has changed significantly while our tools lagged behind: collaboration. In the past, it wasn't so outlandish to think of programming projects as the act of a single programmer—or a small team of programmers collaborating with each other. That was the common case. Today it's just unthinkable. We collaborate with people all across the world, with pieces evolving independently by different teams. Often they don't even coordinate with each other, and even more often they have several different consumers.

Not only is the size of collaboration a problem, the people collaborating are not an homogeneous bunch either. They speak different languages. They have different cultures, backgrounds, abilities, experiences, and expectations. They use different tools and devices. Every part of this affects the software they produce, and consequently the software that consumes that.

The current computing landscape is largely distributed (even if you look at a single computer!), heterogeneous, and allows rich input and output of information, where programs are written by diverse people. Yet, our tools still treat it as monolithic, homogeneous computing devices with limited ways of inputing and outputting information, programmed by one person, or a small team of people, all using the same tools.

Yet, despite all of this, people still manage to get things done. There are some pretty valuable lessons on human adaptation here that we should study more, but that's not what Purr is about. Purr is about how we can do better at these problems, while looking for inspiration *outside* of computer science—mostly at humanities. The rest of this article will look at *how* Purr does better at them.


## Not a programming language

Purr is not a programming language—in the same sense that Self and Smalltalk aren't. It does *contain* one (or several), as we need languages to communicate, but what Purr proposes is a little broader. Purr is a system for collaboration in computing. Collaboration here means:

  - **with the computer**: Purr is a system that lets the computer collaborate with you in computations. You can ask the computer questions, and you can develop things *together* with the computer. Programming should feel more like a casual conversation with the computer than computers yelling "NO" (in red letters) at you;

  - **with other people**: Purr should support people working in real-time together in a problem, as well as working asynchronously in a problem while preserving their intentions and guiding them through ambiguities. Purr also needs to support uncoordinated collaboration with parties that have varying trust levels.

  - **with other tools**: Not every program is going to be written in Purr, but they may still need to interact with programs written in Purr. For this Purr must support safe local interoperability (FFI), and external interoperability (through protocols and serialisation).

While collaboration is the primary goal, the concept is broad enough to encompass many of the desirable goals other systems might aim for: teaching programming, distributed computing, secure programming, live and literate programming, etc. We'll see more about these in future articles.


## The Core computational model

Programming models are the primary way in which we communicate with the computer and with others. And there are problems that must absolutely be solved at this level. A computational model should support the things we want to talk about, and it should support the tools we want to use.

For our purposes, Core must support:

  - **A way to talk about data**: Data is the most important aspect of programming, but a lot of the *human* aspects of data aren't captured in programming languages. Data does not have a fixed shape, but evolves over time. Pieces of data have different amounts of privacy concerns. And we may want to share some pieces of data (but not others) with certain people. We *should* be able to talk about all of these within our computational model.

  - **A way to collaborate in uncoordinated ways**: Coordinated collaboration is not as difficult, particularly if everyone can change the same codebase. But that's not the common case. A model that supports uncoordinated collaboration needs to allow people to incorporate someone else's work and adapt it to their context *without* modifying it directly—because it will evolve concurrently. This is a more general form of the problem Wadler called the [Expression Problem](https://homepages.inf.ed.ac.uk/wadler/papers/expression/expression.txt).

  - **A way to collaborate with varying levels of trust**: We don't know everyone we collaborate with, and we don't know if we should trust them. Even if we don't trust someone's work, we may still need to include it in our program to go on with our lives. These are ever-evolving pieces of work, so [it's not economical to audit it](https://www.hillelwayne.com/post/stamping-on-eventstream/). So, instead, Core should allow people to talk about how much we trust or not something. That way we can mitigate problems by just not giving too much power to someone we don't trust.

  - **A way to collaborate with computers to understand programs**: Large parts of our current research in "letting the computer help us" are in static analysis. The computer analyses a piece of code and gives you a detailed report about something (e.g.: "is my program consistent?"). We don't have much for helping people visualise their program's execution, although real-time feedback on programs is a very old concept.





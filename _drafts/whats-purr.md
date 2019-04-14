---
title: What is Purr?
layout: article
group: blog
snip: >
  A short introduction to Purr. Learn about its goals, and how it plans to achieve them.
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

Let's say you're lucky in this case that the library designers defined extension points that work for your use case. You extend their rich text editor component and continue on with your life. Now you're at a point where your beta users are finding a lot of errors that should've been fixed in each new version. That's making your software seem unreliable, and your users are getting more frustrated by the day.

You decide that it's time to finally invest a bit in automated tests.

The testing libraries you can find are simple enough. They'll often have a `equals` operation that compares if some value looks like what you expected it to be. There's only one problem. The definition of "equality" is baked within that operation, and it doesn't mean what you want it to mean—for simple values, like numbers, it tests if they're the same numeric value, so `equals(1, 1)` succeeds regardless of where the 1s are coming from. But for more complex values, like a list of text slices, `equals(a, b)` succeeds if both `a` and `b` *point to the same position in memory*.

Testing memory positions doesn't help you. You want to know if, after some operations, the list of text slices looks like what you expect. The "what you expect" part will never be in the same memory position as the actual text slices, because they're coming from different sources—one is you, the other is "whatever is the current state of the rich text editor".

After enough questioning of why a testing library would do this, you set out to write your own. You'd have to, anyway, so might just as well fix what you dislike about this one and release it to the world, so they can benefit of a clearly better project.

So, the first thing is to question yourself: how do I make the testing library support any user-defined type? Some of the answers may be:

  1. "Define an interface that must be implemented." — For example, the objects must provide a `.equals(that)` method which your library then may use.

  2. "Define a type class/protocol that must be implemented." — This is like (1), but the method may be implemented outside of the object's source code, by a different author.

  3. "Use a form of open multiple dispatch." — For example, users would write functions like `define equals(left: RichText, right: RichText) { ... }` and `define equals(left: Number, right: Number) { ... }`, and the library would pick the definition that matches the provided requirements in the signature.

  4. "Define a parametric module that accepts a concept of equality." — For example, a module `class Test(equality: Equality) { ... }` would be instantiated with an object that defines the idea of equality for all objects the program cares about.

(1) is the general approach in object-oriented programs, like Java, JavaScript, Python, Ruby, etc. There's an interface that objects must implement in order to be used in some particular context. But there are two problems with this. The first one is that objects *must* be aware of all contexts in which they may be used, a priori. This is difficult when there's no coordination between the authors of each component. The [Wrapper pattern](https://en.wikipedia.org/wiki/Adapter_pattern) (and things like [Object Algebras](http://www.cs.utexas.edu/~wcook/Drafts/2012/ecoop2012.pdf)) may be used to mitigate this, but it requires applying the wrapper to every object you will use in the context, which is not practical (or efficient). The second one is that an implementation is restricted to a single context—barring the use of wrappers.

(2) is the general approach in modern functional languages, like Scala, Haskell, Clojure, Elixir, etc. Like in (1), there's an interface that must be implemented for the object so it can be used in some particular context. The difference is that this implementation can be done *outside* of the object's source code, by a different author. This removes the problem of objects needing to know all contexts they may be used in a priori—users can just provide the implementation for the object in their own program code. However, this approach still suffers from the second problem—your implementation is restricted to a single context. It also introduces a new problem: if two independent authors provide an implementation of the interface for the same object, they'll conflict, and there'll be usually no tool for resolving this conflict. In other words, the components become fundamentally incompatible.

(3) is much like (2), but resolves a problem with the previous approaches. In both (1) and (2), something like `equals(a, b)` only takes into consideration `a` to select an operation to execute. So if you want to support `equals("1", 1)` and `equals("1", "1")` you need to add that logic in a single function, using common branching operators (like `if/else`). In cases where you may want other authors to be able to add new operations for different combinations of types, that requirement doesn't work. Multiple dispatch just extends the selection to work on any number of parameters. So one could define a `equals(String, Number)` function and an `equals(String, String)` function, and the right one would be selected based on the actual types at runtime.

This approach still suffers from all the other problems (2) does, however.

(4) is a very different approach. Instead of attaching these capabilities to particular objects, you let users provide their own notions of something to the library. Say you need to work with different types of numbers, and for some of them you want equality to be relaxed (but only for testing), as they're not very precise. In this case you could just instantiate a testing library with a definition of equality for each type of number, like in `new Testing({ equals(a, b) { ... } })`. This way you still have control over certain aspects of the library, and you don't have to commit to a single implementation context.

The obvious drawback is that this approach requires much more work: it's harder to crowd-source implementations, you're expected to write a new function for each case. [There are some ways of reducing the amount of configuration work](https://people.mpi-sws.org/~dreyer/papers/mtc/main-long.pdf), but they're still less practical than previous approaches. A more subtle drawback is that this leads to [global incoherence](http://blog.ezyang.com/2014/07/type-classes-confluence-coherence-global-uniqueness/)—it's not easy to know if two uses of the module in your program will have *the same behaviour*, because they may have been configured differently.

None of the options is perfect. Today you just pick your tradeoff (well, generally your programming languages picks your tradeoff for you) and roll with it. We need a system that allows components to combined and adapted to any context, *regardless* of whether authors intended/predicted those uses or not. Again, we cannot expect authors to coordinate the development of each component.


### The problem of trusting components

As the development progresses you're constantly dealing with a very important choice: should you implement a particular feature yourself, or should you to the project a library that provides such feature?

These days I believe that most people would choose the latter in a heartbeat. But there are some interesting tradeoffs to consider. On one hand, by using an existing library you can focus your energy elsewhere to provide more value for your users. On the other hand, you have to worry about the library's quality, if it's well tested, if it'll work well with your code, if you can count on the authors to continue maintaining it, whether the authors aren't out to attack your computer, etc.

Most of these questions are social problems. Our programming languages and tools aren't designed to deal with them. For example, there's no way in most languages to tell the system that you don't want some particular library to access your file system. Instead, we expect people to investigate everything about the authors of the libraries they plan to use, and audit every single line of code. And then we blame them for not properly auditing things when things naturally fail.

Because languages lack any feature to address these social problems, you get programming communities claiming that you should always keep the libraries you use to a minimum, that none of them should have any dependencies, and that they should be backed by giant corporations that will guarantee that you can trust in them. On the other side you have programming communities claiming that every dependency should be tiny so you can reasonably audit them.

It goes without saying that both are constant targets of actual software attacks, and neither are a reasonable proposal to mitigate this problem.

We then have the issue of privacy. If you're lucky, your programming language notion of privacy is an access modifier (like "private") that you tack on some variable to reduce the scope in which it can be accessed. This is largely useless. When we think about privacy, we also have to consider how information may leak, and we must consider that in some circumstances we *want* to disclose part of the information to a particular someone—but no one else. Access modifiers help with none of these, but give programmers a misguided notion of privacy.

Finally we have known attacks like [Spectre](https://meltdownattack.com/) and [JIT Spraying](https://en.wikipedia.org/wiki/JIT_spraying), which make any library you add especially dangerous. While some of these attacks will require questionable pieces of code that would certainly make people raise an eyebrow reading it, we'd still need to audit every single piece of code we use. Having to very carefully read millions of lines of code, over and over again, each month is simply not a reasonable expectation. Nobody would ever get anything done.

So we need programming language and tools that are designed *for* these social problems. We should be able to define precise privacy policies, and check for leaks and violations. We should be able to restrict what particular pieces of code may do in order to mitigate potential attacks. Down to how these pieces of code *run* and how much space they can use, because Spectre has taught us that even without access to any powerful object (e.g.: access to the filesystem) a piece of code may still read arbitrary memory from the process.


### The problem of evolving components

We've touched this a few times earlier, but one of the major problems in modern programming is "concurrent evolution". That is, we understand that pretty much any big project we work on will require using components that were written by other people. We may even think of these components as "building blocks", but that invites a comparison with the physical world that isn't very accurate.

For example, people can build complex structures out of LEGO. Lego blocks can be combined, and these combined blocks can be further combined. These complex structures may even be created by groups of people, modularly. Because of this, many people think of software components as LEGO blocks. But, for LEGO, we have very restricted ways in which blocks may be combined, and group efforts must be coordinated.

In software, we have components that may be combined in multitude of ways, most not predicted or endorsed by the original authors. The components are often written by different people, at different places and time. There's little coordination in these efforts. And coordination would be difficult, since the same component may be consumed in different ways by different users.

But we can still work around those problems in one way or another. The major difference is that software components are always changing, even if we don't do anything. Imagine that you're building a huge structure out of LEGO blocks, and you've spent the past 4 months working on it. Everything is going smoothly, but all of a sudden blocks in the middle of your structure start shape-shifting! Not only that, they also start devouring neighbouring blocks. Your entire structure crumbles, and you cry yourself to sleep.

This is what software engineering feels like most of the time. Components may change at any point in time, and this is entirely outside of your control. There are no guarantees that the changes will be compatible with your other components—incompatibility problems are very common, in fact.

Besides components changing, software needs to deal with another constantly changing thing: data. In its most basic definition, software serves the processing of data. But data is not a static entity. We don't build data, freeze it, and say "yay, we're done!". Instead, data evolves with people, responds to changes, new information is accumulated while old information is thrown away. Data changes shape as needed, both for humans and computers.

Yet, most mainstream languages treat data as a static, never-changing aspect of software. Any changes to data structures require significant re-engineering, which is particularly troublesome in systems that must stay up all the time—like web services.

Languages also preclude the possibility of data having many shapes *at the same time*. Operations are required to choose a single shape and work with it, which makes distributed systems and upgrades a trickier business than it needs to be. Every engineer have to solve the problem of consistency between different versions of the application over and over again, for each new application.

A big part of this problem is with our choice of technologies. Instead of pretending that the world is simple, sequential, static, and consistent, we *could* embrace its complexity, concurrent, dynamic, and inconsistent nature. We could build tools that support the natural evolution of data and computing systems.



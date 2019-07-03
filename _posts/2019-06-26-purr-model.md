---
title: The Purr Model
layout: article
group: blog
snip: >
  A technical overview of the Purr language and its semantics. 
---

Purr's programming model is influenced by both functional programming and object-oriented programming—as well as some less-known programming models. The core of the language isn't too far from what functional programmers are familiar with, but the way Purr handles extensions might feel a bit different for both functional and object-oriented programmers.


## Purr's Core Model: Olivia

Olivia is the name of the core language used by Purr. It has a very specific design goal: to support live programming—hence Olivia. As we'll see, there are not many changes that are needed to go from functional programming to a live programming-optimised model. But to understand what's problematic with existing languages we'll look at a few simple examples.

Consider a program like the following, in a ML-like language:

```
data Period = Morning | Afternoon | Evening

period : Time -> Period
period time =
  if time < 12 then Morning
  else if time < 18 then Afternoon
  else Evening

greet : string -> ()
greet name =
  let now = clock.now ()
  match day_period now with
  | Morning    => show "Good morning, " ++ name
  | Afternoon  => show "Good day, " ++ name
  | Evening    => show "Good evening, " ++ name
```

When `greet` is called with a `name`, we expect it to show a greeting. However, if we call `greet "Alissa"` twice, there's no guarantee that it'll show us the same greeting. Although this is not reflected in the types, the greeting we get back depends on a concept of "current time", which should be provided by a clock.

But another interesting aspect of `greet` is that, despite its return type saying that nothing is produced by the function, it *still* produces something. The `show` function displays a greeting somewhere, somehow.

So, in order for `greet` to work it *needs* both some kind of Clock, and a way of displaying text. And it uses these things to be able to *produce* displaying text in some fashion. Reasoning about such function is difficult because neither these requirements nor consequences are reified in the types.

> **tangent**: Petricek's work on [Co-effects](http://tomasp.net/coeffects/) aims to explore more of the reasoning about what functions *require* from outside. Whereas work on [Effect systems](https://github.com/yallop/effects-bibliography) aims to explore more of the reasoning about *consequences* to the outside world when executing a function, too.


### Effects, Co-Effects, and Live-Programming

But it isn't *just* reasoning that is impaired by this. If we want to write tests for this function, it isn't immediately obvious how we should do it. After all, we may control neither the Clock nor the Display. And thus we have no way of predicting the behaviour of a `greet` call, nor verify what it produces.

Live programming inherits many of the same problems that testing faces—and brings a few more of its own. When we live program, we're *constantly* running the program as it is modified, and showing the results of each modification in, hopefully, real time.

Time is an immediate concern here. If we're constantly running the program, then we *must* be able to provide feedback in a reasonable amount of time. We also must keep things *feeling* responsive. This way, computations are both expected to be finished quickly, and they mustn't hog system resources.

Another immediate concern is being able to control and reproduce executions. This is troublesome with resources that may be used or consumed a limited number of times. For example, if a program is making a request that requires a one-time password, then changing the program and re-running it is decidedly going to fail.

In a live-programming environment the user *is not* in control of when their program runs, so results may range from annoying failures to catastrophic events—for example, removing several important files from the hard disk while the programmer is in the middle of inputting a filter pattern for the ones to delete.

Pure functions are easy to work with in a live-programming environment. But [a programming environment that only allows pure functions is useless](https://www.youtube.com/watch?v=iSmkqocn0oQ), in general. We want people to be able to write useful programs in Purr while *also* being able to develop programs with live-feedback.

This means that, in Purr, these requirements and consequences may vary depending on the context in which the program is being executed as well. When being executed by an end user, we want it to actually delete the files from the hard disk. But when it's being developed in the programming environment we only want to *simulate* the execution, so we can see what the results will be without actually doing any destructive or time-consuming action—a "dry run" execution, if you will.


## Olivia's Semantics

Olivia is very similar to an ML-language (with an added effect handler system) at the expression level, but very different at higher levels. 



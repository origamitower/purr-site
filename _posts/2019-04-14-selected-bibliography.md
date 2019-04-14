---
title: Selected Bibliography
layout: article
group: blog
snip: >
  A short list of the articles, talks, and projects that have influenced Purr's design the most.
---

This list will be revised from time to time.


<h2>Table of Contents</h2>
  * TOC
{:toc}


## Articles

### Security & Privacy

[Robust Composition: Towards a Unified Approach to Access Control and Concurrency Control](http://www.erights.org/talks/thesis/)
: *(Mark S. Miller, 2006)*   
  Miller's dissertation discusses object-capability security in the context of the distributed language E.


[A Theory of Information-Flow Labels](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.261.451&rep=rep1&type=pdf)
: *(Montagu, Pierce, Pollack, and Surée, 2012)*   
  Montagu et al's work lays out a founding theory capturing most of the work on information flow labels.


[A Decentralized Model for Information Flow Control](http://www.cs.cornell.edu/andru/papers/iflow-sosp97/paper.html)
: *(Andrew C. Myers and Barbara Liskov, 1997)*   
  Myers and Liskov describe a system for statically checking information flow labels in a system with decentralised authority.


[Spectre is Here to Stay: An Analysis of Side-Channels and Speculative Execution](https://arxiv.org/pdf/1902.05178.pdf)
: *(Mcilroy, Sevcik, Tebbi, Titzer, and Verwaest, 2019)*   
  Google security researchers' paper explain why software mitigations aren't enough to protect against Spectre attacks. The implications on language design are quite huge.


### Model & Execution

[An Introduction to Algebraic Effects and Handlers](http://www.eff-lang.org/handlers-tutorial.pdf)
: *(Matija Pretnar, 2015)*   
  A tutorial on algebraic effects, as implemented in Eff. Matija's thesis is more mathematically rigorous on the theory of effect handlers, but I have not had the time to read it yet.

[Do Be Do Be Do](https://arxiv.org/abs/1611.09259)
: *(Lindley, McBride, and McLaughlin, 2016)*   
  Frank introduces ideas of inferring and propagating effects through an effect system, and uses one-shot continuations for its effects.

[Yield: Mainstream Delimited Continuations](https://www.cs.indiana.edu/~sabry/papers/yield.pdf)
: *(Roshan P. James and Amr Sabry, 2011)*   
  James and Sabry's paper shows how the yield construct present in a lot of mainstream languages is equivalent to one-shot delimited continuations. This is the basis for Purr's implementation of effect handlers in JavaScript.

[Predicate Dispatching: A Unified Theory of Dispatch](https://homes.cs.washington.edu/~mernst/pubs/dispatching-ecoop98.pdf)
: *(Ernst, Kaplan, and Chambers, 1998)*   
  The paper shows how previous formulations of multi-methods can be generalised into a theory of predicate dispatching, and how this may be implemented efficiently.

[Korz: Simple, Symmetric, Subjective, Context-Oriented Programming](https://dl.acm.org/citation.cfm?id=2661147)
: *(Ungar, Ossher, and Kimelman, 2014)*   
  Korz proposes a model based entirely on multi-methods where dispatch is subjective to a notion of context (threaded dynamically through the call stack). Much of the work in Siren and Purr is based on this and the early work in Us. (Note that this isn't an open access article, sadly)

[Matching Objects With Patterns](https://infoscience.epfl.ch/record/98468/files/MatchingObjectsWithPatterns-TR.pdf)
: *(Emir, Odersky, and Williams, 2006)*   
  Emir et al's paper introduces the notion of Extractors, which Purr uses as a foundation for pattern matching supporting capability security and user-defined privacy rules.


### Distributed Systems

[Making Reliable Distributed Systems in the Presence of Software Errors](http://erlang.org/download/armstrong_thesis_2003.pdf)
: *(Joe Armstrong, 2003)*   
  Erlang's design around actors and supervisors for reliable distributed systems is a big influence in Purr's own idea of actors.


### Modules

[F-ing Modules](https://people.mpi-sws.org/~rossberg/f-ing/)
: *(Rossberg, Russo, and Dreyer, 2010)*   
  Rossberg et al's work provides an unifying theory for ML-like modules.


[Modules Divided: Interface and Implement](https://awelonblue.wordpress.com/2011/10/03/modules-divided-interface-and-implement/)
: *(David Barbour, 2011 — a blog post)*   
  While not being rigorous or very specific, Barbour's idea in this article is a huge influence on Purr's module system.


### Contracts & Types

[Contracts for Higher-Order Functions](http://users.cs.northwestern.edu/~robby/pubs/papers/ho-contracts-techreport.pdf)
: *(Robert B. Findler and Matthias Felleisen, 2002)*    
  Findler and Felleisen work describes a contract system that assigns correct blame in a language that supports higher-order functions. It provides some of the power of dependent types without the complexities of proofs.


## Influential Technology

[Glamorous Toolkit](https://gtoolkit.com/)
: The idea of "moldable development" is similar to Purr's idea of lenses.

[Cap'n Proto](https://capnproto.org/)
: A serialisation and RPC format that supports capability security and is designed with data evolution in mind.

[Hazel](http://hazel.org/)
: A functional language with a gradual type system and principled support for live programming.

[Clojure](https://clojure.org/)
: A practical Lisp dialect, incorporating many ideas from functional programming and other paradigms in an accessible way.

[Newspeak](http://newspeaklanguage.org/)
: A Smalltalk dialect with optional types (and pluggable checkers), capability-secure modules, and focus on live/literate programming.


## Influential talks

[Maybe not](https://www.youtube.com/watch?v=YR5WdGrpoug)
: *(Rich Hickey, 2018)*   
  Discusses how evolution is important for data, and how constraints make more sense at the use site than the definition site.

[Programming by Sketching](https://www.youtube.com/watch?v=e1CGCQbpA6M)
: *(Ras Bodik, 2009)*   
  Shows how program synthesis could be used to help programmers design complex algorithms, letting them provide a rough/partial definition and let the compiler fill in the rest.

[Towards "annex", a Fact Based Dependency System](https://www.youtube.com/watch?v=JjYAnBhF2JU)
: *(Mark Hibberd, 2014)*   
  The idea of attaching facts (metadata) to entities from anywhere, and using constraints to piece them together is the basis for Purr's module system *and* dispatch system.

[Towards Language Support for Distributed Systems](https://www.youtube.com/watch?v=IeBbiQZYmuY)
: *(Heather Miller, 2018)*   
  A good discussion of the evolution and ideas in distributed languages over the years.

[Security for Humans: Privacy and Coercion Resistant Design](https://www.youtube.com/watch?v=k4ypqzOShZs)
: *(Morgan Marquis-Boire, 2015)*   
  Discusses the issues of privacy in software, coercion in the real world, and trade-offs in attacks.

[How Does Code Sound?](https://www.youtube.com/watch?v=--R-DVJrA6A)
: *(Felienne Hermans, 2018)*   
  Discusses the issues of *reading* code and the impact of this in teaching and comprehension, particularly with people who don't speak English and people who need assistive technologies.

[Confidence, Trust, and Certainty for Collaboration Between Humans and Automated Systems](https://www.youtube.com/watch?v=XTZsj6PDc8A)
: *(Peter Norvig, 2017)*   
  Discusses the challenges of AI-based systems in how humans can have confidence that they're going to do what they expect.


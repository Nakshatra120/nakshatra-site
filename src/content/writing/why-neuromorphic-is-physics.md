---
title: 'Why neuromorphic computing is a physics problem'
summary: 'A short argument that the hard part of brain-inspired computing isn\u2019t the algorithms — it\u2019s the physics of the devices you run them on.'
date: 2026-05-28
tags: ['neuromorphic', 'physics', 'essay']
draft: false
---

> ⚠️ Placeholder voice — rewrite this entirely in your own words before you
> publish. The whole value of a writing section is that it sounds like *you*
> thinking, not like a generated explainer. Use this only as a skeleton to push
> against. Delete this blockquote when you're done.

Most of the public conversation about brain-inspired computing happens at the
level of algorithms: spiking neurons, learning rules, network architectures. I
think that framing buries the actually-hard and actually-interesting part, which
is physical.

A spiking neuron is cheap to *describe* and expensive to *build* well. The
promise of neuromorphic computing — orders-of-magnitude better energy efficiency
than running the same computation on a GPU — doesn't come from the math. It
comes from letting a physical device's own dynamics *be* the computation,
instead of simulating those dynamics in software on hardware that fights them.

That's the move I find compelling: a spin-torque oscillator doesn't *model* an
oscillating neuron, it *is* one. The physics does the work for free.

(From here, make this yours. A few threads worth pulling: where the energy
actually goes in a conventional SNN simulation; why device variability is a
feature, not only a bug; what "criticality" buys you and what it costs to
maintain; and the honest limits — what this approach can't yet do.)

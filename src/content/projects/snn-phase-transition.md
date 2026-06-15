---
title: 'Phase transitions in a spiking neural network'
summary: 'A from-scratch LIF network that goes critical — visualizing how a recurrent spiking network shifts between quiescent, asynchronous, and synchronous regimes as you sweep a single coupling parameter.'
date: 2026-05-20
tags: ['SNN', 'criticality', 'NumPy', 'visualization']
status: 'shipped'
links:
  code: 'https://github.com/your-handle/snn-phase-transition'
draft: false
---

> This is a seed writeup so the page isn't empty. Keep the structure — hook,
> approach, what broke, results, links — but replace the prose with your own
> account of what you actually did. The build log in your own voice is the point.

## What & why

A spiking neural network isn't one thing — it's a system with regimes. Drive
the recurrent coupling too weakly and nothing propagates; drive it too hard and
the whole population locks into runaway synchrony. Somewhere in between sits a
narrow band where activity is self-sustaining but irregular — the regime where
real cortex seems to live, and the one people mean when they say a network is
"critical."

I wanted to *see* that transition rather than read about it, so I built a
recurrent network of leaky integrate-and-fire neurons from scratch and swept the
one parameter that controls it.

## Approach

The network is a population of leaky integrate-and-fire (LIF) neurons with
sparse recurrent connectivity, in the spirit of the Brunel (2000) balanced
network. Each neuron integrates incoming current, leaks toward rest, and fires
when it crosses threshold, after which it resets. The control knob is the
relative strength of recurrent coupling.

The whole thing is plain NumPy and SciPy — no framework — precisely because I
wanted to feel every part of the loop:

```python
# membrane update, vectorized across the population
v += dt * (-(v - v_rest) / tau_m + I_syn / C_m)
spiked = v >= v_thresh
v[spiked] = v_reset
```

I logged spike times for the whole population and then swept the coupling
parameter, rendering a raster plot and the population firing rate at each value.

## What broke

- **Silent runaway.** Past a coupling threshold the network would saturate and
  I'd get a wall of spikes that told me nothing. The fix was less about code
  than about realizing the interesting physics lives in a *narrow* parameter
  band — so the sweep needed fine resolution there and coarse resolution
  everywhere else.
- **Timestep artifacts.** Too large a `dt` produced fake synchrony. Worth
  remembering that the dynamics you observe can be an artifact of the
  integrator, not the model.

## Results

Sweeping coupling walks the network through three regimes — quiescent →
asynchronous-irregular → synchronous-regular — and the transition between them
is sharp enough to look like a genuine phase transition. The asynchronous
regime is the visually busy, structurally rich one, and it's a small target.

The takeaway I keep: criticality isn't a setting you dial to, it's a knife-edge
you have to actively sit on — which is suggestive for why efficient neuromorphic
hardware is hard to keep in the useful regime.

## Links

Code is linked above. Next step is to quantify the transition properly (e.g.
avalanche-size distributions) rather than eyeballing the rasters.

# Personal site

A fast, content-first personal site built with [Astro](https://astro.build).
No CSS framework and almost no client JS — just a tiny accent-color toggle and a
pointer-driven B&W→color photo reveal on the home page — clean HTML/CSS you can
read and own.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the built site
```

Requires Node 18+ (you have 22).

## The architecture (the "IA")

Three content buckets, kept deliberately separate because they signal different
things to different readers, then cross-linked:

| Section      | What lives here                          | Where it's edited                |
|--------------|------------------------------------------|----------------------------------|
| **Research** | Formal, citable work. CV-credible.       | `src/data/research.ts`           |
| **Projects** | Self-directed builds, with writeups.     | `src/content/projects/*.md`      |
| **Writing**  | Essays/notes in your own voice.          | `src/content/writing/*.md`       |

The **home page** is a highlight reel: it pulls featured research + your two
most-recent projects and essays into one "Selected work" feed. The section pages
are the full archives. Every project and essay gets its own URL, so you can
share one specific thing on LinkedIn (that's the reason for multiple pages).

## The design

- **Type pairing:** Newsreader (serif) for prose — the *writer* signal — and
  monospace for every piece of metadata (dates, tags, status) — the *physicist*
  signal that everything quantitative is data.
- **Signature:** the accent color is a *tunable parameter*. The footer swatches
  sweep it; the choice persists in `localStorage`. A damped-oscillation hairline
  under your name on the home page echoes a spin-oscillator ringdown / spike
  train. All the visual boldness is spent in those two places; everything else
  is quiet.
- All colors and fonts are CSS custom properties in `src/styles/global.css`.
  Change `--accent` defaults or add a new preset in one place.

## Add content

**A new project** — create `src/content/projects/my-thing.md`:

```markdown
---
title: 'My thing'
summary: 'One sentence that makes someone want to read on.'
date: 2026-06-15
tags: ['tag-one', 'tag-two']
status: 'shipped'        # optional
links:
  code: 'https://github.com/...'   # all optional
  paper: 'https://...'
  demo: 'https://...'
draft: false             # set true to hide
---

## What & why
...your writeup. Keep the template shape: what & why → approach →
what broke → results → links.
```

**A new essay** — same idea in `src/content/writing/`.

**A new research entry** — add an object to the `RESEARCH` array in
`src/data/research.ts`. Set `featured: true` to surface it on the home feed.

## Make it yours (TODO checklist)

Search the codebase for `TODO` — these are the spots that need real input:

- [ ] `src/consts.ts` — your name, tagline, email, social handles
- [ ] `src/pages/about.astro` — rewrite the bio in your own voice
- [ ] `src/content/writing/why-neuromorphic-is-physics.md` — **rewrite fully**;
      a generated essay defeats the purpose of a writing section
- [ ] `src/content/projects/snn-phase-transition.md` — replace with your real
      build log
- [ ] `src/data/research.ts` — verify descriptions, add paper/code links
- [ ] `astro.config.mjs` — set `site` to your real domain
- [ ] `public/favicon.svg` — swap if you want a different mark

## Deploy (free)

Push to a GitHub repo, then connect it to **Vercel** or **Netlify** — both
auto-detect Astro and redeploy on every push. Point your domain at it. Done.

```bash
git init && git add -A && git commit -m "init"
# create a repo on GitHub, then:
git remote add origin https://github.com/your-handle/your-repo.git
git push -u origin main
```

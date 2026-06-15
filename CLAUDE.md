# CLAUDE.md

Persistent context for this project. Read this fully at the start of every
session before making changes.

## What this is

A personal website for an incoming Physics PhD student working at the
intersection of neuromorphic computing, spintronics/device physics, and the
theoretical physics of learning. It is part portfolio, part writing home, part
research showcase. The owner builds in public and shares individual pieces on
LinkedIn, so shareable per-item URLs matter.

## Stack & commands

- **Astro 5**, no CSS framework. Plain modern CSS with custom properties.
- **Newsreader** (variable serif) self-hosted via `@fontsource-variable`.
- `npm run dev` — dev server at localhost:4321
- `npm run build` — static output to `./dist`
- `npm run preview` — preview the build

## Architecture — three content buckets, kept separate, cross-linked

| Section  | Purpose                                   | Edited in                     |
|----------|-------------------------------------------|-------------------------------|
| Research | Formal, citable work. CV-credible.        | `src/data/research.ts`        |
| Projects | Self-directed builds, with writeups.      | `src/content/projects/*.md`   |
| Writing  | Essays/notes in the owner's own voice.    | `src/content/writing/*.md`    |

The home page (`src/pages/index.astro`) is a highlight reel: featured research +
two most-recent projects + two most-recent essays. Section pages are the full
archives. **Do not merge these buckets** — they signal different things to
different readers. That separation is deliberate.

## Design language (this is the important part — keep it consistent)

The reference point is the structured, low-noise aesthetic of academic personal
sites like fadikurdahi.com: metadata discipline (every datum has a place), a
quiet base with a single user-tunable accent, no decoration that doesn't encode
information. The owner's spin-offs on that idea, which are now the house style:

- **Type pairing carries the identity.** Newsreader serif for all prose (the
  *writer* signal); monospace (`--mono`) for *all* metadata — dates, tags,
  status, eyebrows (the *physicist* signal: everything quantitative is data).
  Sans is UI-only. Don't introduce new typefaces without a reason.
- **Signature, spent in one place:** the accent color is a *tunable parameter*.
  The footer swatches sweep it; it persists in `localStorage`. Plus one motif —
  a damped-oscillation hairline (`Oscillation.astro`) under the name, reading as
  a spin-oscillator ringdown / spike train. Everything else stays quiet.
- **All tokens live in `src/styles/global.css`** (`:root`). Colors and type are
  custom properties; accent presets are `[data-accent="..."]` blocks. Change
  them in one place. Component styles are scoped Astro `<style>` blocks.
- **Principle:** spend boldness in one place; keep everything around it
  disciplined. Minimal direction → precision in spacing, type, and detail.
- Quality floor, always: responsive to mobile, visible keyboard focus
  (`:focus-visible`), `prefers-reduced-motion` respected, semantic HTML.

## Deviations from the house style — welcome when deliberate

The defaults above are the starting point, not a cage. The owner is actively
improving the site and will introduce intentional deviations over time. Honor
them; keep them tasteful, documented here, and true to the spirit ("spend
boldness deliberately; keep the rest quiet").

Logged deviations:
- **Hero portrait (home):** black & white by default, with a pointer-proximity
  color reveal — saturation rises as the cursor nears the image center and hits
  the exact original color dead-center (`src/pages/index.astro`: inline script
  driving a `--reveal` custom property). This intentionally adds a little client
  JS beyond the accent toggle, and the portrait no longer participates in the
  accent sweep. Falls back to a clean B&W still if JS is off.

## Content rules (important)

- **Never ghost-write the owner's essays.** The Writing section's entire value
  is that it sounds like the owner thinking, in their own words. You may help
  with structure, outlining, editing, and titles — but do not generate finished
  essay prose to be published as their authentic voice. Flag placeholder text
  clearly.
- Project writeups may be drafted, but keep the template shape (what & why →
  approach → what broke → results → links) and leave them for the owner to make
  accurate.
- Research descriptions must be factually accurate and modest — no overclaiming
  contributions.

## Conventions

- Keep the codebase legible for an early-career dev — plain CSS over clever
  abstractions, clear names, comments where a decision isn't obvious.
- New content = a new markdown file (projects/writing) or a new object in
  `research.ts`. No CMS.
- Search for `TODO` for the spots that still need the owner's real input.

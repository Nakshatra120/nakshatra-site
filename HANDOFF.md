# HANDOFF

Rolling context log for Claude Code sessions on this repo. **Read this first**
(alongside `CLAUDE.md`) at the start of every session, and **append a new
session entry at the bottom** before you finish. The goal: never lose context
between sessions.

- `CLAUDE.md` = the stable house rules (design language, content rules, IA).
- `HANDOFF.md` = the living history (what's been done, decisions + reasons,
  what went wrong, what's still open). This file.

---

## 1. Current status (as of 2026-06-15)

- **Site builds and runs clean.** `npm run build` → 7 pages. Astro **5.18.2**.
- **Live deploy:** code is pushed to GitHub; Vercel connection was the last step
  (owner doing the browser import). **Confirm the live `*.vercel.app` URL and
  record it here next session.**
- **GitHub repo:** https://github.com/Nakshatra120/nakshatra-site (public, `main`).
- **Local env:** Node v24.7.0, npm 11.7.0, macOS (darwin). `gh` CLI installed
  (v2.94.0), authenticated as **Nakshatra120**.

### Identity / config (in `src/consts.ts`)
- `name`: `'Nakshatra'` — short wordmark (nav brand, footer, SEO titles).
- `fullName`: `'Nakshatra Bansal'` — used **only** on the home hero headline.
- `email`: `nakshatra.bansal@gmail.com`.
- `location`: `'Irvine, CA'`.
- `tagline`: **still the placeholder** (has a `TODO`) — owner to make it theirs.
- `SOCIALS`: GitHub `https://github.com/Nakshatra120`, LinkedIn
  `https://www.linkedin.com/in/nakshatrabansal/`, Email. **Google Scholar was
  removed** (no official publications yet — re-add when there are).

---

## 2. Deployment & infrastructure

- **Hosting:** Vercel (chosen over Cloudflare Pages / Netlify for the simplest
  onboarding and easiest custom-domain setup; owner is buying the domain
  elsewhere so no Cloudflare ecosystem lock-in benefit).
- **Workflow from here on:** every `git push` to `main` auto-redeploys on Vercel.
  Normal loop = edit → commit → push → live in ~1 min. No manual deploy step.
- **Domain plan:** owner will buy **nakshatrabansal.com** in a few days from some
  registrar. To attach: Vercel → Settings → Domains → add domain → follow the DNS
  records it shows. Then also set `site` in `astro.config.mjs` to the real domain.
- **Note on the dev tunnel idea:** we discussed `cloudflared tunnel` for sharing
  before hosting. Decided **against** it — it's a throwaway tool that forwards a
  temp URL to localhost and is *not* a step toward hosting. Deploying to Vercel
  does double duty (shareable now + permanent), so we skipped the tunnel.
- **Local sharing (no hosting):** `npm run dev -- --host` exposes the dev server
  on the LAN (other devices on same Wi-Fi). LAN IP last seen: `10.102.153.1`.

---

## 3. What we did this session (2026-06-15) + why

1. **First run failed → installed deps.** Repo had no `node_modules`; `npm run
   dev` errored with `astro: command not found`. Ran `npm install`.
2. **Security audit cleanup.** `npm audit` showed **3 high** vulnerabilities
   (Astro `define:vars` XSS, Astro Server-Island replay, esbuild RCE + esbuild
   Windows dev-server file read; Vite flagged only because it depends on the
   vulnerable esbuild). Decided **not** to run `npm audit fix --force` (it forces
   Astro 5 → 6, a breaking major). Instead added a **one-line override** in
   `package.json`:
   ```json
   "overrides": { "esbuild": "^0.28.1" }
   ```
   Reinstalled clean → dropped to **1 moderate** (the Astro `define:vars` XSS,
   which this site doesn't use). Reversible. Build still passes all 7 pages.
3. **Identity edits in `src/consts.ts`:** set email; added `fullName` field and
   used it on the hero only (kept `name` as the short wordmark in nav/footer/SEO
   — a compact brand mark reads better there); updated GitHub + LinkedIn URLs;
   removed Google Scholar entirely.
4. **Hero portrait.** Owner provided `linkedin_img.jpeg` (800×800, grad photo).
   Cropped to a 4:5 portrait (640×800, face centered) with `sips` →
   `src/assets/portrait.jpg`. Rendered via Astro's `<Image>` (`astro:assets`) so
   it's auto-optimized to **webp** (~19 KB) with a responsive srcset (256/384/640).
   - **Treatment v1 (duotone):** first built it tinted by `var(--accent)` so the
     photo swept with the footer accent swatches (extends the signature). Owner
     picked this in a comparison.
   - **Treatment v2 (current, by owner request):** changed to **black & white by
     default with a pointer-proximity color reveal** — a small inline script in
     `src/pages/index.astro` measures cursor distance from the image center and
     sets a `--reveal` CSS var (1 dead-center → 0 at corners); the CSS does
     `filter: grayscale(calc(1 - var(--reveal)))`. Full original color when the
     cursor is dead-center, mostly B&W at the edges, smooth via a 0.15s filter
     transition. Falls back to a clean B&W still if JS is off. This dropped the
     accent tint, so the photo no longer participates in the accent sweep.
5. **Documented the deviation.** Added a "Deviations from the house style —
   welcome when deliberate" section to `CLAUDE.md` (the portrait reveal adds a
   little client JS beyond the accent toggle). Owner explicitly said they're open
   to deliberate deviations and there will be more. Updated the README's
   "no client JS" line to stay accurate.
6. **Deploy prep + push.** `git init` (was not a repo), `.gitignore` already
   good (added `linkedin_img.jpeg` to keep the raw source out of the repo — the
   cropped asset is what's used). First commit message: owner wanted it
   **minimalist** → just `Initial commit` (no body, no co-author trailer, since
   descriptive details can change). Installed `gh`, owner authenticated, then
   `gh repo create nakshatra-site --public --source=. --remote=origin --push`.

### Design language (quick reminder — full version in `CLAUDE.md`)
- **Type pairing carries identity:** Newsreader serif = prose (the *writer*);
  monospace (`--mono`) = ALL metadata/dates/tags/eyebrows (the *physicist*: data);
  sans = UI only.
- **Signature spent in one place:** the tunable `--accent` (footer swatches sweep
  it, persists in `localStorage`) + the damped-oscillation hairline
  (`Oscillation.astro`) under the name. Everything else stays quiet.
- **All tokens live in `src/styles/global.css`** `:root`. Component styles are
  scoped `<style>` blocks.

---

## 4. What went wrong (and the fixes — so future sessions don't re-learn these)

- **`npm install` timed out (`EIDLETIMEOUT`) in the sandbox.** This harness's
  default sandbox blocks/stalls the npm registry. **Fix:** run network commands
  (`npm install`, `brew install`, `git push`) with the sandbox disabled. This is
  the recurring gotcha here.
- **`gh auth login` couldn't save the token** the first time: `~/.config` was
  owned by **root**, so `gh` got "permission denied" creating `~/.config/gh`.
  Browser OAuth said "complete" but `gh` wasn't actually logged in.
- **`sudo` does not work inside the Claude Code session** (no TTY → can't prompt
  for a password). **Fix:** owner ran `sudo chown -R $(whoami) ~/.config` in a
  **real Terminal**, then re-ran `gh auth login`. Now `~/.config` is user-owned
  and `gh` is authenticated (stored in keyring). **Lesson:** anything needing
  `sudo`/password must be done by the owner in a normal terminal.
- **Dev-server port drifted 4321 → 4322** when a stopped server still held the
  port; a clean restart returned it to 4321. Cosmetic.

### What went right
- esbuild override fixed the audit cleanly with zero breakage.
- Image pipeline: crop + `astro:assets` → 19 KB webp, responsive, verified
  `HTTP 200 image/webp`.
- Build green throughout (7 pages); push succeeded.

---

## 5. Open TODOs / next steps

**Deploy finishing touches**
- [ ] Confirm the live Vercel URL and record it in this file.
- [ ] (Later) Buy `nakshatrabansal.com`, attach in Vercel → Domains, and set
      `site` in `astro.config.mjs`.

**Content (owner's real input needed — see README checklist + `TODO`s in code)**
- [ ] `src/consts.ts` — write the real `tagline` (still placeholder).
- [ ] `src/pages/about.astro` — rewrite the bio in the owner's voice.
- [ ] `src/content/writing/why-neuromorphic-is-physics.md` — **rewrite fully**.
      ⚠️ **Content rule: never ghost-write the owner's essays.** Help with
      structure/outline/edit/titles only; the writing must be the owner's words.
- [ ] `src/content/projects/snn-phase-transition.md` — replace with a real build
      log (template shape: what & why → approach → what broke → results → links).
- [ ] `src/data/research.ts` — verify descriptions (accurate + modest), add
      paper/code links. Re-add a Scholar social link once there are publications.
- [ ] `public/favicon.svg` — swap if a different mark is wanted.

**Nice-to-haves**
- [ ] Consider whether the B&W→color reveal should also have a tasteful
      touch/tap behavior note (currently triggers on pointer move; on touch it
      fires on tap/drag).

---

## 6. Command reference

```bash
npm run dev               # dev server → http://localhost:4321
npm run dev -- --host     # also expose on LAN (share to phone on same Wi-Fi)
npm run build             # static build → ./dist  (sanity check before push)
npm run preview           # preview the built site

# Deploy loop (auto-deploys on Vercel):
git add -A && git commit -m "msg" && git push   # → Vercel redeploys main

# Gotchas:
#  - Run npm/brew/git-push with the SANDBOX DISABLED (registry times out otherwise).
#  - sudo / password steps must be done by the owner in a real terminal.
```

---

## 7. Session history

| Date       | Focus                                                            |
|------------|------------------------------------------------------------------|
| 2026-06-15 | Initial setup: deps, security override, identity in `consts.ts`, B&W→color hero portrait, first commit + push to GitHub, Vercel deploy started. |

<!-- Append new rows above as work continues. Keep newest at the bottom of the table or top of section 3-style notes — your call, just stay consistent. -->

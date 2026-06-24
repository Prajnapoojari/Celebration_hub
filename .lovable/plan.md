
# Celebration Hub — Build Plan

A single-page React app (TanStack Start) with 4 celebration flows: **Birthday, Proposal, Anniversary, Friendship Day**. Admin fills a form → app generates a short shareable link → recipient opens link and sees a full interactive, animated celebration website with background music.

I'll build this directly in the Lovable project (not a zip — Lovable projects are live, you can download the code anytime from the GitHub export option). Everything will be in this preview, working end-to-end.

---

## 1. Pages & Routes

```text
/                       Home — pick an event (4 big cards)
/create/birthday        Admin form for birthday
/create/proposal        Admin form for proposal
/create/anniversary     Admin form for anniversary
/create/friendship      Admin form for friendship day
/share/:id              Success page with copyable short link
/c/:id                  Recipient celebration experience (reads data, runs the flow)
```

`/c/:id` reads the saved celebration and dispatches to one of four experience components based on event type.

## 2. Data storage (no backend needed for MVP)

- Save each celebration as JSON in **Lovable Cloud** (one `celebrations` table: `id`, `type`, `payload jsonb`, `created_at`) so the link works from any device/browser.
- `id` is a short nanoid (8 chars) → URLs like `/c/aB3xK9pq`.
- Photos: uploaded to Lovable Cloud Storage, URLs stored in payload.
- I will enable Lovable Cloud as part of this build (required for cross-device shareable links).

If you'd rather skip Cloud and only share via the same browser, tell me and I'll use `localStorage` instead (links won't work on other devices).

## 3. Birthday flow (recipient view)

Intro "POV: one night, one laptop…" typewriter → Start button → 3-2-1 countdown with confetti → "Yeyyy it's your special day!" → "Wanna see what I made? Yes/No" → "Have a look madamji/sirji" → sequence buttons: **Lights On → Play Music → Decorate (balloons animate in) → Let's cut the cake** → 3D-ish cake with candles, blow them out, cake cuts → final admin message + photo gallery + emojis. Song: *Jo Teri Khatir* (Zaalima).

## 4. Proposal flow

Dark neon landing with floating hearts → "Do you like surprises? Yes / No" (No button runs away from cursor) → typewriter romantic messages → memory gallery → love-story timeline → "Will You Be Mine Forever?" with escaping "Think Again" button → Yes triggers hearts + confetti + fireworks → ending. Song: *Ishq Wala Love*.

## 5. Anniversary flow

"Loading something special…" → "It's OUR special day" → "Happy Anniversary cutie pie" → live counter: days since marriage date → mini game: catch 4 flying hearts in a box (instructions shown) → "Perfect!" → memory gallery with captions → admin's special message → "Send Love" button rains hearts. Song: *Oh My Love* (Prema Katha Chitram).

## 6. Friendship flow

Bright gradient landing → gift box opens → typewriter messages → polaroid memory gallery → friendship timeline → fun quiz (3 questions) → quotes carousel → final celebration with confetti, balloons, fireworks → share/restart. Song: *Tera Yaar Hoon Main*.

## 7. Shared building blocks

- `ConfettiBurst`, `FloatingHearts`, `Sparkles`, `Balloons`, `Fireworks`, `Typewriter`, `GlassCard`, `MusicToggle` (floating button, autoplay-safe — user gesture starts audio), `Countdown`, `Cake3D` (CSS 3D transforms, no Three.js), `RunawayButton`, `HeartCatchGame`.
- Animations: **Framer Motion** + **canvas-confetti**. (Skipping GSAP — Framer Motion covers everything we need and keeps the bundle smaller.)
- Theme: glassmorphism, gradients per event, dark/light toggle in header.

## 8. Music

You listed copyrighted Bollywood songs. I **cannot bundle those audio files** — that would be copyright infringement and they're not available as free assets. Options (pick one in your reply, default is **A**):

- **A. YouTube embed per event** — recipient sees a small player; one tap to play. Legal, works everywhere.
- **B. Royalty-free instrumental** in a matching mood (I'll pick from a free library and bundle it).
- **C. You upload your own MP3s** for each event (I'll wire the player; you handle rights).

## 9. Tech

TanStack Start (already set up) · React 19 · Tailwind v4 · Framer Motion · canvas-confetti · nanoid · Lovable Cloud (DB + storage) · shadcn/ui for forms.

## 10. Out of scope (be honest)

- Real 3D (Three.js) — using rich CSS 3D + Framer Motion instead, which looks great and stays fast on mobile.
- URL shortener service — `/c/:id` with an 8-char id is already short (~30 chars total). If you want a `bit.ly`-style external domain, that's separate.
- A downloadable zip — Lovable doesn't ship zips, but you can export the full repo to GitHub from the project menu any time.

---

## Questions before I start

1. **Music**: A (YouTube), B (royalty-free), or C (you'll upload)?
2. **Storage**: Lovable Cloud (links work everywhere) or localStorage only (same browser only)? Default = Cloud.
3. **Photos**: how many per event should the admin be able to upload (suggest max 8)?

Reply with answers (or "go with defaults: A, Cloud, 8") and I'll build the whole thing.

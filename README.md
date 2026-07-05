# Tomáš Matějček — Portfolio

Single-page portfolio. React + Vite + Framer Motion.

**I translate ideas into things.**

## Run locally

```sh
npm install
npm run dev      # dev server at http://localhost:5173
```

## Build for production

```sh
npm run build    # static output in dist/ — deploy anywhere
npm run preview  # preview the production build locally
```

## Structure

- `src/components/Hero.jsx` — the slogan jewel piece. Each word flips on
  hover (tap on touch) to its Italian or Czech translation, alternating
  IT / CZ. The line **reflows** as words change length — the flip
  container animates between the measured widths of the two faces.
  Word list + translations live in `WORDS`.
- `src/data/projects.js` — the real work: titles, blurbs, descriptions,
  galleries, external links. Edit copy here.
- `src/components/Work.jsx` + `ProjectModal.jsx` — editorial index rows
  and the accessible detail overlay (focus trap, ESC, focus restore).
  On touch devices the hero auto-plays its word flips until the visitor
  taps a word themselves.
- `src/components/Doodles.jsx` — the exact EPS asterisk
  (`BrandAsterisk`) and the stroke family: underline, arrow, divider,
  and the three brand creatures — Elvis waves in About, Ringo loops
  above Selected work, Viky sways in the footer.
- `src/components/Cursor.jsx` — the pink dot pointer (fine-pointer
  devices only; grows over interactive elements).
- `src/assets/logo.svg` — the exact logotype from `EPS/logo.eps`.
- `public/work/` — project images (resized from `jobs/`).

## Brand tokens (from the EPS files)

- ink `#181616` · cream `#F9F2E8` · pink `#DB4082` (asterisk)
- `--pink-deep #B13366` for small text accents (WCAG AA on cream)
- Pepi Light / Light Italic / Medium / Black. "ideas" is contrast by
  slant + color, never by weight.

## Motion language

Apple-style masked text reveals: translateY 110% → 0 behind an
`overflow: hidden` boundary, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered
~120 ms. Cards lift on hover and morph into the detail overlay.
`MotionConfig reducedMotion="user"` + CSS media queries respect OS
reduced-motion settings.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Astro dev server (http://localhost:4321)
npm run build        # Produce static site in ./dist (also type-checks via @astrojs/check)
npm run preview      # Serve the built ./dist locally
npm run sync         # Regenerate Astro content collection types after schema edits
npm run lint         # ESLint (flat config: eslint.config.mjs)
npm run format       # Prettier write (uses prettier-plugin-astro + tailwind plugin)
npm run format:check # CI uses this
```

CI (`.github/workflows/ci.yml`) runs `lint`, `format:check`, then `build` on PRs. There is no test suite.

The Dockerfile builds the static output and serves it via nginx; the deployed site is `https://www.mengw.net/`.

## Architecture

This started as the AstroPaper blog template and has been adapted into a single-person academic site. Most blog-style functionality is **gated behind `SITE.showWriting` in `src/config.ts`** — flipping that flag is the only intended way to turn writing back on. The toggle is checked in several places that you must keep in mind when changing routes or navigation:

- `src/pages/posts/[...page].astro` and `src/pages/posts/[slug]/index.astro` short-circuit `getStaticPaths` to `[]` when writing is off, so no `/posts/*` pages are generated.
- `astro.config.ts` filters writing-related URLs (`/archives/`, `/posts/`, `/search/`, `/tags/`) out of the sitemap when `showWriting` is false, and additionally drops `/archives/` when `showArchives` is false.
- `src/components/Header.astro` hides nav links for the disabled sections.

`SITE` and `SOCIALS` in `src/config.ts` are the single source of truth for site metadata, feature flags (`showWriting`, `showArchives`, `lightAndDarkMode`), pagination sizes, and visible social profiles (entries with `active: false` are filtered out). Types live in `src/types.ts`.

### Content model

Blog posts are a content collection defined in `src/content/config.ts` using Astro 4's **experimental `contentLayer`** (enabled in `astro.config.ts`) with a `glob` loader over `src/content/blog/**/*.md`. The Zod schema enforces frontmatter (`title`, `pubDatetime`, `description`, optional `tags`, `featured`, `draft`, `ogImage`, etc.). After changing the schema, run `npm run sync` so `astro:content` regenerates types.

`src/utils/postFilter.ts` is the canonical "is this post visible?" predicate — it honors `draft` and `SITE.scheduledPostMargin` (posts published within 15 min in the future are shown only in dev). Reuse it rather than re-implementing the rule.

OG images are generated at build time per post via `src/pages/posts/[slug]/index.png.ts` and the site-wide OG at `src/pages/og.png.ts`, both using `satori` + `@resvg/resvg-js` (excluded from Vite's `optimizeDeps`).

### Non-blog pages

Academic pages (`about.md`, `cv.md`, `experience.astro`, `publications.astro`, `teach.astro`, `index.astro`) are hand-authored and unrelated to the content collection. Most of them inline their data as `const` arrays at the top of the file (e.g. `newsItems`, `workAreas` in `index.astro`) — edits to the homepage news/research lists happen there, not in any CMS or data file.

### Path aliases

`tsconfig.json` defines aliases that the rest of the code uses heavily — prefer them over relative paths:

```
@config            → src/config.ts
@assets/*          → src/assets/*
@components/*      → src/components/*
@content/*         → src/content/*
@layouts/*         → src/layouts/*
@pages/*           → src/pages/*
@styles/*          → src/styles/*
@utils/*           → src/utils/*
```

### Styling

Tailwind (`@astrojs/tailwind` with `applyBaseStyles: false`) + a custom theme defined in `tailwind.config.cjs` and `src/styles/`. Components reference semantic color tokens like `text-skin-base`, `bg-skin-fill`, `border-skin-line`, `text-skin-accent` — these are CSS variables that switch with the light/dark mode toggle when `SITE.lightAndDarkMode` is true. Prefer these tokens over raw Tailwind colors so dark mode keeps working.

Shiki code-block themes are pinned to `min-light` / `night-owl` in `astro.config.ts`.

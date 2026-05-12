# Meng Wang Personal Website

Personal academic website for Meng Wang, built with Astro.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production site is configured for `https://www.mengw.net/`.

## Writing

Public writing is disabled for now via `SITE.showWriting = false` in `src/config.ts`.

To publish posts later:

1. Add Markdown files under `src/content/blog/`.
2. Set `draft: false` in the post frontmatter.
3. Set `showWriting: true` in `src/config.ts`.

# Azoth Blog

A static personal blog built with Astro, MDX, React islands, and Tailwind CSS, configured for a GitHub Pages project site.

## Requirements

- Node.js 22.12+
- pnpm 10

## Local development

```bash
pnpm install
pnpm dev
```

Run `pnpm check` and `pnpm build` before committing. Use `pnpm preview` to preview the production build locally.

## Publish a new post

Create a `.md` or `.mdx` file in `src/content/blog/`:

```yaml
---
title: "Post title"
description: "Post summary"
pubDate: 2026-08-28
updatedDate: 2026-08-29 # optional
tags: [Astro, Frontend]
cover: /images/cover.webp # optional
featured: false
draft: false
---
```

The content schema is defined in `src/content.config.ts`. Set `draft` to `true` to exclude a post from production builds.

## Add a Playground experiment

Create an Astro page in `src/pages/playground/` and add its card to the Playground index. Use a React island for complex interactions; prefer native Canvas or CSS for smaller experiments and support `prefers-reduced-motion`.

## Configure Giscus

1. Enable GitHub Discussions for the repository and generate a configuration at [giscus.app](https://giscus.app/).
2. Copy `.env.example` to `.env`, then provide the repository and category IDs.
3. Add variables with the same names under **Settings → Secrets and variables → Actions → Variables**. The workflow already maps them into the build. The comments section remains hidden when they are not configured.

## Deploy to GitHub Pages

The current configuration targets the `azoth1991/azoth1991.github.io` repository at `https://azoth1991.github.io/`. A push to `master` builds and deploys the site with the official Pages actions. Before the first deployment, choose **GitHub Actions** under **Settings → Pages → Build and deployment → Source**.

The Astro configuration intentionally has no `base` option because this is a root user site rather than a project site.

## Project structure

- `src/content/blog/`: Markdown and MDX posts
- `src/components/`: Shared components and interactive islands
- `src/layouts/`: Page layouts and SEO
- `src/pages/`: File-based routes, RSS, and Playground
- `public/`: Static assets copied without processing
- `.github/workflows/`: Automated GitHub Pages deployment

Update the site metadata in `src/consts.ts`, then replace the About page content and GitHub link to make the site your own.

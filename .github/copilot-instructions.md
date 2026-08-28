# Workspace setup status

- [x] Verify instructions — Workspace instructions have been created.
- [x] Clarify requirements — Astro, React, MDX, Tailwind, pnpm, and the GitHub Pages project-site configuration are confirmed.
- [x] Scaffold project — The strict TypeScript Astro project is initialized at the workspace root, dependencies are installed, and Git is initialized.
- [x] Customize project — Layouts, content, search, reading features, Playground, themes, SEO, RSS, and deployment are implemented.
- [x] Install required extensions — No additional required extensions.
- [x] Compile project — `pnpm check` and `pnpm build` pass with zero errors and warnings.
- [x] Create and run task — The `Astro: Build` task is configured and verified with Node.js 22.
- [x] Launch project — The local development server has been launched and reviewed.
- [x] Ensure documentation is complete — The README documents development, content, Giscus, and deployment.

## Project conventions

- Use Astro, strict TypeScript, React islands, MDX, and Tailwind CSS.
- Use pnpm. Node.js 22.12 or newer is required.
- Keep the output fully static and compatible with the root `azoth1991.github.io` user-site path.
- Store posts in `src/content/blog/`; define the content schema in `src/content.config.ts`.
- Prefer server-rendered Astro components; add React islands only for client-side interaction.
- Keep all interactions and motion responsive, accessible, and respectful of `prefers-reduced-motion`.
- Run `pnpm check` and `pnpm build` before committing.

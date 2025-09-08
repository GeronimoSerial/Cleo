<!--
	CLEO: concise AI instructions (keep ~20-50 lines)
	Purpose: help automated coding agents be productive immediately.
-->

# AI Coding Agent Guide — CLEO (concise)

Purpose: quick reference for common patterns, conventions, and developer workflows so an AI agent can make safe, minimal, high-value edits.

1) Quick commands
- Install: prefer PNPM (repo uses pnpm lockfile). fallbacks: `pnpm install` or `npm install`.
- Dev: `pnpm dev` (runs `next dev`). Build: `pnpm build`. Start: `pnpm start`. Lint: `pnpm lint`.

2) Big picture (why/what)
- Next.js 15 App Router with TypeScript. Server components fetch data; client components live under product pages when interactivity is needed.
- UI: shadcn-style `components/ui/*` primitives extended by themed components in `components/magicui/` and `components/products/`.
- Data: canonical API is `lib/directus-api.ts` (newer) and compatibility wrapper `lib/products-api-new.ts`. A legacy static dataset /data/products.json is referenced in docs during migration.

3) Key integration & code patterns (examples)
- Dynamic routing: `app/products/[segment]/page.tsx` uses `generateStaticParams()` which calls `getAllProducts()` and `getAllCategories()` from `lib/directus-api` to build SSG routes for both product slugs and category slugs.
- Types: many components import types from `@/lib/directus-api` (e.g. `type Product`). Keep exported types stable when changing APIs.
- Cursor & global effects: layout-level UI (custom cursor, theme provider) lives in `app/layout.tsx` and `components/theme-provider.tsx` — small changes here affect site-wide behavior.
- Animations: Framer Motion is used via the `motion` package; common pattern: `useScroll` + `useTransform` for reveal effects (see `components/products/reveal-products.tsx`).

4) Conventions to preserve
- Dark theme first: components assume `dark:` classes and CSS variables in `app/globals.css`.
- Component placement: primitives in `components/ui/`, composed feature components in `components/` and `components/products/`.
- Naming: product-related components and files often include `product` or `products` in path or filename (helps search).

5) Tests & quick checks
- There are lightweight integration tests in `tests/` (examples reference running with `tsx`): `npx tsx tests/directus-api.test.ts` is a quick way to run a test file without installing a full test runner.
- No test script in package.json; prefer running specific test files directly during quick edits.

6) Safe edit guidelines for automated agents
- Small, local edits only: update a single component or lib file and run `pnpm dev` or a targeted test. Avoid cross-cutting changes to layout or global CSS unless needed.
- When changing data types, update `lib/directus-api` exports and all `type` imports across components.
- Prefer adding new components under `components/` with matching patterns (props, tailwind classes, `dark:` styles) and small unit tests or a smoke usage in a page.

7) Useful files to open first
- `app/products/[segment]/page.tsx` — shows how product/category routing is composed.
- `lib/directus-api.ts` — canonical data access layer.
- `components/ui/*` and `components/magicui/*` — UI primitives and conventions.
- `app/globals.css` — global variables, dark theme and animations.
- `docs/migration-plan-directus.md` — helpful for understanding legacy data vs Directus migration.

If any section is unclear or you want the file to include example diffs or specific safety checks (lint/test hooks to run), tell me which area to expand.

<!--
	CLEO: concise AI instructions (keep ~20-50 lines)
	Purpose: help automated coding agents be productive immediately.
	Updated: Screaming Architecture structure (feature-first organization)
-->

# AI Coding Agent Guide — CLEO (concise)

Purpose: quick reference for common patterns, conventions, and developer workflows so an AI agent can make safe, minimal, high-value edits.

**⚠️ IMPORTANT: Project reorganized with Screaming Architecture. See QUICK_START.md for migration details.**

1) Quick commands
- Install: prefer PNPM (repo uses pnpm lockfile). fallbacks: `pnpm install` or `npm install`.
- Dev: `pnpm dev` (runs `next dev`). Build: `pnpm build`. Start: `pnpm start`. Lint: `pnpm lint`.

2) Big picture (why/what)
- Next.js 15 App Router with TypeScript. Server components fetch data; client components live under product pages when interactivity is needed.
- **Architecture: Screaming Architecture** - organized by business features (navigation, catalog, product, cart, drops) in `src/features/`, not by technical type.
- UI: shadcn-style primitives in `src/shared/ui/*` extended by themed components in `src/shared/ui/magicui/`.
- Data: canonical API is `src/core/api/directus.ts` (newer) and compatibility wrapper `src/core/api/products.ts`. A legacy static dataset /data/products.json is referenced in docs during migration.

3) Key integration & code patterns (examples)
- Dynamic routing: `app/products/[segment]/page.tsx` uses `generateStaticParams()` which calls `getAllProducts()` and `getAllCategories()` from `src/core/api/directus` to build SSG routes for both product slugs and category slugs.
- Types: many components import types from `@/core/api/directus` (e.g. `type Product`). Keep exported types stable when changing APIs.
- Cursor & global effects: layout-level UI (custom cursor, theme provider) lives in `app/layout.tsx` and `src/shared/theme-provider.tsx` — small changes here affect site-wide behavior.
- Animations: Framer Motion is used via the `motion` package; common pattern: `useScroll` + `useTransform` for reveal effects (see `src/features/product/components/reveal-products.tsx`).
- **Import patterns: Use barrel exports** - `@/features/navigation` not `@/features/navigation/components/site-header`.

4) Conventions to preserve
- Dark theme first: components assume `dark:` classes and CSS variables in `app/globals.css`.
- **Component placement (NEW):**
  - Business features: `src/features/[feature]/components/` (navigation, catalog, product, cart, drops)
  - UI primitives: `src/shared/ui/`
  - Visual effects: `src/shared/effects/`
  - Core APIs: `src/core/api/`
- **Feature-first organization**: Group by business capability (what), not by technical type (how).
- Naming: use descriptive business names. Features have READMEs documenting their purpose.

5) Tests & quick checks
- There are lightweight integration tests in `tests/` (examples reference running with `tsx`): `npx tsx tests/directus-api.test.ts` is a quick way to run a test file without installing a full test runner.
- No test script in package.json; prefer running specific test files directly during quick edits.

6) Safe edit guidelines for automated agents
- Small, local edits only: update a single component or API file and run `pnpm dev` or a targeted test. Avoid cross-cutting changes to layout or global CSS unless needed.
- When changing data types, update `src/core/api/directus` exports and all `type` imports across components.
- **NEW: Adding components** - identify the business feature first, then add to `src/features/[feature]/components/` with matching patterns (props, tailwind classes, `dark:` styles). Export via feature's `index.ts`. Update feature README.
- **Import best practices**: Always import via barrel exports (`@/features/product`) not deep paths (`@/features/product/components/carousel`).

7) Useful files to open first
- **`QUICK_START.md`** — quick reference for new structure and import patterns.
- **`src/README.md`** — complete architecture documentation (Screaming Architecture principles).
- `app/products/[segment]/page.tsx` — shows how product/category routing is composed.
- `src/core/api/directus.ts` — canonical data access layer.
- `src/shared/ui/*` — UI primitives (shadcn/ui, magic-ui) and conventions.
- `src/features/[feature]/README.md` — documentation for each business feature.
- `app/globals.css` — global variables, dark theme and animations.
- `MIGRATION_GUIDE.md` — how to update old import paths to new structure.

8) Path aliases (tsconfig.json)
- `@/features/*` → business features (navigation, catalog, product, cart, drops)
- `@/core/*` → core business logic (api, types, config)
- `@/shared/*` → truly shared code (ui, effects, hooks, utils)
- `@/app/*` → Next.js routing layer (composes features)

If any section is unclear or you want the file to include example diffs or specific safety checks (lint/test hooks to run), tell me which area to expand.

# Cleo - Project Structure (Screaming Architecture)

## 🎯 What This Project Does
This is an **e-commerce platform for product drops and catalog browsing**. The architecture is designed so that the folder structure immediately tells you what the business does, not what frameworks we use.

## 📐 Architecture Philosophy: Screaming Architecture

> "The architecture should scream about the use cases of the application." - Robert C. Martin (Uncle Bob)

When you look at this structure, you immediately see:
- 📦 **Products** - Individual product pages and details
- 🏪 **Catalog** - Product browsing and categories
- 🚀 **Drops** - Special product launches
- 🛒 **Cart** - Shopping functionality
- 🧭 **Navigation** - Site navigation and menus

Not "components", "lib", "utils" - those are implementation details.

---

## 📂 Directory Structure

```
src/
├── features/           # Business features (what the app DOES)
│   ├── catalog/        # Product browsing, categories, listings
│   ├── product/        # Individual product pages and details
│   ├── drops/          # Special product launches
│   ├── cart/           # Shopping cart functionality
│   └── navigation/     # Site navigation, headers, menus
│
├── core/               # Core business logic and infrastructure
│   ├── api/           # External API clients (Directus CMS, Cloudflare)
│   ├── types/         # Domain types and interfaces
│   └── config/        # Application configuration
│
├── shared/             # Shared across features
│   ├── ui/            # UI primitives (shadcn/ui, magic-ui)
│   ├── effects/       # Visual effects, animations, backgrounds
│   ├── hooks/         # Reusable React hooks
│   ├── utils.ts       # Utility functions
│   └── theme-provider.tsx
│
└── app/                # Next.js App Router (ROUTING ONLY)
    ├── layout.tsx     # Root layout
    ├── page.tsx       # Homepage
    └── products/      # Product routes
```

---

## 🎨 Feature-First Organization

### ✅ DO: Organize by Feature
```typescript
// Easy to find all catalog-related code
import { CategoryHero } from '@/features/catalog';
import { ProductGrid } from '@/features/catalog';
import { CategoryFilter } from '@/features/catalog';

// Easy to find all product detail code
import { ProductCarousel, RelatedProducts } from '@/features/product';
```

### ❌ DON'T: Organize by Technical Type
```typescript
// Hard to know what these do without context
import { Hero } from '@/components/hero';
import { Grid } from '@/components/grid';
import { Filter } from '@/components/filter';
```

---

## 📋 Feature Guidelines

Each feature directory follows this structure:

```
features/[feature-name]/
├── README.md          # Feature documentation
├── index.ts           # Barrel export (public API)
├── components/        # Feature-specific components
├── hooks/             # Feature-specific hooks (optional)
├── types.ts           # Feature-specific types (optional)
└── utils.ts           # Feature-specific utilities (optional)
```

### Feature Independence Rules

1. **Features can import from:**
   - ✅ `@/core/*` - Core business logic
   - ✅ `@/shared/*` - Shared utilities and UI
   - ⚠️ Other features (sparingly, prefer composition)

2. **Features should NOT:**
   - ❌ Import from `@/app/*` (routing layer)
   - ❌ Have circular dependencies with other features

3. **Each feature has a barrel export (`index.ts`):**
   - Only export what's meant to be public
   - Hide internal implementation details

---

## 🔧 Core Layer

The `core/` directory contains business-critical infrastructure:

### `core/api/`
Centralized API clients for external services:
- `directus.ts` - Directus CMS API (product data, content)
- `products.ts` - Product-specific API wrapper
- `cloudflare-images.ts` - Image optimization service

### `core/types/`
Domain types that represent business concepts:
- Product
- Category
- Order
- Customer

### `core/config/`
Application configuration and environment variables.

---

## 🎨 Shared Layer

The `shared/` directory contains code reused across multiple features:

### `shared/ui/`
Primitive UI components (shadcn/ui, magic-ui):
- Buttons, inputs, cards, dialogs
- Layout primitives
- Typography components

### `shared/effects/`
Visual effects and animations:
- Background effects
- Loading animations
- Scroll-triggered effects
- Layout wrappers

### `shared/hooks/`
Reusable React hooks:
- `useMediaQuery`
- `useLocalStorage`
- `useDebounce`
- etc.

---

## 🛣️ App Router Integration

The `app/` directory uses Next.js 15 App Router and focuses ONLY on routing:

```
app/
├── layout.tsx              # Root layout (global providers, headers)
├── page.tsx                # Homepage
├── products/
│   ├── page.tsx           # All products page
│   └── [segment]/
│       └── page.tsx       # Dynamic product/category pages
└── api/                    # API routes (if needed)
```

### Route Organization Rules

1. **Routes delegate to features:**
   ```tsx
   // app/products/[segment]/page.tsx
   import { ProductDetail } from '@/features/product';
   
   export default function ProductPage({ params }) {
     return <ProductDetail slug={params.segment} />;
   }
   ```

2. **Data fetching in routes:**
   - Use Server Components for data fetching
   - Import API functions from `@/core/api`
   - Pass data to feature components as props

---

## 📦 Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/core/*": ["./src/core/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### Import Examples

```typescript
// Features (business logic)
import { ProductCarousel } from '@/features/product';
import { CategoryHero } from '@/features/catalog';
import { CartIcon } from '@/features/cart';

// Core (API and types)
import { getAllProducts, type Product } from '@/core/api';
import { config } from '@/core/config';

// Shared (UI and utilities)
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { GlobalRockBackground } from '@/shared/effects';
```

---

## 🚀 Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Testing
```bash
# Run specific test file
npx tsx tests/directus-api.test.ts
```

---

## 🎯 Benefits of This Architecture

### 1. **Business-First**
Looking at the structure, you immediately understand the business domain: products, catalog, drops, cart, navigation.

### 2. **Easy Navigation**
Need to work on product details? Go to `features/product/`.
Need to work on category pages? Go to `features/catalog/`.

### 3. **Scalability**
Adding a new feature? Create a new directory under `features/`.
No need to modify multiple "components", "hooks", "utils" directories.

### 4. **Maintainability**
Related code stays together. When you modify a feature, everything you need is in one place.

### 5. **Onboarding**
New developers can understand what the app does just by reading folder names.

---

## 📖 Feature Documentation

Each feature has its own README with:
- Purpose and responsibilities
- Component list and usage examples
- Dependencies
- Key patterns and conventions

**Start here:**
- [Navigation Feature](./features/navigation/README.md)
- [Product Feature](./features/product/README.md)
- [Catalog Feature](./features/catalog/README.md)

---

## 🔄 Migration Notes

This structure was reorganized from a traditional Next.js structure. Key changes:

**Before:**
```
components/
├── site-header.tsx
├── product-carousel.tsx
├── category-hero.tsx
├── cart-icon.tsx
└── ui/
```

**After:**
```
features/
├── navigation/
│   └── components/site-header.tsx
├── product/
│   └── components/product-carousel.tsx
├── catalog/
│   └── components/category-hero.tsx
└── cart/
    └── components/cart-icon.tsx
```

**Why?** Now it's clear what each component is for without reading the code.

---

## 🤝 Contributing

When adding new code:

1. **Ask "What feature does this belong to?"** Not "what type of file is this?"
2. **Create features for new business capabilities**
3. **Use shared/ for truly reusable code** (used by 3+ features)
4. **Update feature README** when adding new components
5. **Export through barrel files** (`index.ts`) to control public API

---

## 📚 Further Reading

- [Screaming Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js App Router Best Practices](https://nextjs.org/docs/app/building-your-application)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + magic-ui
- **Animations:** Framer Motion (motion)
- **CMS:** Directus
- **Images:** Cloudflare Images
- **Package Manager:** pnpm

---

**Questions?** Check the feature READMEs or the original project documentation in `/docs`.
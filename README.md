# 🎨 Cleo - E-commerce Platform

> Modern e-commerce platform built with Next.js 15, TypeScript, and Screaming Architecture

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

---

## ⚡ Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🎯 Project Architecture

This project uses **Screaming Architecture** - a feature-first organization that makes the business purpose immediately obvious.

### 📁 Structure at a Glance

```
src/
├── features/        🚀 Business capabilities (navigation, catalog, product, cart, drops)
├── core/            🔧 Core logic (API clients, types, config)
└── shared/          🤝 Shared utilities (UI, effects, hooks)
```

**The structure SCREAMS: "This is an e-commerce app with products, catalog, and cart!"**

---

## 📚 Documentation

### 🆕 New to the project?
1. **Start here:** [`QUICK_START.md`](./QUICK_START.md) - Get productive in 5 minutes
2. **Architecture:** [`src/README.md`](./src/README.md) - Complete architecture guide
3. **Visual comparison:** [`STRUCTURE_COMPARISON.md`](./STRUCTURE_COMPARISON.md) - Before/After

### 🔄 Migrating old code?
- [`MIGRATION_GUIDE.md`](./MIGRATION_GUIDE.md) - Step-by-step migration instructions
- [`REORGANIZATION_SUMMARY.md`](./REORGANIZATION_SUMMARY.md) - Executive summary of changes

### 🎓 Understanding features
- [`src/features/README.md`](./src/features/README.md) - Features overview
- [`src/features/navigation/README.md`](./src/features/navigation/README.md) - Navigation feature
- [`src/features/product/README.md`](./src/features/product/README.md) - Product feature
- [`src/features/catalog/README.md`](./src/features/catalog/README.md) - Catalog feature

### 🌳 Visual structure
- [`STRUCTURE_TREE.txt`](./STRUCTURE_TREE.txt) - Complete project tree with emojis

---

## 🎨 What Makes This Architecture Special?

### Before ❌
```
components/          ← What kind of components?
lib/                 ← Library of what?
```

### After ✅
```
src/features/
  navigation/        🧭 Site navigation
  catalog/           🏪 Product browsing
  product/           📦 Product details
  cart/              🛒 Shopping cart
  drops/             🚀 Product launches
```

**Benefits:**
- ✨ Self-documenting structure
- 🎯 Easy to find related code
- 🚀 Simple to add new features
- 👥 Fast onboarding for new developers

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) + [magic-ui](https://magicui.design/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **CMS:** [Directus](https://directus.io/)
- **Images:** [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/)
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 📦 Import Examples

```typescript
// Features (business capabilities)
import { SiteHeader, Logo } from '@/features/navigation';
import { ProductCarousel, RelatedProducts } from '@/features/product';
import { CategoryHero } from '@/features/catalog';
import { CartIcon } from '@/features/cart';

// Core (APIs and types)
import { getAllProducts, type Product } from '@/core/api';
import { config } from '@/core/config';

// Shared (UI and utilities)
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { GlobalRockBackground } from '@/shared/effects';
```

---

## 🎯 Adding New Code

### "Where does my new component go?"

```
Is it navigation?    → src/features/navigation/components/
Is it product?       → src/features/product/components/
Is it catalog?       → src/features/catalog/components/
Is it cart?          → src/features/cart/components/
Is it UI primitive?  → src/shared/ui/
Is it visual effect? → src/shared/effects/
Is it API client?    → src/core/api/
```

**Rule:** Organize by **what it does** (business feature), not **what it is** (technical type).

---

## 🧪 Testing

```bash
# Run specific test file
npx tsx tests/directus-api.test.ts

# Type check
npx tsc --noEmit
```

---

## 📋 Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## 🤝 Contributing

1. **Identify the feature** - What business capability does this belong to?
2. **Create/update component** in `src/features/[feature]/components/`
3. **Export via barrel** in `src/features/[feature]/index.ts`
4. **Document** in the feature's README.md
5. **Test** your changes

See [`src/features/README.md`](./src/features/README.md) for detailed guidelines.

---

## 🗺️ Project Status

### ✅ Completed
- Feature-first architecture implemented
- All code organized by business capability
- Comprehensive documentation
- Path aliases configured

### 🚧 In Progress
- Migrating import statements in `app/` directory
- Updating test files to use new paths

### 📋 Todo
- Remove old `components/`, `lib/`, `hooks/` directories
- Update `components.json` for shadcn/ui
- Add feature-specific tests

---

## 📖 Learn More

- [Screaming Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Project Architecture Guide](./src/README.md)

---

## 🆘 Getting Help

1. Check [`QUICK_START.md`](./QUICK_START.md) for common patterns
2. Read feature READMEs in `src/features/[feature]/README.md`
3. Review [`MIGRATION_GUIDE.md`](./MIGRATION_GUIDE.md) for migration help
4. Check [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) for AI assistant guidance

---

## 📝 License

Private project.

---

**Made with ❤️ using Screaming Architecture**

*Your architecture should scream about what your application does!* 📢
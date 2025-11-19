# Migration Guide - Screaming Architecture Reorganization

This guide helps you update your code to use the new Screaming Architecture structure.

## 📋 Quick Reference

### Old Import Paths → New Import Paths

| Old Path | New Path | Category |
|----------|----------|----------|
| `@/components/site-header` | `@/features/navigation` | Navigation |
| `@/components/logo` | `@/features/navigation` | Navigation |
| `@/components/hamburger-menu` | `@/features/navigation` | Navigation |
| `@/components/sticky-whatsapp-button-dark` | `@/features/navigation` | Navigation |
| `@/components/cart-icon` | `@/features/cart` | Cart |
| `@/components/category-hero` | `@/features/catalog` | Catalog |
| `@/components/product-carousel` | `@/features/product` | Product |
| `@/components/related-products-dark` | `@/features/product` | Product |
| `@/components/products/*` | `@/features/product/components/*` | Product |
| `@/components/drops/*` | `@/features/drops/components/*` | Drops |
| `@/lib/directus-api` | `@/core/api/directus` | Core API |
| `@/lib/products-api-new` | `@/core/api/products` | Core API |
| `@/lib/cloudflare-images` | `@/core/api/cloudflare-images` | Core API |
| `@/lib/config` | `@/core/config` | Core Config |
| `@/lib/utils` | `@/shared/utils` | Shared |
| `@/components/ui/*` | `@/shared/ui/*` | Shared UI |
| `@/components/magicui/*` | `@/shared/ui/magicui/*` | Shared UI |
| `@/components/theme-provider` | `@/shared/theme-provider` | Shared |
| `@/components/global-rock-background` | `@/shared/effects` | Shared Effects |
| `@/components/splash-screen` | `@/shared/effects` | Shared Effects |
| `@/hooks/*` | `@/shared/hooks/*` | Shared Hooks |

---

## 🔄 Migration Steps

### Step 1: Update API Imports

**Before:**
```typescript
import { getAllProducts, getAllCategories, type Product } from '@/lib/directus-api';
import { getProductBySlug } from '@/lib/products-api-new';
import { optimizeImage } from '@/lib/cloudflare-images';
```

**After:**
```typescript
import { getAllProducts, getAllCategories, type Product } from '@/core/api/directus';
import { getProductBySlug } from '@/core/api/products';
import { optimizeImage } from '@/core/api/cloudflare-images';

// Or use barrel export
import { getAllProducts, getAllCategories, type Product, getProductBySlug, optimizeImage } from '@/core/api';
```

---

### Step 2: Update Component Imports

**Before:**
```typescript
import SiteHeader from '@/components/site-header';
import Logo from '@/components/logo';
import CartIcon from '@/components/cart-icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

**After:**
```typescript
import { SiteHeader, Logo } from '@/features/navigation';
import { CartIcon } from '@/features/cart';
import { Button, Card } from '@/shared/ui';
```

---

### Step 3: Update Product Components

**Before:**
```typescript
import ProductCarousel from '@/components/products/product-carousel';
import RelatedProducts from '@/components/related-products-dark';
import RevealProducts from '@/components/products/reveal-products';
import { ProductDetails } from '@/components/products/details/product-details';
```

**After:**
```typescript
import { ProductCarousel, RelatedProducts, RevealProducts, ProductDetails } from '@/features/product';
```

---

### Step 4: Update Utility Imports

**Before:**
```typescript
import { cn } from '@/lib/utils';
import { config } from '@/lib/config';
```

**After:**
```typescript
import { cn } from '@/shared/utils';
import { config } from '@/core/config';
```

---

### Step 5: Update Effect/Animation Imports

**Before:**
```typescript
import GlobalRockBackground from '@/components/global-rock-background';
import SplashScreen from '@/components/splash-screen';
import CreativeGraphics from '@/components/creative-graphics';
```

**After:**
```typescript
import { GlobalRockBackground, SplashScreen, CreativeGraphics } from '@/shared/effects';
```

---

## 🛠️ Automated Migration Script

Run this script to automatically update imports in your files:

```bash
#!/bin/bash

# Navigate to project root
cd "$(dirname "$0")"

# Update API imports
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|@/lib/directus-api|@/core/api/directus|g" \
  -e "s|@/lib/products-api-new|@/core/api/products|g" \
  -e "s|@/lib/cloudflare-images|@/core/api/cloudflare-images|g" \
  -e "s|@/lib/config|@/core/config|g" \
  -e "s|@/lib/utils|@/shared/utils|g" \
  {} +

# Update component imports
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|@/components/site-header|@/features/navigation|g" \
  -e "s|@/components/logo|@/features/navigation|g" \
  -e "s|@/components/hamburger-menu|@/features/navigation|g" \
  -e "s|@/components/cart-icon|@/features/cart|g" \
  -e "s|@/components/category-hero|@/features/catalog|g" \
  -e "s|@/components/product-carousel|@/features/product|g" \
  -e "s|@/components/related-products-dark|@/features/product|g" \
  -e "s|@/components/ui|@/shared/ui|g" \
  -e "s|@/components/theme-provider|@/shared/theme-provider|g" \
  -e "s|@/components/global-rock-background|@/shared/effects|g" \
  -e "s|@/components/splash-screen|@/shared/effects|g" \
  {} +

echo "✅ Migration complete! Please review changes and test your application."
```

---

## ⚠️ Breaking Changes

### 1. Components.json (shadcn/ui)

Update `components.json` to reflect new paths:

```json
{
  "aliases": {
    "components": "@/shared/ui",
    "utils": "@/shared/utils"
  }
}
```

### 2. Import Statement Structure

Some components are now exported through barrel exports:

**Old:**
```typescript
import SiteHeader from '@/components/site-header';
```

**New:**
```typescript
// Named export from barrel
import { SiteHeader } from '@/features/navigation';
```

### 3. Deep Imports

Avoid deep imports into feature internals:

**❌ Don't:**
```typescript
import ProductCard from '@/features/product/components/ui/product-card';
```

**✅ Do:**
```typescript
import { ProductCard } from '@/features/product';
```

---

## 🧪 Testing After Migration

1. **Type Check:**
   ```bash
   npx tsc --noEmit
   ```

2. **Build:**
   ```bash
   pnpm build
   ```

3. **Dev Server:**
   ```bash
   pnpm dev
   ```

4. **Check for Import Errors:**
   Look for these common errors:
   - Module not found
   - Named export not found
   - Type import errors

---

## 📝 Common Issues & Solutions

### Issue: "Module not found: Can't resolve '@/features/...'"

**Solution:** Make sure `tsconfig.json` has the correct paths:
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

### Issue: "Named export 'ComponentName' not found"

**Solution:** Check the feature's `index.ts` barrel export. The component might need to be added:
```typescript
// src/features/[feature]/index.ts
export { default as ComponentName } from './components/component-name';
```

### Issue: Circular dependency warnings

**Solution:** Features should not depend on each other heavily. Consider:
1. Moving shared code to `@/shared`
2. Using composition instead of cross-feature imports
3. Passing data through props from parent routes

---

## 🎯 Next Steps

1. ✅ Update all import statements in `app/` directory
2. ✅ Update import statements in any remaining old structure files
3. ✅ Run type checker and fix any errors
4. ✅ Test all pages and features
5. ✅ Update documentation and comments
6. 🗑️ Remove old `components/`, `lib/`, `hooks/` directories (after confirming everything works)

---

## 🆘 Need Help?

- Check feature READMEs: `src/features/[feature]/README.md`
- Review main architecture doc: `src/README.md`
- Check the original copilot instructions: `.github/copilot-instructions.md`

---

## 📊 Migration Checklist

- [ ] Updated all imports in `app/layout.tsx`
- [ ] Updated all imports in `app/page.tsx`
- [ ] Updated all imports in `app/products/**/*`
- [ ] Updated all imports in `app/api/**/*` (if any)
- [ ] Updated `tsconfig.json` paths
- [ ] Updated `components.json` (shadcn)
- [ ] Ran type checker (`npx tsc --noEmit`)
- [ ] Tested dev server (`pnpm dev`)
- [ ] Tested build (`pnpm build`)
- [ ] Updated tests to use new paths
- [ ] Removed old directories (optional, keep as backup initially)

---

**Status:** 🚧 Migration in progress

**Date:** 2024

**Version:** Screaming Architecture v1.0
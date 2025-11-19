# Features Overview

This directory contains all business features of the Cleo e-commerce platform. Each feature represents a distinct business capability that users interact with.

## 🎯 What is a Feature?

A feature is a **business capability** that delivers value to users. Features are:
- **Self-contained**: All related code lives together
- **Business-focused**: Named after what they do, not how they work
- **Composable**: Can be combined to build complete pages
- **Testable**: Can be tested in isolation

## 📦 Available Features

### 🧭 Navigation
**Path:** `navigation/`

Site-wide navigation components including headers, menus, logos, and persistent UI elements.

**Key Components:**
- `SiteHeader` - Main site header
- `Logo` - Company logo
- `HamburgerMenu` - Mobile menu
- `StickyWhatsAppButton` - Contact button

**Use When:** Building layouts, adding navigation elements

**Import Example:**
```typescript
import { SiteHeader, Logo } from '@/features/navigation';
```

[View Documentation →](./navigation/README.md)

---

### 🏪 Catalog
**Path:** `catalog/`

Product discovery through browsing, categories, filtering, and search.

**Key Components:**
- `CategoryHero` - Category page hero section
- Coming soon: `ProductGrid`, `CategoryFilter`, `SearchBar`

**Use When:** Building product listing pages, category pages

**Import Example:**
```typescript
import { CategoryHero } from '@/features/catalog';
```

[View Documentation →](./catalog/README.md)

---

### 📦 Product
**Path:** `product/`

Individual product pages with detailed information, images, and related products.

**Key Components:**
- `ProductCarousel` - Product image gallery
- `RelatedProducts` - Product recommendations
- `RevealProducts` - Animated product reveals
- `ProductDetails` - Detailed product info
- And more...

**Use When:** Building product detail pages, product showcases

**Import Example:**
```typescript
import { ProductCarousel, RelatedProducts } from '@/features/product';
```

[View Documentation →](./product/README.md)

---

### 🛒 Cart
**Path:** `cart/`

Shopping cart functionality including add to cart, cart display, and checkout flow.

**Key Components:**
- `CartIcon` - Cart icon with item count

**Use When:** Building checkout flows, adding cart UI

**Import Example:**
```typescript
import { CartIcon } from '@/features/cart';
```

---

### 🚀 Drops
**Path:** `drops/`

Special product launches and time-limited releases.

**Key Components:**
- Drop-specific components (coming from legacy structure)

**Use When:** Building drop pages, launch campaigns

**Import Example:**
```typescript
import { DropHero } from '@/features/drops';
```

---

## 🏗️ Feature Structure

Every feature follows this consistent structure:

```
feature-name/
├── README.md              # Feature documentation
├── index.ts               # Public API (barrel export)
├── components/            # React components
│   ├── component-a.tsx
│   └── component-b.tsx
├── hooks/                 # Feature-specific hooks (optional)
│   └── use-feature.ts
├── types.ts               # Feature-specific types (optional)
└── utils.ts               # Feature-specific utilities (optional)
```

---

## 📖 Feature Documentation

Each feature includes:
- **Purpose**: What problem does it solve?
- **Components**: List of all public components
- **Usage Examples**: How to use the feature
- **Dependencies**: What does it depend on?
- **Key Patterns**: Important conventions

See individual feature READMEs for details.

---

## 🔧 Creating a New Feature

### 1. Identify the Business Capability

Ask: "What business problem does this solve?"
- ✅ Good: "User Authentication" (business capability)
- ❌ Bad: "Form Components" (technical detail)

### 2. Create the Feature Directory

```bash
mkdir -p src/features/[feature-name]/components
```

### 3. Create Essential Files

```bash
# Create README
touch src/features/[feature-name]/README.md

# Create barrel export
touch src/features/[feature-name]/index.ts

# Create first component
touch src/features/[feature-name]/components/main-component.tsx
```

### 4. Document the Feature

Use this template for `README.md`:

```markdown
# [Feature Name] Feature

## Purpose
[What business problem does this solve?]

## Components

### ComponentName
[Description]

**Location:** `components/component-name.tsx`

**Usage:**
```tsx
import { ComponentName } from '@/features/[feature-name]';

<ComponentName prop="value" />
```

## Dependencies
- `@/core/api` - [Why?]
- `@/shared/ui` - [Why?]

## Key Patterns
- [Important convention 1]
- [Important convention 2]
```

### 5. Create Barrel Export

In `index.ts`:

```typescript
// [Feature Name] Feature - Barrel Export
// [Brief description]

export { default as ComponentA } from './components/component-a';
export { default as ComponentB } from './components/component-b';

// Re-export types if needed
export type { ComponentAProps } from './components/component-a';
```

---

## 🎨 Feature Guidelines

### DO ✅

1. **Group by business capability**
   ```
   features/checkout/     # Good: business capability
   features/payments/     # Good: business capability
   ```

2. **Export through barrel files**
   ```typescript
   // features/product/index.ts
   export { ProductCarousel } from './components/product-carousel';
   ```

3. **Document your feature**
   - Add README.md with purpose, components, usage
   - Include code examples
   - List dependencies

4. **Keep features independent**
   - Import from `@/core` and `@/shared`
   - Minimize cross-feature dependencies

### DON'T ❌

1. **Group by technical type**
   ```
   features/forms/        # Bad: technical detail
   features/hooks/        # Bad: technical detail
   ```

2. **Deep import into features**
   ```typescript
   // ❌ Bad
   import Thing from '@/features/product/components/ui/thing';
   
   // ✅ Good
   import { Thing } from '@/features/product';
   ```

3. **Create circular dependencies**
   ```
   features/a/ imports from features/b/
   features/b/ imports from features/a/  ❌
   ```

4. **Import from app layer**
   ```typescript
   // ❌ Bad
   import Layout from '@/app/layout';
   
   // ✅ Good - App layer composes features
   ```

---

## 🔄 Feature Dependencies

### Allowed Dependencies

```
Features can import from:
├── @/core/*           ✅ Core business logic, APIs, types
├── @/shared/*         ✅ Shared utilities, UI, effects
└── Other features     ⚠️  Sparingly, prefer composition
```

### Forbidden Dependencies

```
Features should NOT import from:
├── @/app/*            ❌ Routing layer (app composes features)
└── Circular deps      ❌ No mutual dependencies between features
```

---

## 🧪 Testing Features

Each feature can be tested in isolation:

```typescript
// tests/features/product.test.ts
import { ProductCarousel } from '@/features/product';
import { render, screen } from '@testing-library/react';

describe('Product Feature', () => {
  it('renders product carousel', () => {
    render(<ProductCarousel images={mockImages} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
```

---

## 📊 Feature Maturity Levels

### 🟢 Stable
Features that are production-ready and well-documented.
- Navigation
- Product

### 🟡 In Progress
Features being actively developed or migrated.
- Catalog
- Cart

### 🔴 Planned
Features that are documented but not yet implemented.
- Checkout
- User Profile

---

## 🚀 Migration from Old Structure

If migrating components from the old structure:

1. **Identify the business feature** the component belongs to
2. **Move to appropriate feature directory**
3. **Update imports** in consuming code
4. **Add to barrel export** (`index.ts`)
5. **Document in feature README**
6. **Test the component** still works

See [MIGRATION_GUIDE.md](../../MIGRATION_GUIDE.md) for detailed steps.

---

## 📚 Further Reading

- [Screaming Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Main Architecture Documentation](../README.md)

---

## 🤝 Contributing

When contributing to features:

1. Read the feature's README first
2. Follow existing patterns and conventions
3. Update README when adding new components
4. Add usage examples for new exports
5. Keep feature scope focused and clear

---

**Questions?** Check individual feature READMEs or the main [src/README.md](../README.md).
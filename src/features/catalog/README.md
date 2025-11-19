# Catalog Feature

## Purpose
This feature handles product catalog browsing, category pages, product listings, filtering, and search functionality. It's the main discovery experience for users to find products.

## Components

### CategoryHero
Hero section for category pages with title, description, and featured imagery.

**Location:** `components/category-hero.tsx`

**Usage:**
```tsx
import { CategoryHero } from '@/features/catalog';

<CategoryHero 
  category={category}
  title="Category Name"
  description="Category description"
/>
```

## Planned Components

### ProductGrid
Grid layout for displaying multiple products with filtering and sorting.

**Future Location:** `components/product-grid.tsx`

### CategoryFilter
Filter UI for narrowing down products by attributes (price, size, color, etc.).

**Future Location:** `components/category-filter.tsx`

### ProductCard
Card component for displaying product preview in grid/list views.

**Future Location:** `components/product-card.tsx`

### SearchBar
Product search functionality with autocomplete.

**Future Location:** `components/search-bar.tsx`

## Data Dependencies
- `@/core/api/directus` - Fetch categories and product collections
- `@/core/api/products` - Product listing and filtering logic
- `@/core/types` - Category and Product type definitions

## UI Dependencies
- `@/shared/ui` - Base UI primitives (buttons, cards, inputs)
- `@/shared/effects` - Scroll animations and visual effects
- `motion` - Framer Motion for page transitions

## Key Patterns
- Server-side rendering for SEO optimization
- Static generation for category pages via `generateStaticParams()`
- Client-side filtering for instant feedback
- Pagination or infinite scroll for large product sets
- Responsive grid layouts (mobile: 1 col, tablet: 2 cols, desktop: 3-4 cols)

## Routing Integration
This feature works closely with:
- `/app/products/page.tsx` - All products page
- `/app/products/[segment]/page.tsx` - Category-specific pages
- Dynamic route generation via `getAllCategories()` from Directus API

## Related Features
- `/features/product` - Individual product details
- `/features/navigation` - Category navigation menus
- `/features/cart` - Quick add to cart from listings

## Future Enhancements
- Advanced filtering (multi-select, range sliders)
- Sort options (price, popularity, newest)
- Product comparison functionality
- Recently viewed products
- Wishlist integration
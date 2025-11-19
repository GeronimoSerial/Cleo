# Product Feature

## Purpose
This feature handles everything related to individual product pages, product details, galleries, carousels, and related product recommendations.

## Components

### ProductCarousel
Image carousel/gallery for product photos with lightbox functionality.

**Location:** `components/product-carousel.tsx`

**Usage:**
```tsx
import { ProductCarousel } from '@/features/product';

<ProductCarousel images={product.images} />
```

### RelatedProducts
Shows related or recommended products based on current product context.

**Location:** `components/related-products-dark.tsx`

**Usage:**
```tsx
import { RelatedProducts } from '@/features/product';

<RelatedProducts category={product.category} currentProductId={product.id} />
```

### RevealProducts
Animated product reveal component with scroll-triggered animations.

**Location:** `components/reveal-products.tsx`

**Usage:**
```tsx
import { RevealProducts } from '@/features/product';

<RevealProducts products={productList} />
```

### Product Details Components
Detailed product information components including specifications, descriptions, pricing, and actions.

**Location:** `components/details/`

### Homepage Product Components
Product showcase components optimized for homepage display.

**Location:** `components/homepage/`

### Product UI Components
Reusable UI elements specific to product display (badges, tags, price displays, etc.).

**Location:** `components/ui/`

## Data Dependencies
- `@/core/api/directus` - Fetch product data from Directus CMS
- `@/core/api/products` - Product-specific API utilities
- `@/core/types` - Product type definitions

## UI Dependencies
- `@/shared/ui` - Base UI primitives
- `@/shared/effects` - Animations and visual effects
- `motion` - Framer Motion for animations
- `react-photo-album` - Photo gallery layouts
- `yet-another-react-lightbox` - Lightbox functionality

## Key Patterns
- Server components fetch data directly from API
- Client components handle interactivity (carousel, lightbox)
- Dark theme optimized
- Performance-optimized images via Cloudflare
- Responsive layouts for all screen sizes

## Related Features
- `/features/catalog` - Product listings and categories
- `/features/cart` - Add to cart functionality
- `/app/products/[segment]` - Product page routing
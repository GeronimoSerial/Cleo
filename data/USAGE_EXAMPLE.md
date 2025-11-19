# Guía de Uso - Local Products API

Esta guía muestra cómo usar la API local de productos en tus componentes y páginas.

## 🚀 Inicio Rápido

### 1. Importar la API

```typescript
// Importa desde products-local para desarrollo
import { getAllProducts, getProductBySlug } from '@/core/api/products-local'

// Cuando migres a Directus, solo cambia a:
// import { getAllProducts, getProductBySlug } from '@/core/api/directus'
```

### 2. Usar en un Server Component (Next.js 15)

```typescript
// app/products/page.tsx
import { getAllProducts } from '@/core/api/products-local'
import { ProductCard } from '@/features/catalog'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Todos los Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### 3. Página de Producto Individual

```typescript
// app/products/[slug]/page.tsx
import { getProductBySlug, getRelatedProducts } from '@/core/api/products-local'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const related = await getRelatedProducts(product.id, product.category, 3)

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product images */}
        <div>
          {product.images.map((img, i) => (
            <img key={i} src={img} alt={product.name} />
          ))}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex gap-2 my-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{product.description}</p>

          {/* Badges */}
          <div className="flex gap-2 mt-4">
            {product.isNew && (
              <span className="badge">🆕 Nuevo</span>
            )}
            {product.isLimited && (
              <span className="badge">💎 Edición Limitada</span>
            )}
            {product.isBestSeller && (
              <span className="badge">🔥 Best Seller</span>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Tallas:</h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button key={size} className="btn-size">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Colores:</h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button key={color} className="btn-color" style={{ backgroundColor: color }}>
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### 4. Página de Categoría

```typescript
// app/products/category/[slug]/page.tsx
import { getProductsByCategory, getCategoryBySlug } from '@/core/api/products-local'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/features/catalog'

interface CategoryPageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, products] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProductsByCategory(params.slug)
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground mt-2">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {category.count} productos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### 5. Menu de Categorías

```typescript
// components/category-nav.tsx
import { getAllCategories } from '@/core/api/products-local'
import Link from 'next/link'

export async function CategoryNav() {
  const categories = await getAllCategories()

  return (
    <nav className="flex gap-4 overflow-x-auto">
      {categories.map(category => (
        <Link
          key={category.slug}
          href={`/products/category/${category.slug}`}
          className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors whitespace-nowrap"
        >
          {category.name}
          <span className="ml-2 text-xs text-muted-foreground">
            ({category.count})
          </span>
        </Link>
      ))}
    </nav>
  )
}
```

### 6. Featured Products (Homepage)

```typescript
// app/page.tsx
import { getAllProducts } from '@/core/api/products-local'
import { ProductCard } from '@/features/catalog'

export default async function HomePage() {
  const allProducts = await getAllProducts()
  
  // Filter featured products
  const featured = allProducts.filter(p => p.featured).slice(0, 3)
  const newProducts = allProducts.filter(p => p.isNew).slice(0, 4)
  const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <div className="container">
      {/* Hero section */}
      <section className="py-16">
        <h1 className="text-6xl font-bold">Nueva Colección</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Descubre lo último en streetwear
        </p>
      </section>

      {/* Featured products */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6">Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6">🆕 Recién Llegados</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6">🔥 Los Más Vendidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

### 7. Static Params Generation (SSG)

```typescript
// app/products/[slug]/page.tsx
import { getAllProducts, getProductBySlug } from '@/core/api/products-local'

export async function generateStaticParams() {
  const products = await getAllProducts()
  
  return products.map(product => ({
    slug: product.slug
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  // ... rest of component
}
```

## 🎨 Componente ProductCard Ejemplo

```typescript
// src/features/catalog/components/product-card.tsx
import type { Product } from '@/core/api/directus'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
              Nuevo
            </span>
          )}
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs rounded">
              -{discount}%
            </span>
          )}
          {product.isLimited && (
            <span className="bg-yellow-500 text-black px-2 py-1 text-xs rounded">
              Limitado
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold">Agotado</span>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {product.colors.length} colores · {product.sizes.length} tallas
        </p>
      </div>
    </Link>
  )
}
```

## 🔄 Migración a Directus

Cuando estés listo para usar Directus en producción:

```typescript
// Opción A: Cambiar imports manualmente
- import { getAllProducts } from '@/core/api/products-local'
+ import { getAllProducts } from '@/core/api/directus'

// Opción B: Usar variable de entorno (recomendado)
// src/core/api/index.ts
const isDevelopment = process.env.NODE_ENV === 'development'
const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true'

if (isDevelopment && useLocal) {
  export * from './products-local'
} else {
  export * from './directus'
}

// Luego en tus componentes:
import { getAllProducts } from '@/core/api'
```

## 📝 Tips

1. **Imágenes Placeholder:** Mientras no tengas imágenes reales, usa:
   ```typescript
   const placeholderImage = 'https://placehold.co/600x800/1a1a1a/white?text=Product'
   ```

2. **Cache y Revalidación:** Los componentes server-side tienen ISR automático:
   ```typescript
   export const revalidate = 3600 // Revalidar cada hora
   ```

3. **TypeScript:** Todos los tipos están exportados desde `@/core/api/directus`:
   ```typescript
   import type { Product, Category } from '@/core/api/directus'
   ```

4. **Filtering:** Filtra en el servidor para mejor performance:
   ```typescript
   const featured = (await getAllProducts()).filter(p => p.featured)
   ```

## 🎯 Próximos Pasos

1. Agregar imágenes en `public/images/products/`
2. Crear tus componentes de UI (ProductCard, ProductGrid, etc.)
3. Implementar el carrito de compras
4. Configurar Directus cuando estés listo
5. Cambiar imports a `@/core/api/directus`

¡Listo para desarrollar! 🚀
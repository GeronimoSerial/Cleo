# 🚀 Products API - Cheatsheet

Referencia rápida para el sistema de productos local.

## 📥 Import

```typescript
// Desarrollo (Local)
import { getAllProducts, getProductBySlug } from '@/core/api/products-local'

// Producción (Directus)
import { getAllProducts, getProductBySlug } from '@/core/api/directus'

// Types
import type { Product, Category } from '@/core/api/directus'
```

## 🔧 API Functions

```typescript
// Todos los productos (en stock, ordenados)
const products = await getAllProducts()

// Producto por slug
const product = await getProductBySlug('oversized-hoodie-black')

// Productos por categoría
const hoodies = await getProductsByCategory('hoodies')

// Todas las categorías
const categories = await getAllCategories()

// Categoría por slug
const category = await getCategoryBySlug('jackets')

// Productos relacionados
const related = await getRelatedProducts(productId, 'hoodies', 3)
```

## 🎯 Filtros Comunes

```typescript
const all = await getAllProducts()

// Nuevos
const newProducts = all.filter(p => p.isNew)

// Best sellers
const bestSellers = all.filter(p => p.isBestSeller)

// Edición limitada
const limited = all.filter(p => p.isLimited)

// Destacados
const featured = all.filter(p => p.featured)

// En oferta
const onSale = all.filter(p => p.originalPrice)

// Por precio
const cheap = all.filter(p => p.price < 100)
const expensive = all.filter(p => p.price > 200)

// Por categoría
const jackets = all.filter(p => p.category === 'jackets')

// Combinados
const newBestSellers = all.filter(p => p.isNew && p.isBestSeller)
```

## 📦 Product Type

```typescript
interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number  // Si hay descuento
  description: string
  category: string
  images: string[]        // URLs completas
  isNew?: boolean
  isLimited?: boolean
  isBestSeller?: boolean
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}
```

## 📂 Categories

```typescript
// Slugs disponibles
'hoodies' | 'tees' | 'pants' | 'jackets' | 'footwear' | 'accessories'

// Category type
interface Category {
  slug: string
  name: string
  description?: string
  image?: string
  count?: number  // Número de productos
}
```

## 🎨 Ejemplos de Componentes

### Lista de Productos

```typescript
// app/products/page.tsx
import { getAllProducts } from '@/core/api/products-local'

export default async function ProductsPage() {
  const products = await getAllProducts()
  
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Producto Individual

```typescript
// app/products/[slug]/page.tsx
import { getProductBySlug } from '@/core/api/products-local'
import { notFound } from 'next/navigation'

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      {product.originalPrice && (
        <p className="line-through">${product.originalPrice}</p>
      )}
    </div>
  )
}
```

### Página de Categoría

```typescript
// app/category/[slug]/page.tsx
import { getProductsByCategory } from '@/core/api/products-local'

export default async function CategoryPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const products = await getProductsByCategory(params.slug)
  
  return (
    <div>
      <h1>Categoría: {params.slug}</h1>
      <div className="grid grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    </div>
  )
}
```

### Homepage con Secciones

```typescript
// app/page.tsx
import { getAllProducts } from '@/core/api/products-local'

export default async function HomePage() {
  const all = await getAllProducts()
  
  const featured = all.filter(p => p.featured).slice(0, 3)
  const newArrivals = all.filter(p => p.isNew).slice(0, 4)
  const bestSellers = all.filter(p => p.isBestSeller).slice(0, 4)
  
  return (
    <div>
      <section>
        <h2>Destacados</h2>
        {featured.map(p => <Card key={p.id} product={p} />)}
      </section>
      
      <section>
        <h2>Recién Llegados</h2>
        {newArrivals.map(p => <Card key={p.id} product={p} />)}
      </section>
      
      <section>
        <h2>Los Más Vendidos</h2>
        {bestSellers.map(p => <Card key={p.id} product={p} />)}
      </section>
    </div>
  )
}
```

## 🔄 SSG (Static Generation)

```typescript
// Generar rutas estáticas
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(p => ({ slug: p.slug }))
}

// O para categorías
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map(c => ({ slug: c.slug }))
}
```

## 🧪 Testing

```bash
# Ejecutar tests
npx tsx tests/local-products.test.ts

# Ver imágenes placeholder
npx tsx scripts/generate-placeholder-images.ts list

# Actualizar con placeholders
npx tsx scripts/generate-placeholder-images.ts update
```

## 🔄 Migración a Directus

```typescript
// 1. Cambiar import
- import { getAllProducts } from '@/core/api/products-local'
+ import { getAllProducts } from '@/core/api/directus'

// 2. O usar variable de entorno
// src/core/api/index.ts
export * from process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true' 
  ? './products-local' 
  : './directus'

// Luego importar desde:
import { getAllProducts } from '@/core/api'
```

## 📊 Estadísticas de Productos

```typescript
const all = await getAllProducts()

console.log(`Total: ${all.length}`)
console.log(`Nuevos: ${all.filter(p => p.isNew).length}`)
console.log(`Best sellers: ${all.filter(p => p.isBestSeller).length}`)
console.log(`Limitados: ${all.filter(p => p.isLimited).length}`)
console.log(`En oferta: ${all.filter(p => p.originalPrice).length}`)

// Precio promedio
const avg = all.reduce((sum, p) => sum + p.price, 0) / all.length
console.log(`Precio promedio: $${avg.toFixed(2)}`)

// Rango de precios
const prices = all.map(p => p.price).sort((a, b) => a - b)
console.log(`Más barato: $${prices[0]}`)
console.log(`Más caro: $${prices[prices.length - 1]}`)
```

## 💡 Tips

- ✅ Usa `products-local` en desarrollo
- ✅ Importa tipos desde `@/core/api/directus`
- ✅ Filtra en el servidor para mejor performance
- ✅ Usa Server Components cuando sea posible
- ✅ Los datos se cachean automáticamente (ISR)

## 📚 Más Info

- Setup completo: `data/SETUP.md`
- Ejemplos detallados: `data/USAGE_EXAMPLE.md`
- Documentación: `data/README.md`
- Sistema completo: `PRODUCTS_SYSTEM.md`

---

**¡Listo para desarrollar!** 🚀
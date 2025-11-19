# 📦 Sistema de Productos - Documentación Completa

Sistema de productos local para desarrollo con migración sencilla a Directus CMS.

## 🎯 Resumen

Este sistema proporciona:
- ✨ **20 productos ficticios** listos para usar
- 📦 **6 categorías** de streetwear (Hoodies, Tees, Pants, Jackets, Footwear, Accessories)
- 🔄 **Estructura 100% compatible con Directus**
- 🚀 **Migración sin refactoring** cuando estés listo
- 🧪 **Tests incluidos** para validación

## 📁 Archivos Creados

```
data/
├── products.json              # 20 productos con estructura Directus
├── README.md                  # Documentación detallada del sistema
├── USAGE_EXAMPLE.md           # Ejemplos prácticos en componentes
└── SETUP.md                   # Guía de instalación en 5 minutos

src/core/api/
├── directus.ts                # API de Directus (producción)
├── products-local.ts          # API local (desarrollo) ✨ NUEVO
└── products.ts                # Wrapper de compatibilidad

tests/
└── local-products.test.ts     # Suite de tests para validación

scripts/
└── generate-placeholder-images.ts  # Generador de imágenes placeholder
```

## 🚀 Quick Start

### 1. Verificar Instalación

```bash
# Ejecutar tests
npx tsx tests/local-products.test.ts

# Deberías ver: ✅ All tests completed!
```

### 2. Usar en Componentes

```typescript
// Importar la API local
import { getAllProducts, getProductBySlug } from '@/core/api/products-local'

// En un Server Component
export default async function ProductsPage() {
  const products = await getAllProducts()
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Configurar Placeholders (Opcional)

```bash
# Actualizar con imágenes placeholder
npx tsx scripts/generate-placeholder-images.ts update

# Ver lista de imágenes
npx tsx scripts/generate-placeholder-images.ts list
```

## 📊 Estructura de Datos

### Producto (DirectusProduct)

```typescript
{
  id: number                    // ID único
  nombre: string                // Nombre del producto
  precio: number                // Precio actual
  descuento?: number            // Porcentaje de descuento (0-100)
  descripcion: string           // Descripción detallada
  categoria: string             // Slug de categoría
  nuevo?: boolean               // Producto nuevo
  sizes: string[]               // Tallas disponibles
  colores: string[]             // Colores disponibles
  stock: boolean                // Disponibilidad
  slug: string                  // URL-friendly identifier
  imagenes: Array<{             // Relación con imágenes
    id: number
    Productos_id: number
    directus_files_id: string
  }>
  is_limited?: boolean          // Edición limitada
  is_best_seller?: boolean      // Best seller
  featured?: boolean            // Destacado
  destacado?: boolean           // Destacado (alias)
}
```

### Producto Mapeado (Product)

```typescript
{
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number        // Calculado desde descuento
  description: string
  category: string
  images: string[]              // URLs completas
  isNew?: boolean
  isLimited?: boolean
  isBestSeller?: boolean
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}
```

## 🔧 API Disponible

Todas las funciones están disponibles tanto en `products-local.ts` como en `directus.ts`:

```typescript
// Obtener todos los productos (filtrados por stock)
const products = await getAllProducts()

// Obtener producto por slug
const product = await getProductBySlug('oversized-hoodie-black')

// Obtener productos por categoría
const hoodies = await getProductsByCategory('hoodies')

// Obtener todas las categorías con conteo
const categories = await getAllCategories()

// Obtener categoría por slug
const category = await getCategoryBySlug('jackets')

// Obtener productos relacionados (misma categoría)
const related = await getRelatedProducts(productId, 'hoodies', 3)
```

## 📦 Productos Incluidos

### Distribución por Categoría

- **Hoodies**: 3 productos (Oversized, Zip, Crewneck)
- **Tees**: 3 productos (Graphic, Essential, Long Sleeve)
- **Pants**: 4 productos (Cargo, Tech, Jeans, Shorts)
- **Jackets**: 4 productos (Bomber, Denim, Parka, Windbreaker)
- **Footwear**: 2 productos (Sneakers, Boots)
- **Accessories**: 4 productos (Cap, Bag, Belt, Bucket Hat)

### Características Especiales

- ✨ **10 productos nuevos** (`nuevo: true`)
- 🔥 **11 best sellers** (`is_best_seller: true`)
- 💎 **3 ediciones limitadas** (`is_limited: true`)
- ⭐ **6 destacados** (`featured: true`)
- 🏷️ **7 con descuento** (10-25% off)

### Rango de Precios

- 💰 Más económico: $35.99 (Minimalist Cap)
- 💎 Más caro: $299.99 (Winter Parka Limited)
- 📊 Promedio: ~$115

## 🎨 Uso en Componentes

### Ejemplo: Página de Productos

```typescript
// app/products/page.tsx
import { getAllProducts } from '@/core/api/products-local'
import { ProductCard } from '@/features/catalog'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Todos los Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### Ejemplo: Producto Individual

```typescript
// app/products/[slug]/page.tsx
import { getProductBySlug, getRelatedProducts } from '@/core/api/products-local'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) notFound()
  
  const related = await getRelatedProducts(product.id, product.category, 3)

  return (
    <div className="container py-8">
      <h1>{product.name}</h1>
      <p className="text-3xl font-bold">${product.price}</p>
      {/* ... resto del componente */}
    </div>
  )
}
```

### Ejemplo: Homepage con Filtros

```typescript
// app/page.tsx
import { getAllProducts } from '@/core/api/products-local'

export default async function HomePage() {
  const allProducts = await getAllProducts()
  
  // Filtrar productos especiales
  const featured = allProducts.filter(p => p.featured).slice(0, 3)
  const newArrivals = allProducts.filter(p => p.isNew).slice(0, 4)
  const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <div className="container">
      <section>
        <h2>Destacados</h2>
        {/* Render featured */}
      </section>
      
      <section>
        <h2>Recién Llegados</h2>
        {/* Render new arrivals */}
      </section>
      
      <section>
        <h2>Los Más Vendidos</h2>
        {/* Render best sellers */}
      </section>
    </div>
  )
}
```

## 🖼️ Manejo de Imágenes

### Opción 1: Placeholders Automáticos (Recomendado)

```bash
npx tsx scripts/generate-placeholder-images.ts update
```

Esto configura URLs automáticas como:
```
https://placehold.co/600x800/1a1a1a/white?text=Product+Name
```

### Opción 2: Imágenes Propias

Crear directorio y agregar imágenes:

```
public/images/products/
├── hoodie-black-1.jpg
├── hoodie-black-2.jpg
├── cargo-pants-1.jpg
└── ...
```

### Opción 3: URLs Externas

Editar `src/core/api/products-local.ts`:

```typescript
const LOCAL_IMAGE_BASE = 'https://tu-cdn.com/images'
```

## 🔄 Migración a Directus

Cuando estés listo para producción:

### Paso 1: Configurar Directus

1. Crear colección `Productos` con los mismos campos
2. Importar datos desde `data/products.json`
3. Subir imágenes reales

### Paso 2: Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_DIRECTUS_URL=https://tu-instancia.directus.app
NEXT_PUBLIC_USE_LOCAL_DATA=false
```

### Paso 3: Cambiar Imports

**Opción A: Manual**
```typescript
- import { getAllProducts } from '@/core/api/products-local'
+ import { getAllProducts } from '@/core/api/directus'
```

**Opción B: Automática (Recomendada)**

Crear `src/core/api/index.ts`:

```typescript
const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true'

if (useLocal) {
  export * from './products-local'
} else {
  export * from './directus'
}
```

Luego usar:
```typescript
import { getAllProducts } from '@/core/api'
```

### Paso 4: Desplegar

¡Listo! Tu código sigue funcionando sin cambios.

## 🧪 Testing

### Ejecutar Tests

```bash
# Test completo
npx tsx tests/local-products.test.ts

# Ver lista de imágenes
npx tsx scripts/generate-placeholder-images.ts list

# Ver opciones de placeholder
npx tsx scripts/generate-placeholder-images.ts options
```

### Test Coverage

Los tests validan:
- ✅ Carga de todos los productos
- ✅ Búsqueda por slug
- ✅ Filtrado por categoría
- ✅ Obtención de categorías
- ✅ Productos relacionados
- ✅ Integridad de datos
- ✅ Validación de campos requeridos

## 🎯 Casos de Uso Comunes

### Filtrar Productos

```typescript
const products = await getAllProducts()

// Nuevos
const newProducts = products.filter(p => p.isNew)

// Best sellers
const bestSellers = products.filter(p => p.isBestSeller)

// En oferta
const onSale = products.filter(p => p.originalPrice)

// Por rango de precio
const affordable = products.filter(p => p.price < 100)
```

### Generar Static Params (SSG)

```typescript
// app/products/[slug]/page.tsx
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(p => ({ slug: p.slug }))
}
```

### Navegación por Categorías

```typescript
import { getAllCategories } from '@/core/api/products-local'

export async function CategoryNav() {
  const categories = await getAllCategories()
  
  return (
    <nav>
      {categories.map(cat => (
        <Link key={cat.slug} href={`/products/category/${cat.slug}`}>
          {cat.name} ({cat.count})
        </Link>
      ))}
    </nav>
  )
}
```

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `data/README.md` | Documentación completa del sistema de datos |
| `data/SETUP.md` | Guía de instalación en 5 minutos |
| `data/USAGE_EXAMPLE.md` | Ejemplos detallados de uso en componentes |
| `tests/local-products.test.ts` | Suite de tests con ejemplos |
| `scripts/generate-placeholder-images.ts` | Utilidad para placeholders |

## 🔧 Troubleshooting

### Error: Cannot find module

```bash
# Reinicia el dev server
pnpm dev
```

### TypeScript Errors

```typescript
// Importar tipos explícitamente
import type { Product, Category } from '@/core/api/directus'
```

### Imágenes no cargan

```bash
# Usar placeholders
npx tsx scripts/generate-placeholder-images.ts update
```

### Tests fallan

```bash
# Verificar que data/products.json existe
ls -la data/products.json

# Re-ejecutar
npx tsx tests/local-products.test.ts
```

## 💡 Best Practices

1. **Desarrollo**: Usa `products-local` para no depender de APIs externas
2. **Type Safety**: Importa tipos desde `@/core/api/directus`
3. **Performance**: Aprovecha el cache de Server Components
4. **Migración**: Usa variables de entorno para cambiar entre local/Directus
5. **Testing**: Ejecuta tests antes de commits importantes

## 🚀 Próximos Pasos

1. ✅ Sistema de productos funcionando
2. 🎨 Crear componentes de UI (ProductCard, ProductGrid, etc.)
3. 🛒 Implementar carrito de compras
4. 🔍 Agregar búsqueda y filtros avanzados
5. 💳 Integrar checkout
6. 🚀 Migrar a Directus cuando estés listo

## 📞 Soporte

- Documentación completa: `data/README.md`
- Ejemplos prácticos: `data/USAGE_EXAMPLE.md`
- Setup rápido: `data/SETUP.md`
- Types reference: `src/core/api/directus.ts`

---

**Sistema creado para facilitar el desarrollo local con migración zero-friction a Directus CMS** 🎉
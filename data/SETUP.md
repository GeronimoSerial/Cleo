# 🚀 Setup Rápido - Sistema de Productos Local

Guía de 5 minutos para tener el sistema de productos funcionando en desarrollo.

## ✅ ¿Qué incluye este sistema?

- ✨ **20 productos ficticios** listos para usar
- 📦 **6 categorías** de productos (Hoodies, Tees, Pants, Jackets, Footwear, Accessories)
- 🔄 **Estructura 100% compatible con Directus CMS**
- 🎯 **API idéntica** para migración sin refactoring
- 🧪 **Tests incluidos** para validar que todo funcione

## 📋 Pasos de Instalación

### 1. Estructura ya creada

Los archivos ya están en su lugar:

```
data/
├── products.json              # 20 productos ficticios
├── README.md                  # Documentación completa
├── USAGE_EXAMPLE.md           # Ejemplos de uso en componentes
└── SETUP.md                   # Esta guía

src/core/api/
├── directus.ts                # API de Directus (producción)
├── products-local.ts          # API local (desarrollo) ✨ NUEVO
└── products.ts                # Wrapper de compatibilidad

tests/
└── local-products.test.ts     # Tests de la API local
```

### 2. Verificar que funciona

Ejecuta el test:

```bash
npx tsx tests/local-products.test.ts
```

Deberías ver:
```
✅ Loaded 20 products
✅ All tests completed!
📊 Summary:
   Total products: 20
   Total categories: 6
   Validation errors: 0
```

### 3. Usar en tus componentes

**Opción A: Import directo (más simple)**

```typescript
// En cualquier componente o página
import { getAllProducts } from '@/core/api/products-local'

const products = await getAllProducts()
```

**Opción B: Variable de entorno (recomendado para producción)**

1. Crear `src/core/api/index.ts`:

```typescript
const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true'

if (useLocal) {
  export * from './products-local'
} else {
  export * from './directus'
}
```

2. Agregar a `.env.local`:

```env
NEXT_PUBLIC_USE_LOCAL_DATA=true
```

3. Importar desde el index:

```typescript
import { getAllProducts } from '@/core/api'
```

### 4. (Opcional) Agregar imágenes

Las imágenes están referenciadas pero no incluidas. Opciones:

**A. Placeholders temporales:**

```typescript
// Editar src/core/api/products-local.ts línea 14
const LOCAL_IMAGE_BASE = 'https://placehold.co/600x800/1a1a1a/white'
```

**B. Imágenes propias:**

Agregar en `public/images/products/`:

```
public/images/products/
├── hoodie-black-1.jpg
├── hoodie-black-2.jpg
├── cargo-pants-1.jpg
└── ...
```

## 🎯 Ejemplo Rápido

Crear una página de productos:

```typescript
// app/products/page.tsx
import { getAllProducts } from '@/core/api/products-local'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Productos</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-2xl">${product.price}</p>
            <p className="text-sm text-muted-foreground">
              {product.colors.length} colores · {product.sizes.length} tallas
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Visita `http://localhost:3000/products` y deberías ver 20 productos.

## 🔄 Migración a Directus (cuando estés listo)

1. **Configurar Directus** (después)
2. **Agregar variable de entorno:**
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=https://tu-instancia.directus.app
   NEXT_PUBLIC_USE_LOCAL_DATA=false
   ```
3. **Cambiar imports** (si usaste Opción A):
   ```typescript
   - import { getAllProducts } from '@/core/api/products-local'
   + import { getAllProducts } from '@/core/api/directus'
   ```

¡Listo! La API es idéntica, tu código sigue funcionando.

## 📚 Funciones Disponibles

```typescript
// Obtener todos los productos
const products = await getAllProducts()

// Obtener producto por slug
const product = await getProductBySlug('oversized-hoodie-black')

// Obtener productos por categoría
const hoodies = await getProductsByCategory('hoodies')

// Obtener todas las categorías
const categories = await getAllCategories()

// Obtener categoría por slug
const category = await getCategoryBySlug('jackets')

// Obtener productos relacionados
const related = await getRelatedProducts(productId, 'hoodies', 3)
```

## 🎨 Filtros Útiles

```typescript
const allProducts = await getAllProducts()

// Productos nuevos
const newProducts = allProducts.filter(p => p.isNew)

// Best sellers
const bestSellers = allProducts.filter(p => p.isBestSeller)

// Edición limitada
const limited = allProducts.filter(p => p.isLimited)

// Destacados en homepage
const featured = allProducts.filter(p => p.featured)

// En oferta (con descuento)
const onSale = allProducts.filter(p => p.originalPrice)
```

## 🐛 Troubleshooting

**Error: Cannot find module '@/../data/products.json'**
- Verifica que `data/products.json` existe en la raíz del proyecto

**Error: Module not found: Can't resolve '@/core/api/products-local'**
- Verifica `tsconfig.json` tenga los path aliases correctos
- Reinicia el dev server: `pnpm dev`

**Imágenes no cargan**
- Normal, necesitas agregar imágenes en `public/images/products/`
- Usa placeholders mientras tanto (ver paso 4)

**TypeScript errors**
- Asegúrate de importar los tipos:
  ```typescript
  import type { Product, Category } from '@/core/api/directus'
  ```

## 📖 Más Información

- **Documentación completa:** `data/README.md`
- **Ejemplos de uso:** `data/USAGE_EXAMPLE.md`
- **Estructura de datos:** `src/core/api/directus.ts`
- **Tests:** `tests/local-products.test.ts`

## 💡 Tips

1. **Desarrollo rápido:** Usa `products-local` para no depender de Directus
2. **Type safety:** Todos los tipos están en `@/core/api/directus`
3. **Performance:** Los componentes Server-side tienen cache automático
4. **Consistencia:** La estructura es idéntica a Directus, migración sin dolor

## ✨ Siguientes Pasos

1. ✅ Sistema de productos funcionando
2. 🎨 Crear componentes de UI (ProductCard, ProductGrid, etc.)
3. 🛒 Implementar carrito de compras
4. 🔍 Agregar búsqueda y filtros
5. 🚀 Cuando estés listo, migrar a Directus

---

**¿Preguntas?** Revisa `data/README.md` para más detalles.

**¿Todo funcionando?** ¡A desarrollar! 🚀
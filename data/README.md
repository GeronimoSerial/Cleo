# Local Products Data for Development

Este directorio contiene datos de productos ficticios para desarrollo local, con una estructura completamente compatible con Directus CMS para facilitar la migración futura.

## 📁 Estructura

```
data/
├── products.json    # Productos ficticios con estructura Directus
└── README.md        # Este archivo
```

## 🎯 Propósito

Proporcionar un entorno de desarrollo funcional sin necesidad de configurar Directus inmediatamente, mientras se mantiene una estructura de datos idéntica para que la migración a CMS sea trivial.

## 🔧 Uso en Desarrollo

### Opción 1: Usar el adaptador local (Recomendado)

El archivo `src/core/api/products-local.ts` es un adaptador que lee `products.json` y expone la misma API que `directus.ts`.

**Cambiar imports temporalmente:**

```typescript
// En lugar de:
import { getAllProducts, getProductBySlug } from '@/core/api/directus'

// Usar:
import { getAllProducts, getProductBySlug } from '@/core/api/products-local'
```

### Opción 2: Crear un archivo de configuración

Puedes crear un `src/core/api/index.ts` que exporte condicionalmente:

```typescript
// src/core/api/index.ts
const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true'

export * from USE_LOCAL ? './products-local' : './directus'
```

Luego en tus componentes:

```typescript
import { getAllProducts } from '@/core/api'
```

## 📊 Estructura de Datos

### Products

Cada producto sigue la interfaz `DirectusProduct`:

```typescript
{
  id: number
  nombre: string
  precio: number
  descuento?: number          // Porcentaje de descuento (0-100)
  descripcion: string
  categoria: string           // Slug de categoría
  nuevo?: boolean
  sizes: string[]
  colores: string[]
  stock: boolean
  slug: string               // URL-friendly identifier
  imagenes: Array<{
    id: number
    Productos_id: number
    directus_files_id: string  // Nombre del archivo
  }>
  is_limited?: boolean
  is_best_seller?: boolean
  featured?: boolean
  destacado?: boolean
}
```

### Categories

```typescript
{
  slug: string
  name: string
  description?: string
  image?: string
}
```

## 🖼️ Imágenes

Las imágenes están referenciadas pero necesitas agregarlas a `public/images/products/`:

```
public/
└── images/
    └── products/
        ├── hoodie-black-1.jpg
        ├── hoodie-black-2.jpg
        ├── cargo-pants-1.jpg
        └── ...
        └── categories/
            ├── category-hoodies.jpg
            ├── category-tees.jpg
            └── ...
```

**Tip:** Puedes usar placeholders temporales o imágenes de servicios como:
- https://placehold.co/600x800/1a1a1a/white
- https://picsum.photos/600/800

## 🔄 Migración a Directus

Cuando estés listo para migrar a Directus:

1. **Importar datos a Directus:**
   - Crea la colección `Productos` en Directus con los mismos campos
   - Importa el JSON o crea productos manualmente
   - Sube las imágenes a Directus

2. **Actualizar imports:**
   ```typescript
   // Cambiar de:
   import { getAllProducts } from '@/core/api/products-local'
   
   // A:
   import { getAllProducts } from '@/core/api/directus'
   ```

3. **Configurar variables de entorno:**
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=https://tu-instancia.directus.app
   ```

4. **¡Listo!** La API es idéntica, no necesitas cambiar lógica de negocio.

## 📦 Productos Incluidos

El archivo incluye 20 productos ficticios distribuidos en 6 categorías:

- **Hoodies** (3 productos)
- **Tees** (3 productos)
- **Pants** (4 productos)
- **Jackets** (4 productos)
- **Footwear** (2 productos)
- **Accessories** (4 productos)

### Características especiales:
- ✨ **Nuevos:** ~40% marcados como `nuevo: true`
- 🔥 **Best Sellers:** ~50% marcados como `is_best_seller: true`
- 💎 **Limited Edition:** 3 productos limitados
- 🏷️ **Con Descuento:** ~30% tienen descuentos del 10-25%
- ⭐ **Destacados:** 5 productos featured en homepage

## 🧪 Testing

Puedes probar la API local con:

```bash
# Desde la raíz del proyecto
npx tsx tests/local-products.test.ts
```

O crear un test rápido:

```typescript
import { getAllProducts } from '@/core/api/products-local'

const products = await getAllProducts()
console.log(`Loaded ${products.length} products`)
console.log('First product:', products[0])
```

## 🎨 Personalización

Para agregar más productos:

1. Abre `products.json`
2. Agrega un nuevo objeto en el array `products`
3. Mantén la estructura existente
4. Incrementa el `id` (siguiente disponible: 21)
5. Usa un `slug` único y descriptivo
6. Asigna una categoría existente o crea una nueva

## ⚠️ Notas Importantes

- **No commitear cambios de producción aquí:** Este archivo es solo para desarrollo
- **Imágenes no incluidas:** Necesitas agregar tus propias imágenes o usar placeholders
- **Estructura inmutable:** No cambies la estructura de los objetos, debe coincidir con Directus
- **Slugs únicos:** Asegúrate de que cada producto tenga un slug único

## 🚀 Ventajas de este Approach

✅ Desarrollo rápido sin dependencias externas
✅ Estructura idéntica a Directus
✅ Migración sin refactoring
✅ Testing fácil con datos predecibles
✅ Control de versiones de los datos de prueba
✅ No necesita API keys durante desarrollo

## 📚 Referencias

- Tipos de datos: `src/core/api/directus.ts`
- API local: `src/core/api/products-local.ts`
- Ejemplo de uso: `app/products/[segment]/page.tsx`

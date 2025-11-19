# 🚀 Quick Start - Nueva Estructura

## 📁 Estructura en 30 Segundos

```
src/
├── features/        👈 LO QUE HACE TU APP
│   ├── navigation/     🧭 Headers, menús, navegación
│   ├── catalog/        🏪 Listados, categorías, búsqueda
│   ├── product/        📦 Detalles de productos, galerías
│   ├── cart/           🛒 Carrito de compras
│   └── drops/          🚀 Lanzamientos especiales
│
├── core/            👈 LÓGICA DE NEGOCIO
│   ├── api/            🔌 Directus, Cloudflare, APIs
│   ├── types/          📝 Tipos del dominio
│   └── config/         ⚙️ Configuración
│
└── shared/          👈 CÓDIGO COMPARTIDO
    ├── ui/             🎨 Botones, cards, inputs
    ├── effects/        ✨ Animaciones, backgrounds
    ├── hooks/          🪝 useMediaQuery, etc.
    └── utils.ts        🔧 Funciones helper
```

---

## 💡 ¿Dónde Está Mi Código?

### Antes → Después

| Buscas... | Estaba en... | Ahora está en... |
|-----------|--------------|------------------|
| Header del sitio | `components/site-header.tsx` | `src/features/navigation/` |
| Carrusel de productos | `components/products/product-carousel.tsx` | `src/features/product/` |
| Hero de categoría | `components/category-hero.tsx` | `src/features/catalog/` |
| Ícono del carrito | `components/cart-icon.tsx` | `src/features/cart/` |
| API de Directus | `lib/directus-api.ts` | `src/core/api/directus.ts` |
| Utilidades | `lib/utils.ts` | `src/shared/utils.ts` |
| Componentes UI | `components/ui/*` | `src/shared/ui/*` |
| Efectos visuales | `components/global-rock-background.tsx` | `src/shared/effects/` |

---

## 🎯 Cómo Importar

### ✅ NUEVO (usa esto)
```typescript
// Features
import { SiteHeader, Logo } from '@/features/navigation';
import { ProductCarousel } from '@/features/product';
import { CategoryHero } from '@/features/catalog';
import { CartIcon } from '@/features/cart';

// Core API
import { getAllProducts, type Product } from '@/core/api';

// Shared
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { GlobalRockBackground } from '@/shared/effects';
```

### ❌ VIEJO (actualizar)
```typescript
// Ya no usar
import SiteHeader from '@/components/site-header';
import ProductCarousel from '@/components/products/product-carousel';
import { getAllProducts } from '@/lib/directus-api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

---

## 🛠️ Comandos Rápidos

```bash
# Ver la estructura
tree -L 3 src/

# Buscar imports viejos que necesitan actualización
grep -r "@/components" app/
grep -r "@/lib" app/

# Verificar TypeScript
npx tsc --noEmit

# Desarrollo
pnpm dev

# Build
pnpm build
```

---

## 📋 Checklist de Migración

```
□ 1. Leer src/README.md (arquitectura completa)
□ 2. Actualizar imports en app/layout.tsx
□ 3. Actualizar imports en app/page.tsx
□ 4. Actualizar imports en app/products/**/*.tsx
□ 5. Ejecutar npx tsc --noEmit
□ 6. Ejecutar pnpm dev y probar
□ 7. Ejecutar pnpm build
```

---

## 🎓 Agregar Nuevo Componente

### Pregúntate: "¿A qué FEATURE pertenece?"

```
¿Es de navegación? → src/features/navigation/components/
¿Es de producto?   → src/features/product/components/
¿Es de catálogo?   → src/features/catalog/components/
¿Es de carrito?    → src/features/cart/components/
¿Es UI primitivo?  → src/shared/ui/
¿Es un efecto?     → src/shared/effects/
```

### Pasos:

1. **Crear componente:**
   ```bash
   # Ejemplo: nuevo filtro de productos
   touch src/features/catalog/components/product-filter.tsx
   ```

2. **Exportar en index.ts:**
   ```typescript
   // src/features/catalog/index.ts
   export { default as ProductFilter } from './components/product-filter';
   ```

3. **Documentar en README:**
   ```markdown
   ### ProductFilter
   Filtro de productos por categoría, precio, etc.
   
   **Usage:**
   ```tsx
   import { ProductFilter } from '@/features/catalog';
   ```

4. **Usar:**
   ```typescript
   import { ProductFilter } from '@/features/catalog';
   ```

---

## 🚨 Reglas de Oro

### ✅ SÍ HACER
- Importar via barrel exports: `@/features/navigation`
- Mantener código relacionado junto
- Documentar en el README de la feature
- Usar nombres que describan el negocio

### ❌ NO HACER
- Importar directamente: `@/features/product/components/internal/thing`
- Crear dependencias circulares entre features
- Poner lógica de negocio en `shared/`
- Importar de `@/app` desde features

---

## 🔍 Referencia Rápida de Paths

```typescript
// Features (capacidades de negocio)
@/features/navigation
@/features/catalog
@/features/product
@/features/cart
@/features/drops

// Core (lógica central)
@/core/api
@/core/types
@/core/config

// Shared (compartido)
@/shared/ui
@/shared/effects
@/shared/hooks
@/shared/utils
```

---

## 📚 Docs Completas

| Documento | Para qué |
|-----------|----------|
| `src/README.md` | 📘 Arquitectura completa |
| `MIGRATION_GUIDE.md` | 🔄 Guía de migración paso a paso |
| `STRUCTURE_COMPARISON.md` | 🔍 Comparación antes/después |
| `REORGANIZATION_SUMMARY.md` | 📊 Resumen de cambios |
| `src/features/README.md` | 🎯 Guía de features |
| `src/features/[feature]/README.md` | 📦 Docs de cada feature |

---

## 💡 Ejemplos Prácticos

### Crear nueva página de producto

```typescript
// app/products/[slug]/page.tsx
import { ProductCarousel, ProductDetails, RelatedProducts } from '@/features/product';
import { getAllProducts } from '@/core/api';

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  
  return (
    <>
      <ProductCarousel images={product.images} />
      <ProductDetails product={product} />
      <RelatedProducts category={product.category} />
    </>
  );
}
```

### Crear layout con navegación

```typescript
// app/layout.tsx
import { SiteHeader } from '@/features/navigation';
import { GlobalRockBackground } from '@/shared/effects';
import { ThemeProvider } from '@/shared/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <SiteHeader />
          <GlobalRockBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 🎉 ¡Listo!

Ahora tu proyecto tiene una arquitectura que:
- 📢 Grita sobre lo que hace
- 🧭 Es fácil de navegar
- 🚀 Es fácil de escalar
- 👥 Es clara para cualquier dev

---

**Next Steps:**
1. Migra los imports (ver `MIGRATION_GUIDE.md`)
2. Prueba que todo funciona (`pnpm dev`)
3. ¡Sigue desarrollando! 🚀

---

_💪 Tu código ahora está organizado como un profesional._
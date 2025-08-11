# Plan de Migración: Datos Locales → API DIRECTUS CMS

## 📋 Resumen Ejecutivo

Este documento detalla la migración completa del sistema de obtención de datos de productos desde archivos JSON locales hacia la API de DIRECTUS CMS (`https://devcms.geroserial.com/items/Productos`), implementando invalidación de caché por webhook y optimizando el rendimiento.

---

## 🔄 1. Análisis del Flujo Actual

### Arquitectura Actual

```mermaid
graph TD
    A[/data/products.json] --> B[/lib/products-data.ts]
    A --> C[/lib/products-api.ts]
    B --> D[components/products-homepage.tsx]
    B --> E[app/products/page.tsx]
    C --> F[app/products/[segment]/page.tsx]
    C --> G[app/products/[segment]/ProductClientPage.tsx]

    H[generateStaticParams] --> A
    I[Build Time] --> H
    J[Static Generation] --> I
```

### Flujo de Datos Actual

1. **Datos Estáticos**: Productos y categorías almacenados en `/data/products.json`
2. **Funciones Helper**:
   - `products-data.ts`: Funciones síncronas para acceso directo
   - `products-api.ts`: Funciones asíncronas que simulan API calls
3. **Generación Estática**: `generateStaticParams()` crea rutas en build time
4. **Renderizado**: Server Components consumen datos directamente

### Puntos de Consumo Identificados

| Archivo                                        | Función Utilizada                            | Propósito                          |
| ---------------------------------------------- | -------------------------------------------- | ---------------------------------- |
| `components/products-homepage.tsx`             | `getAllProducts()`                           | Lista de productos destacados      |
| `app/products/page.tsx`                        | `getAllProducts()`, `categories`             | Página principal de productos      |
| `app/products/[segment]/page.tsx`              | `getAllProducts()`                           | Generación de rutas estáticas      |
| `app/products/[segment]/ProductClientPage.tsx` | `getProductBySlug()`, `getRelatedProducts()` | Detalle de producto y relacionados |

---

## 🚀 2. Nuevo Flujo con API DIRECTUS

### Arquitectura Objetivo

```mermaid
graph TD
    A[DIRECTUS CMS API] --> B[/lib/directus-api.ts]
    B --> C[Cache Layer - Next.js]
    C --> D[Server Components]

    E[Webhook Endpoint] --> F[revalidateTag/revalidatePath]
    F --> G[Cache Invalidation]
    G --> C

    H[Error Boundary] --> D
    I[Fallback Data] --> H

    J[ISR with revalidate: false] --> C
    K[On-Demand Revalidation] --> J
```

### Endpoints y Configuración DIRECTUS

#### Endpoint Principal

```
GET https://devcms.geroserial.com/items/Productos
```

#### Análisis de Estructura Real de la API

**Llamada de prueba realizada:**

```bash
curl "https://devcms.geroserial.com/items/Productos?limit=1"
```

**Respuesta actual de la API:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "CLEO Premium Gray Hoodie",
      "precio": 30000,
      "descuento": 15,
      "descripcion": "Premium gray hoodie with subtle rock-inspired details...",
      "categoria": "hoddies",
      "nuevo": true,
      "sizes": ["XS", "S", "M", "L", "XXL"],
      "colores": ["Gray", "Light Gray"],
      "stock": true,
      "slug": "cleo-premium-gray-hoodie",
      "imagenes": [1]
    }
  ]
}
```

#### Diferencias Identificadas con Datos Locales

| Campo Local     | Campo DIRECTUS | Tipo    | Observaciones                      |
| --------------- | -------------- | ------- | ---------------------------------- |
| `name`          | `nombre`       | string  | Campos en español                  |
| `price`         | `precio`       | number  | 30000 (pesos argentinos)           |
| `originalPrice` | `descuento`    | number  | Porcentaje de descuento (15 = 15%) |
| `description`   | `descripcion`  | string  | Mismo contenido                    |
| `category`      | `categoria`    | string  | Typo: "hoddies" vs "hoodies"       |
| `isNew`         | `nuevo`        | boolean | Traducido al español               |
| `sizes`         | `sizes`        | array   | Mismo formato                      |
| `colors`        | `colores`      | array   | Traducido al español               |
| `inStock`       | `stock`        | boolean | Simplificado                       |
| `slug`          | `slug`         | string  | Mismo formato                      |
| `images`        | `imagenes`     | array   | IDs para `/assets/{id}`            |
| `isLimited`     | ❌             | -       | **Opcional - agregar después**     |
| `isBestSeller`  | ❌             | -       | **Opcional - agregar después**     |
| `featured`      | ❌             | -       | **Opcional - agregar después**     |

#### Arquitectura de Datos Confirmada

- **Categorías**: No hay colección separada, se extraen del campo `categoria` de productos
- **Imágenes**: Acceso directo vía `/assets/{id}`, no requiere endpoint `/files/`
- **Precios**: Directamente en pesos argentinos, no centavos
- **Estado actual**: Solo 1 producto en la API

#### Parámetros de Query Recomendados

```typescript
interface DirectusQueryParams {
  // Filtros (adaptados a campos reales)
  filter?: {
    stock: { _eq: true };
    nuevo?: { _eq: true };
    categoria?: { _eq: string };
  };
  // Campos específicos para optimizar payload
  fields?: string[];
  // Ordenamiento
  sort?: string[];
  // Paginación
  limit?: number;
  offset?: number;
}
```

#### Configuración de Revalidación

```typescript
// En cada función de fetch
const response = await fetch(url, {
  next: {
    revalidate: false, // Desactiva revalidación automática
    tags: ["products"], // Tag para invalidación selectiva
  },
});
```

#### Configuración de Revalidación

```typescript
// En cada función de fetch
const response = await fetch(url, {
  next: {
    revalidate: false, // Desactiva revalidación automática
    tags: ["products"], // Tag para invalidación selectiva
  },
});
```

---

## 💻 3. Implementación en Next.js

### 3.1 Nueva Capa de API - `/lib/directus-api.ts`

```typescript
import { unstable_cache } from "next/cache";

// Tipos actualizados para DIRECTUS (basados en API real)
export interface DirectusProduct {
  id: number;
  nombre: string;
  precio: number; // Pesos argentinos directos
  descuento?: number; // Porcentaje de descuento (entero: 15 = 15%)
  descripcion: string;
  categoria: string;
  nuevo?: boolean;
  sizes: string[];
  colores: string[];
  stock: boolean;
  slug: string;
  imagenes: number[]; // Array de IDs de archivos para /assets/{id}

  // Campos opcionales para agregar después
  is_limited?: boolean;
  is_best_seller?: boolean;
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  count?: number; // Cantidad de productos en la categoría
}

// Configuración base
const DIRECTUS_URL =
  process.env.DIRECTUS_URL || "https://devcms.geroserial.com";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

// Headers para autenticación (opcional para productos públicos)
const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(DIRECTUS_TOKEN && { Authorization: `Bearer ${DIRECTUS_TOKEN}` }),
});

// Función base para fetch con error handling
async function directusFetch<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${DIRECTUS_URL}/items/${endpoint}`);

  // Agregar parámetros de query
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: getHeaders(),
      next: {
        revalidate: false,
        tags: [endpoint],
      },
    });

    if (!response.ok) {
      throw new Error(
        `DIRECTUS API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Función para obtener URL de imagen
function getImageUrl(imageId: number): string {
  return `${DIRECTUS_URL}/assets/${imageId}`;
}

// Extraer categorías únicas de productos
function extractCategoriesFromProducts(
  products: DirectusProduct[]
): Category[] {
  const categoryMap = new Map<string, Category>();

  products.forEach((product) => {
    const slug = product.categoria;
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1), // Capitalizar
        count: 0,
      });
    }
    categoryMap.get(slug)!.count!++;
  });

  return Array.from(categoryMap.values());
}

// Mapeo de datos DIRECTUS → Formato App (actualizado con campos reales)
function mapProduct(directusProduct: DirectusProduct): Product {
  // Calcular precio original a partir del descuento
  const originalPrice = directusProduct.descuento
    ? directusProduct.precio / (1 - directusProduct.descuento / 100)
    : undefined;

  return {
    id: directusProduct.id,
    slug: directusProduct.slug,
    name: directusProduct.nombre,
    price: directusProduct.precio, // Ya en pesos argentinos
    originalPrice: originalPrice ? Math.round(originalPrice) : undefined,
    description: directusProduct.descripcion,
    category: directusProduct.categoria,
    images: directusProduct.imagenes.map((imageId) => getImageUrl(imageId)),
    isNew: directusProduct.nuevo || false,
    isLimited: directusProduct.is_limited || false, // Opcional
    isBestSeller: directusProduct.is_best_seller || false, // Opcional
    sizes: directusProduct.sizes || [],
    colors: directusProduct.colores || [],
    inStock: directusProduct.stock,
    featured: directusProduct.featured || false, // Opcional
  };
}

// Funciones públicas con cache
export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const directusProducts = await directusFetch<DirectusProduct[]>(
        "Productos",
        {
          filter: { stock: { _eq: true } },
          sort: ["-nuevo", "-id"],
          fields: ["*"],
        }
      );

      return directusProducts.map(mapProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback a datos locales en caso de error
      const { products } = await import("@/data/products.json");
      return products;
    }
  },
  ["all-products"],
  {
    revalidate: false,
    tags: ["products"],
  }
);

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | undefined> => {
    try {
      const directusProducts = await directusFetch<DirectusProduct[]>(
        "Productos",
        {
          filter: {
            slug: { _eq: slug },
            stock: { _eq: true },
          },
          fields: ["*"],
          limit: 1,
        }
      );

      if (directusProducts.length === 0) return undefined;
      return mapProduct(directusProducts[0]);
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      // Fallback a datos locales
      const { products } = await import("@/data/products.json");
      return products.find((p) => p.slug === slug);
    }
  },
  ["product-by-slug"],
  {
    revalidate: false,
    tags: ["products"],
  }
);

export const getProductsByCategory = unstable_cache(
  async (category: string): Promise<Product[]> => {
    try {
      const directusProducts = await directusFetch<DirectusProduct[]>(
        "Productos",
        {
          filter: {
            categoria: { _eq: category },
            stock: { _eq: true },
          },
          fields: ["*"],
          sort: ["-nuevo", "-id"],
        }
      );

      return directusProducts.map(mapProduct);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      const { products } = await import("@/data/products.json");
      return products.filter((p) => p.category === category);
    }
  },
  ["products-by-category"],
  {
    revalidate: false,
    tags: ["products"],
  }
);

export const getAllCategories = unstable_cache(
  async (): Promise<Category[]> => {
    try {
      // Obtener todas las categorías extrayéndolas de los productos
      const directusProducts = await directusFetch<DirectusProduct[]>(
        "Productos",
        {
          filter: { stock: { _eq: true } },
          fields: ["categoria"],
        }
      );

      return extractCategoriesFromProducts(directusProducts);
    } catch (error) {
      console.error("Error fetching categories from products:", error);
      // Fallback a datos locales
      const { categories } = await import("@/data/products.json");
      return categories;
    }
  },
  ["all-categories"],
  {
    revalidate: false,
    tags: ["products"], // Usar mismo tag que productos ya que depende de ellos
  }
);

export const getRelatedProducts = unstable_cache(
  async (
    productId: number,
    category: string,
    limit = 3
  ): Promise<Product[]> => {
    try {
      const directusProducts = await directusFetch<DirectusProduct[]>(
        "Productos",
        {
          filter: {
            categoria: { _eq: category },
            id: { _neq: productId },
            stock: { _eq: true },
          },
          fields: ["*"],
          limit,
          sort: ["-nuevo", "-id"],
        }
      );

      return directusProducts.map(mapProduct);
    } catch (error) {
      console.error(`Error fetching related products:`, error);
      const { products } = await import("@/data/products.json");
      return products
        .filter((p) => p.category === category && p.id !== productId)
        .slice(0, limit);
    }
  },
  ["related-products"],
  {
    revalidate: false,
    tags: ["products"],
  }
);
```

### 3.2 Webhook para Invalidación de Caché - `/app/api/webhook/revalidate/route.ts`

```typescript
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.DIRECTUS_WEBHOOK_SECRET;

// Verificar firma del webhook (seguridad)
function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return false;

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-directus-signature") || "";

    // Verificar autenticidad del webhook
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);

    // Determinar qué cache invalidar basado en el evento
    switch (payload.event) {
      case "items.create":
      case "items.update":
      case "items.delete":
        if (payload.collection === "Productos") {
          await revalidateTag("products");
          console.log("✅ Products cache invalidated");
          // Las categorías también se invalidan ya que se extraen de productos
        }
        break;

      default:
        console.log(`ℹ️ Unhandled webhook event: ${payload.event}`);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Endpoint GET para health check
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    endpoint: "webhook-revalidate",
    timestamp: new Date().toISOString(),
  });
}
```

### 3.3 Variables de Entorno - `.env.local`

```bash
# DIRECTUS Configuration
DIRECTUS_URL=https://devcms.geroserial.com
DIRECTUS_TOKEN=your_directus_token_here
DIRECTUS_WEBHOOK_SECRET=your_webhook_secret_here

# Next.js Revalidation
REVALIDATE_TOKEN=your_revalidate_token_here
```

---

## 🧪 4. Plan de Pruebas

### 4.1 Pruebas de Integración con API

```typescript
// /tests/directus-api.test.ts
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { getAllProducts, getProductBySlug } from "@/lib/directus-api";

describe("DIRECTUS API Integration", () => {
  beforeAll(() => {
    // Setup test environment
    process.env.DIRECTUS_URL = "https://devcms.geroserial.com";
  });

  it("should fetch all products successfully", async () => {
    const products = await getAllProducts();
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("should fetch product by slug", async () => {
    const product = await getProductBySlug("cleo-premium-gray-hoodie");
    expect(product).toBeDefined();
    expect(product?.slug).toBe("cleo-premium-gray-hoodie");
    expect(product?.name).toBe("CLEO Premium Gray Hoodie");
  });

  it("should handle non-existent product gracefully", async () => {
    const product = await getProductBySlug("non-existent-product");
    expect(product).toBeUndefined();
  });

  it("should correctly map DIRECTUS fields to app format", async () => {
    const product = await getProductBySlug("cleo-premium-gray-hoodie");
    expect(product).toBeDefined();

    if (product) {
      // Verificar mapeo de campos
      expect(typeof product.name).toBe("string"); // nombre → name
      expect(typeof product.price).toBe("number"); // precio → price (pesos argentinos)
      expect(typeof product.inStock).toBe("boolean"); // stock → inStock
      expect(Array.isArray(product.sizes)).toBe(true); // sizes mantiene formato
      expect(Array.isArray(product.colors)).toBe(true); // colores → colors
      expect(Array.isArray(product.images)).toBe(true); // imagenes → images (URLs)

      // Verificar que el precio está en pesos argentinos directamente
      expect(product.price).toBe(30000); // Precio directo en pesos

      // Verificar URLs de imágenes con assets
      product.images.forEach((imageUrl) => {
        expect(imageUrl).toMatch(
          /^https:\/\/devcms\.geroserial\.com\/assets\/\d+$/
        );
      });

      // Verificar campos opcionales (default false hasta que se agreguen)
      expect(typeof product.isLimited).toBe("boolean");
      expect(typeof product.isBestSeller).toBe("boolean");
      expect(typeof product.featured).toBe("boolean");
    }
  });

  it("should handle discount calculation correctly", async () => {
    const products = await getAllProducts();
    const productWithDiscount = products.find((p) => p.originalPrice);

    if (productWithDiscount) {
      expect(productWithDiscount.originalPrice).toBeGreaterThan(
        productWithDiscount.price
      );

      // Verificar cálculo de descuento (15% → precio original = precio / 0.85)
      const expectedOriginal = Math.round(productWithDiscount.price / 0.85);
      expect(productWithDiscount.originalPrice).toBe(expectedOriginal);
    }
  });

  it("should extract categories from products correctly", async () => {
    const categories = await getAllCategories();
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);

    // Verificar que cada categoría tiene los campos necesarios
    categories.forEach((category) => {
      expect(category.slug).toBeDefined();
      expect(category.name).toBeDefined();
      expect(typeof category.count).toBe("number");
    });
  });
});
```

### 4.2 Pruebas de Invalidación de Caché

```typescript
// /tests/webhook-revalidation.test.ts
import { describe, it, expect } from "@jest/globals";

describe("Webhook Cache Invalidation", () => {
  it("should invalidate cache on product update", async () => {
    // Simular webhook payload
    const payload = {
      event: "items.update",
      collection: "Productos",
      key: "1",
      data: { name: "Updated Product Name" },
    };

    const response = await fetch("/api/webhook/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-directus-signature": "valid_signature",
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.revalidated).toBe(true);
  });
});
```

### 4.3 Pruebas de Fallback

```typescript
// /tests/fallback-behavior.test.ts
describe("API Fallback Behavior", () => {
  it("should fallback to local data when API fails", async () => {
    // Simular fallo de API
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const products = await getAllProducts();
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);

    // Restaurar fetch original
    global.fetch = originalFetch;
  });
});
```

### 4.4 Pruebas de Performance

```bash
#!/bin/bash
# /scripts/performance-test.sh

echo "🚀 Running Performance Tests..."

# Test API response time
echo "Testing API response time..."
curl -w "@curl-format.txt" -o /dev/null -s "https://devcms.geroserial.com/items/Productos"

# Test webhook endpoint
echo "Testing webhook endpoint..."
time curl -X POST http://localhost:3000/api/webhook/revalidate \
  -H "Content-Type: application/json" \
  -d '{"event":"items.update","collection":"Productos"}'

# Load testing with autocannon
echo "Running load test..."
npx autocannon -c 10 -d 30s http://localhost:3000/products
```

---

## 🔒 5. Consideraciones de Seguridad

### 5.1 Autenticación y Autorización

```typescript
// /lib/security.ts
export class DirectusSecurityManager {
  private static validateToken(token: string): boolean {
    // Validar formato y expiración del token
    return token.length > 32 && token.startsWith("directus_");
  }

  static getSecureHeaders(): Record<string, string> {
    const token = process.env.DIRECTUS_TOKEN;

    if (!token || !this.validateToken(token)) {
      throw new Error("Invalid or missing DIRECTUS_TOKEN");
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Cleo-Frontend/1.0",
    };
  }
}
```

### 5.2 Rate Limiting

```typescript
// /lib/rate-limiter.ts
import { LRUCache } from "lru-cache";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options: Options = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject(new Error("Rate limit exceeded"));
        } else {
          resolve();
        }
      }),
  };
}

// Uso en webhook
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500, // Limit cada IP a 500 requests por ventana
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";

  try {
    await limiter.check(10, ip); // 10 requests por minuto por IP
  } catch {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // ... resto del handler
}
```

### 5.3 Validación de Datos

```typescript
// /lib/validation.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().positive(),
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  description: z.string().min(1),
  category: z.string().min(1),
  images: z.array(z.string().url()),
  isNew: z.boolean().optional(),
  isLimited: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  inStock: z.boolean(),
  featured: z.boolean(),
});

export function validateProduct(data: unknown): Product {
  try {
    return ProductSchema.parse(data);
  } catch (error) {
    console.error("Product validation failed:", error);
    throw new Error("Invalid product data received from API");
  }
}
```

### 5.4 Sanitización de Datos

```typescript
// /lib/sanitizer.ts
import DOMPurify from "isomorphic-dompurify";

export function sanitizeProductData(product: DirectusProduct): Product {
  return {
    ...product,
    name: DOMPurify.sanitize(product.name),
    description: DOMPurify.sanitize(product.description),
    category: DOMPurify.sanitize(product.category),
  };
}
```

---

## 📊 6. Monitoreo y Observabilidad

### 6.1 Logging Estructurado

```typescript
// /lib/logger.ts
export class APILogger {
  static logAPICall(endpoint: string, duration: number, success: boolean) {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        type: "api_call",
        endpoint,
        duration_ms: duration,
        success,
        environment: process.env.NODE_ENV,
      })
    );
  }

  static logCacheInvalidation(tags: string[]) {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        type: "cache_invalidation",
        tags,
        environment: process.env.NODE_ENV,
      })
    );
  }
}
```

### 6.2 Métricas de Performance

```typescript
// /lib/metrics.ts
export class PerformanceMetrics {
  static async measureAPICall<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    const start = performance.now();

    try {
      const result = await operation();
      const duration = performance.now() - start;

      APILogger.logAPICall(operationName, duration, true);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      APILogger.logAPICall(operationName, duration, false);
      throw error;
    }
  }
}
```

---

## 🚀 7. Estrategia de Despliegue

### 7.1 Despliegue Gradual (Blue-Green)

```yaml
# /deploy/blue-green-strategy.yml
deployment_strategy:
  type: "blue-green"
  phases:
    1_preparation:
      - name: "Setup DIRECTUS environment variables"
        action: "Configure production secrets"

      - name: "Deploy webhook endpoint"
        action: "Deploy /api/webhook/revalidate to blue environment"

      - name: "Test API connectivity"
        action: "Verify DIRECTUS API accessibility"

    2_gradual_migration:
      - name: "Feature flag activation"
        action: "Enable DIRECTUS API for 10% of traffic"
        rollback_trigger: "Error rate > 1%"

      - name: "Monitor and validate"
        action: "Check performance metrics for 30 minutes"

      - name: "Scale to 50% traffic"
        action: "Increase DIRECTUS API usage"
        rollback_trigger: "Response time > 2s average"

    3_full_migration:
      - name: "100% traffic to new API"
        action: "Complete migration to DIRECTUS"

      - name: "Remove fallback code"
        action: "Clean up local JSON dependencies"

rollback_plan:
  triggers:
    - "API error rate > 2%"
    - "Response time degradation > 50%"
    - "Cache invalidation failures"

  actions:
    - "Revert to local JSON data source"
    - "Disable webhook endpoint"
    - "Restore previous deployment"
```

### 7.2 Scripts de Despliegue

```bash
#!/bin/bash
# /scripts/deploy-migration.sh

set -e

echo "🚀 Starting CLEO DIRECTUS Migration Deployment"

# Verificar variables de entorno
if [[ -z "$DIRECTUS_URL" || -z "$DIRECTUS_TOKEN" ]]; then
  echo "❌ Missing required environment variables"
  exit 1
fi

# Fase 1: Preparación
echo "📋 Phase 1: Preparation"
echo "Testing DIRECTUS API connectivity..."
curl -f "$DIRECTUS_URL/items/Productos?limit=1" \
  -H "Authorization: Bearer $DIRECTUS_TOKEN" || {
  echo "❌ DIRECTUS API test failed"
  exit 1
}

# Fase 2: Deployment
echo "🔄 Phase 2: Deployment"
echo "Building application..."
npm run build

echo "Running migration tests..."
npm run test:migration

# Fase 3: Validación
echo "✅ Phase 3: Validation"
echo "Starting application..."
npm start &
APP_PID=$!

# Esperar que la app esté lista
sleep 10

# Test de smoke
echo "Running smoke tests..."
curl -f "http://localhost:3000/products" || {
  echo "❌ Smoke test failed"
  kill $APP_PID
  exit 1
}

echo "✅ Migration deployment completed successfully"
```

### 7.3 Rollback Plan

```bash
#!/bin/bash
# /scripts/rollback.sh

echo "🔄 Initiating rollback to local data source"

# 1. Revertir a la versión anterior
git checkout HEAD~1

# 2. Restaurar dependencias locales
npm install

# 3. Rebuild con datos locales
npm run build

# 4. Validar funcionamiento
npm run test:local-data

echo "✅ Rollback completed - Application using local data"
```

---

## 📝 8. Checklist de Validación Final

### Pre-deployment

- [ ] Variables de entorno configuradas en producción
- [ ] Webhook endpoint configurado en DIRECTUS
- [ ] Tests de integración pasando
- [ ] Performance benchmarks establecidos
- [ ] Plan de rollback documentado y probado

### Post-deployment

- [ ] API responses correctas en todos los endpoints
- [ ] Cache invalidation funcionando vía webhook
- [ ] Performance igual o mejor que implementación anterior
- [ ] Error handling y fallbacks operativos
- [ ] Monitoring y alertas configuradas

### Monitoring Dashboard

```typescript
// /monitoring/dashboard-metrics.ts
export const MetricsDashboard = {
  api_calls: {
    total_requests: "Count of API calls to DIRECTUS",
    success_rate: "Percentage of successful API calls",
    average_response_time: "Average API response time in ms",
    p95_response_time: "95th percentile response time",
  },

  cache_operations: {
    invalidations_count: "Number of cache invalidations",
    cache_hit_rate: "Percentage of cache hits vs misses",
    webhook_success_rate: "Webhook processing success rate",
  },

  business_metrics: {
    products_served: "Total products served to users",
    page_load_times: "Frontend page load performance",
    user_experience_score: "Core Web Vitals metrics",
  },
};
```

---

## 🎯 9. Resultados Esperados

### Performance Improvements

- **Response Time**: Mantenimiento de tiempos de respuesta < 200ms para cached content
- **SEO**: Preservación de beneficios de Static Generation
- **Scalability**: Capacidad de manejar updates de contenido en tiempo real

### Operational Benefits

- **Content Management**: Editores pueden actualizar productos via DIRECTUS CMS
- **Real-time Updates**: Cambios reflejados inmediatamente vía webhook invalidation
- **Maintainability**: Separación clara entre contenido y código

### Risk Mitigation

- **Fallback Strategy**: Datos locales como backup en caso de API failure
- **Monitoring**: Alertas tempranas para detectar issues
- **Rollback Capability**: Capacidad de revertir a sistema anterior en < 5 minutos

### Consideraciones Adicionales Basadas en API Real

#### Gestión de Categorías

No existe colección separada `/items/Categorias`. Las categorías se extraen dinámicamente del campo `categoria` de cada producto:

```typescript
// Extracción automática de categorías
const extractCategoriesFromProducts = (
  products: DirectusProduct[]
): Category[] => {
  const categoryMap = new Map<string, Category>();

  products.forEach((product) => {
    const slug = product.categoria;
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        count: 0,
      });
    }
    categoryMap.get(slug)!.count!++;
  });

  return Array.from(categoryMap.values());
};
```

#### Campos Opcionales para Futuro

Los siguientes campos pueden agregarse gradualmente a DIRECTUS:

```typescript
interface FutureDirectusProduct extends DirectusProduct {
  is_limited?: boolean; // Productos edición limitada
  is_best_seller?: boolean; // Productos más vendidos
  featured?: boolean; // Productos destacados
}
```

**Implementación por fases**:

1. **Fase 1**: Migración básica con campos actuales
2. **Fase 2**: Agregar `is_limited` para productos especiales
3. **Fase 3**: Agregar `is_best_seller` basado en métricas de ventas
4. **Fase 4**: Agregar `featured` para destacados en homepage

#### Gestión de Precios e Imágenes

- **Precios**: Directamente en pesos argentinos (no conversión necesaria)
- **Descuentos**: Entero que representa porcentaje (15 = 15% off)
- **Imágenes**: Acceso directo vía `/assets/{id}` sin necesidad de endpoint `/files/`

#### Recomendaciones Técnicas

```typescript
// Precio original basado en descuento
const calculateOriginalPrice = (precio: number, descuento: number): number =>
  Math.round(precio / (1 - descuento / 100));

// URL de imagen simplificada
const getImageUrl = (imageId: number): string =>
  `${DIRECTUS_URL}/assets/${imageId}`;

// Validación de categoría para evitar typos
const normalizeCategory = (categoria: string): string =>
  categoria.toLowerCase().replace("hoddies", "hoodies");
```

---

**📧 Contacto**: Para dudas técnicas sobre esta migración, contactar al equipo de desarrollo.

**📅 Timeline**: La implementación completa está estimada en 2-3 sprints (4-6 semanas) incluyendo testing y deployment gradual.

/**
 * Versión de prueba de la API DIRECTUS sin unstable_cache
 * Para testing fuera del contexto de Next.js
 */

// Tipos (mismo que directus-api.ts)
export interface DirectusProduct {
  id: number
  nombre: string
  precio: number
  descuento?: number
  descripcion: string
  categoria: string
  nuevo?: boolean
  sizes: string[]
  colores: string[]
  stock: boolean
  slug: string
  imagenes: number[]
  is_limited?: boolean
  is_best_seller?: boolean
  featured?: boolean
}

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  images: string[]
  isNew?: boolean
  isLimited?: boolean
  isBestSeller?: boolean
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}

export interface Category {
  slug: string
  name: string
  description?: string
  image?: string
  count?: number
}

// Configuración
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://devcms.geroserial.com'
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(DIRECTUS_TOKEN && { 'Authorization': `Bearer ${DIRECTUS_TOKEN}` })
})

// Fetch sin cache
async function directusFetch<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(`${DIRECTUS_URL}/items/${endpoint}`)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
      }
    })
  }

  const response = await fetch(url.toString(), {
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`DIRECTUS API Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.data
}

function getImageUrl(imageId: number): string {
  return `${DIRECTUS_URL}/assets/${imageId}`
}

function extractCategoriesFromProducts(products: DirectusProduct[]): Category[] {
  const categoryMap = new Map<string, Category>()
  
  products.forEach(product => {
    const slug = product.categoria
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        count: 0
      })
    }
    categoryMap.get(slug)!.count!++
  })
  
  return Array.from(categoryMap.values())
}

function mapProduct(directusProduct: DirectusProduct): Product {
  const originalPrice = directusProduct.descuento 
    ? directusProduct.precio / (1 - directusProduct.descuento / 100)
    : undefined

  return {
    id: directusProduct.id,
    slug: directusProduct.slug,
    name: directusProduct.nombre,
    price: directusProduct.precio,
    originalPrice: originalPrice ? Math.round(originalPrice) : undefined,
    description: directusProduct.descripcion,
    category: directusProduct.categoria,
    images: directusProduct.imagenes.map(imageId => getImageUrl(imageId)),
    isNew: directusProduct.nuevo || false,
    isLimited: directusProduct.is_limited || false,
    isBestSeller: directusProduct.is_best_seller || false,
    sizes: directusProduct.sizes || [],
    colors: directusProduct.colores || [],
    inStock: directusProduct.stock,
    featured: directusProduct.featured || false
  }
}

// Funciones públicas sin cache
export async function getAllProducts(): Promise<Product[]> {
  try {
    const directusProducts = await directusFetch<DirectusProduct[]>('Productos', {
      filter: { stock: { _eq: true } },
      sort: ['-nuevo', '-id'],
      fields: ['*']
    })
    
    return directusProducts.map(mapProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback a datos locales
    const fs = await import('fs')
    const path = await import('path')
    const dataPath = path.join(process.cwd(), 'data', 'products.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return data.products
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const directusProducts = await directusFetch<DirectusProduct[]>('Productos', {
      filter: { 
        slug: { _eq: slug },
        stock: { _eq: true }
      },
      fields: ['*'],
      limit: 1
    })
    
    if (directusProducts.length === 0) return undefined
    return mapProduct(directusProducts[0])
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error)
    // Fallback a datos locales
    const fs = await import('fs')
    const path = await import('path')
    const dataPath = path.join(process.cwd(), 'data', 'products.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return data.products.find((p: any) => p.slug === slug)
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const directusProducts = await directusFetch<DirectusProduct[]>('Productos', {
      filter: { stock: { _eq: true } },
      fields: ['categoria']
    })
    
    return extractCategoriesFromProducts(directusProducts)
  } catch (error) {
    console.error('Error fetching categories from products:', error)
    // Fallback a datos locales
    const fs = await import('fs')
    const path = await import('path')
    const dataPath = path.join(process.cwd(), 'data', 'products.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return data.categories
  }
}

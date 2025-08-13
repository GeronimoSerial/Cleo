// Tipos para Directus
export interface DirectusImageRelation {
  id: number
  Productos_id: number
  directus_files_id: string
}

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
  imagenes: DirectusImageRelation[]
  is_limited?: boolean
  is_best_seller?: boolean
  featured?: boolean
  destacado?: boolean
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

const DIRECTUS_URL = 'https://devcms.geroserial.com'

// Función para obtener URL de imagen
function getImageUrl(imageRelation: DirectusImageRelation): string {
  return `${DIRECTUS_URL}/assets/${imageRelation.directus_files_id}`
}

// Mapeo de datos
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
    images: directusProduct.imagenes.map(imageRelation => getImageUrl(imageRelation)),
    isNew: directusProduct.nuevo || false,
    isLimited: directusProduct.is_limited || false,
    isBestSeller: directusProduct.is_best_seller || false,
    sizes: directusProduct.sizes || [],
    colors: directusProduct.colores || [],
    inStock: directusProduct.stock,
    featured: directusProduct.destacado || directusProduct.featured || false
  }
}

// Obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${DIRECTUS_URL}/items/Productos?filter[stock][_eq]=true&sort=-nuevo,-id&fields=*,imagenes.*`, {
    next: { 
      revalidate: 3600,
      tags: ['products'] 
    }
  })
  
  const data = await response.json()
  return data.data.map(mapProduct)
}

// Obtener producto por slug
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const response = await fetch(`${DIRECTUS_URL}/items/Productos?filter[slug][_eq]=${slug}&filter[stock][_eq]=true&fields=*,imagenes.*&limit=1`, {
    next: { 
      revalidate: 3600,
      tags: ['products'] 
    }
  })
  
  const data = await response.json()
  return data.data.length > 0 ? mapProduct(data.data[0]) : undefined
}

// Obtener productos por categoría
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${DIRECTUS_URL}/items/Productos?filter[categoria][_eq]=${category}&filter[stock][_eq]=true&fields=*,imagenes.*&sort=-nuevo,-id`, {
    next: { 
      revalidate: 3600,
      tags: ['products'] 
    }
  })
  
  const data = await response.json()
  return data.data.map(mapProduct)
}

// Obtener todas las categorías
export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${DIRECTUS_URL}/items/Productos?filter[stock][_eq]=true&fields=categoria`, {
    next: { 
      revalidate: 3600,
      tags: ['products'] 
    }
  })
  
  const data = await response.json()
  const categoryMap = new Map<string, Category>()
  
  data.data.forEach((product: DirectusProduct) => {
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

// Obtener productos relacionados
export async function getRelatedProducts(productId: number, category: string, limit = 3): Promise<Product[]> {
  const response = await fetch(`${DIRECTUS_URL}/items/Productos?filter[categoria][_eq]=${category}&filter[id][_neq]=${productId}&filter[stock][_eq]=true&fields=*,imagenes.*&limit=${limit}&sort=-nuevo,-id`, {
    next: { 
      revalidate: 3600,
      tags: ['products'] 
    }
  })
  
  const data = await response.json()
  return data.data.map(mapProduct)
}

// Obtener categoría por slug
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getAllCategories()
  return categories.find(category => category.slug === slug)
}

import productsData from "@/data/products.json"

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
  description: string
  image: string
}

export interface ProductsData {
  categories: Category[]
  products: Product[]
}

// Simulate API delay for realistic behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProductsData(): Promise<ProductsData> {
  await delay(100) // Simulate API call
  return productsData as ProductsData
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const data = await getProductsData()
  return data.products.find((product) => product.slug === slug)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.category === category)
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const data = await getProductsData()
  return data.categories.find((category) => category.slug === slug)
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await getProductsData()
  return data.products
}

export async function getNewArrivals(): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.isNew)
}

export async function getLimitedEdition(): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.isLimited)
}

export async function getBestSellers(): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.isBestSeller)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.featured)
}

export async function getRelatedProducts(productId: number, category: string, limit = 3): Promise<Product[]> {
  const data = await getProductsData()
  return data.products.filter((product) => product.category === category && product.id !== productId).slice(0, limit)
}

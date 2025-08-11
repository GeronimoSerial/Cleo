/**
 * Nueva versión de products-api.ts con integración DIRECTUS
 * Mantiene la misma interfaz pero usa DIRECTUS como fuente principal
 */

// Re-exportar desde la nueva API de DIRECTUS
export {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getAllCategories,
  getRelatedProducts,
  getCategoryBySlug,
  type Product,
  type Category,
  type DirectusProduct
} from './directus-api'

import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getAllCategories,
  getRelatedProducts,
  getCategoryBySlug
} from './directus-api'

// Función auxiliar para mantener compatibilidad
export async function getProductsData() {
  const products = await getAllProducts()
  const categories = await getAllCategories()
  
  return {
    products,
    categories
  }
}

// Export default para compatibilidad con imports existentes
const productsApi = {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getAllCategories,
  getRelatedProducts,
  getCategoryBySlug,
  getProductsData
}

export default productsApi

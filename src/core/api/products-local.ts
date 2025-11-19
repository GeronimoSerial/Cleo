/**
 * Local Products API - Development adapter
 * Uses /data/products.json for development
 * Drop-in replacement for directus.ts during development
 *
 * To use: change imports from '@/core/api/directus' to '@/core/api/products-local'
 * Migration to Directus: just revert the imports back to directus.ts
 */

import productsData from "@/../data/products.json";
import type { DirectusProduct, Product, Category } from "./directus";

// Base URL for local images (you can change this to your public folder structure)
const LOCAL_IMAGE_BASE = "/images/products";

/**
 * Generates placeholder image URLs for local development
 */
function getLocalImageUrl(fileId: string): string {
  // Extract product name from fileId for better placeholder text
  const productName = fileId
    .replace(/\.(jpg|png|webp)$/i, "")
    .replace(/-/g, " ");
  return `https://placehold.co/600x800/1a1a1a/white?text=${encodeURIComponent(productName)}`;
}

/**
 * Maps DirectusProduct structure to Product interface
 * Same logic as in directus.ts for consistency
 */
function mapProduct(directusProduct: DirectusProduct): Product {
  const originalPrice = directusProduct.descuento
    ? directusProduct.precio / (1 - directusProduct.descuento / 100)
    : undefined;

  return {
    id: directusProduct.id,
    slug: directusProduct.slug,
    name: directusProduct.nombre,
    price: directusProduct.precio,
    originalPrice: originalPrice ? Math.round(originalPrice) : undefined,
    description: directusProduct.descripcion,
    category: directusProduct.categoria,
    images: directusProduct.imagenes.map((img) =>
      getLocalImageUrl(img.directus_files_id),
    ),
    isNew: directusProduct.nuevo || false,
    isLimited: directusProduct.is_limited || false,
    isBestSeller: directusProduct.is_best_seller || false,
    sizes: directusProduct.sizes || [],
    colors: directusProduct.colores || [],
    inStock: directusProduct.stock,
    featured: directusProduct.destacado || directusProduct.featured || false,
  };
}

/**
 * Get all products
 * Filters only products in stock and sorts by new/id
 */
export async function getAllProducts(): Promise<Product[]> {
  // Simulate async API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  const products = productsData.products
    .filter((p) => p.stock)
    .sort((a, b) => {
      // Sort by nuevo (new) first, then by id descending
      if (a.nuevo && !b.nuevo) return -1;
      if (!a.nuevo && b.nuevo) return 1;
      return b.id - a.id;
    })
    .map(mapProduct);

  return products;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const product = productsData.products.find((p) => p.slug === slug && p.stock);

  return product ? mapProduct(product) : undefined;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const products = productsData.products
    .filter((p) => p.categoria === category && p.stock)
    .sort((a, b) => {
      if (a.nuevo && !b.nuevo) return -1;
      if (!a.nuevo && b.nuevo) return 1;
      return b.id - a.id;
    })
    .map(mapProduct);

  return products;
}

/**
 * Get all categories with product counts
 */
export async function getAllCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Count products per category
  const categoryMap = new Map<string, number>();

  productsData.products
    .filter((p) => p.stock)
    .forEach((product) => {
      const count = categoryMap.get(product.categoria) || 0;
      categoryMap.set(product.categoria, count + 1);
    });

  // Map to Category objects with data from productsData.categories
  const categories: Category[] = productsData.categories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
    image: cat.image
      ? `${LOCAL_IMAGE_BASE}/categories/${cat.image}`
      : undefined,
    count: categoryMap.get(cat.slug) || 0,
  }));

  return categories;
}

/**
 * Get related products (same category, different product)
 */
export async function getRelatedProducts(
  productId: number,
  category: string,
  limit = 3,
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const products = productsData.products
    .filter((p) => p.categoria === category && p.id !== productId && p.stock)
    .sort((a, b) => {
      if (a.nuevo && !b.nuevo) return -1;
      if (!a.nuevo && b.nuevo) return 1;
      return b.id - a.id;
    })
    .slice(0, limit)
    .map(mapProduct);

  return products;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const categories = await getAllCategories();
  return categories.find((cat) => cat.slug === slug);
}

// Re-export types for convenience
export type { Product, Category, DirectusProduct };

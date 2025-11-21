import { Product } from "./strapi";

export function mapStrapiProduct(item: any): Product {
  // Strapi v5: datos vienen directamente sin wrapper "attributes"
  return {
    id: item.id,
    documentId: item.documentId,
    nombre: item.nombre,
    descripcion: item.descripcion,
    precio: item.precio,
    stock: item.stock,
    tags: item.tags,
    slug: item.slug,

    // fotos: array directo sin wrapper "data"
    fotos: item.fotos?.map((f: any) => ({
      id: f.id,
      url: f.url,
      alternativeText: f.alternativeText,
    })),

    // sizes: array directo sin wrapper "data"
    sizes: item.sizes?.map((s: any) => ({
      id: s.id,
      size: s.size,
    })),

    // category: objeto directo o null
    category: item.category
      ? {
          id: item.category.id,
          nombre: item.category.nombre,
          slug: item.category.slug,
          descripcion: item.category.descripcion,
        }
      : undefined,

    // drop: objeto directo o null
    drop: item.drop
      ? {
          id: item.drop.id,
          nombre: item.drop.nombre,
          slug: item.drop.slug,
        }
      : undefined,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
  };
}

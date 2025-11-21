import qs from "qs";
import { Product } from "@/interfaces/product";
import { Category } from "@/interfaces/category";
import { StrapiResponse } from "@/interfaces/strapiresponse";
import { mapStrapiProduct } from "./productMapper";

const BASE_URL = "http://localhost:1337";

// Interfaces para los datos de Strapi

// Función base para obtener datos de Strapi
export async function getStrapiData(url: string) {
  "use cache";
  try {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from Strapi: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
}

// Construir query string para populate
const productQuery = () => {
  return qs.stringify(
    {
      populate: [
        "fotos", // Campo: Multiple Media
        "category", // Relación: manyToOne
        "drop", // Relación: manyToOne
        "sizes", // Relación: oneToMany
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
};

// Obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  const query = productQuery();
  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener un producto por slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);
  const item = response?.data?.[0];

  if (!item) return null;
  return item ? mapStrapiProduct(item) : null;
}

//   if (!response || !response.data || response.data.length === 0) {
//     return null;
//   }

//     return response.data[0];

// Obtener productos por categoría
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const query = qs.stringify(
    {
      filters: {
        category: {
          slug: {
            $eq: categorySlug,
          },
        },
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener productos por drop
export async function getProductsByDrop(dropSlug: string): Promise<Product[]> {
  const query = qs.stringify(
    {
      filters: {
        drop: {
          slug: {
            $eq: dropSlug,
          },
        },
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener productos por tags
export async function getProductsByTag(tag: string): Promise<Product[]> {
  const query = qs.stringify(
    {
      filters: {
        tags: {
          $contains: tag,
        },
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener últimos productos (latest arrivals)
export async function getLatestProducts(limit = 3): Promise<Product[]> {
  const query = qs.stringify(
    {
      sort: ["createdAt:desc"],
      pagination: {
        limit: limit,
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener productos destacados (featured)
export async function getFeaturedProducts(): Promise<Product[]> {
  const query = qs.stringify(
    {
      filters: {
        tags: {
          $contains: "featured",
        },
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// Obtener productos relacionados (misma categoría, excluyendo el producto actual)
export async function getRelatedProducts(
  productId: number,
  categorySlug: string,
  limit = 3
): Promise<Product[]> {
  const query = qs.stringify(
    {
      filters: {
        id: {
          $ne: productId,
        },
        category: {
          slug: {
            $eq: categorySlug,
          },
        },
      },
      pagination: {
        limit: limit,
      },
      populate: ["fotos", "category", "drop", "sizes"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/productos?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data.map(mapStrapiProduct);
}

// === FUNCIONES PARA CATEGORÍAS ===

// Obtener todas las categorías
export async function getAllCategories(): Promise<Category[]> {
  const query = qs.stringify(
    {
      populate: ["imagen"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/categories?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

// Obtener una categoría por slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["imagen"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/categories?${query}`);

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}

// === FUNCIONES PARA DROPS ===

// Obtener todos los drops
export async function getAllDrops() {
  const query = qs.stringify(
    {
      populate: ["imagen", "productos"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/drops?${query}`);

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

// Obtener un drop por slug
export async function getDropBySlug(slug: string) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["imagen", "productos"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await getStrapiData(`/api/drops?${query}`);

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}

// Utilidad: Construir URL completa para imágenes de Strapi
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return "";

  // Si la URL ya es completa, devolverla tal cual
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Si es una URL relativa, añadir el BASE_URL
  return `${BASE_URL}${url}`;
}

#!/usr/bin/env node

const DIRECTUS_URL = "https://devcms.geroserial.com";

// Función para obtener URL de imagen
function getImageUrl(imageRelation) {
  return `${DIRECTUS_URL}/assets/${imageRelation.directus_files_id}`;
}

// Mapeo de datos
function mapProduct(directusProduct) {
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
    images: directusProduct.imagenes.map((imageRelation) =>
      getImageUrl(imageRelation)
    ),
    isNew: directusProduct.nuevo || false,
    isLimited: directusProduct.is_limited || false,
    isBestSeller: directusProduct.is_best_seller || false,
    sizes: directusProduct.sizes || [],
    colors: directusProduct.colores || [],
    inStock: directusProduct.stock,
    featured: directusProduct.featured || false,
  };
}

// Probar la API
async function testAPI() {
  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/Productos?filter[stock][_eq]=true&sort=-nuevo,-id&fields=*,imagenes.*&limit=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Response:");
    console.log(JSON.stringify(data, null, 2));

    if (data.data && data.data.length > 0) {
      const product = mapProduct(data.data[0]);
      console.log("\nMapped Product:");
      console.log(JSON.stringify(product, null, 2));

      console.log("\nImage URLs:");
      product.images.forEach((url, index) => {
        console.log(`Image ${index + 1}: ${url}`);
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testAPI();

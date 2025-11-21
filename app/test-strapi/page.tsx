import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getLatestProducts,
  getFeaturedProducts,
  getAllCategories,
  getCategoryBySlug,
  getStrapiMediaUrl,
} from "@/lib/strapi";

export default async function TestStrapiPage() {
  // Test 1: Obtener todos los productos
  const allProducts = await getAllProducts();

  // Test 2: Obtener producto por slug (usando el primero de la lista)
  const firstProductSlug = allProducts[0]?.slug || "";
  const productBySlug = firstProductSlug
    ? await getProductBySlug(firstProductSlug)
    : null;

  // Test 3: Obtener últimos 3 productos
  const latestProducts = await getLatestProducts(3);

  // Test 4: Obtener productos destacados
  const featuredProducts = await getFeaturedProducts();

  // Test 5: Obtener todas las categorías
  const allCategories = await getAllCategories();

  // Test 6: Obtener productos por categoría (usando la primera categoría)
  const firstCategorySlug = allCategories[0]?.slug || "";
  const productsByCategory = firstCategorySlug
    ? await getProductsByCategory(firstCategorySlug)
    : [];

  // Test 7: Obtener categoría por slug
  const categoryBySlug = firstCategorySlug
    ? await getCategoryBySlug(firstCategorySlug)
    : null;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🧪 Test de Funciones Strapi</h1>

      {/* Test 1 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">✅ Test 1: getAllProducts()</h2>
        <p className="text-green-400 mb-2">
          Total de productos: {allProducts.length}
        </p>
        <div className="space-y-2">
          {allProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white/5 p-3 rounded">
              <p className="font-bold">{product.nombre}</p>
              <p className="text-sm text-gray-400">Slug: {product.slug}</p>
              <p className="text-sm text-gray-400">
                Precio: ${product.precio?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Fotos: {product.fotos?.length || 0}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Test 2 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 2: getProductBySlug()
        </h2>
        {productBySlug ? (
          <div className="bg-white/5 p-4 rounded">
            <p className="font-bold text-xl mb-2">{productBySlug.nombre}</p>
            <p className="text-gray-300 mb-2">{productBySlug.descripcion}</p>
            <p className="text-green-400">
              Precio: ${productBySlug.precio?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Categoría: {productBySlug.category?.nombre || "N/A"}
            </p>
            <p className="text-sm text-gray-400">
              Stock: {productBySlug.stock || "N/A"}
            </p>
            <p className="text-sm text-gray-400">
              Sizes: {productBySlug.sizes?.length || 0}
            </p>
            {productBySlug.fotos && productBySlug.fotos.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-400">Primera foto URL:</p>
                <p className="text-xs text-blue-400 break-all">
                  {getStrapiMediaUrl(productBySlug.fotos[0].url)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-400">No se encontró el producto</p>
        )}
      </section>

      {/* Test 3 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 3: getLatestProducts(3)
        </h2>
        <p className="text-green-400 mb-2">
          Últimos {latestProducts.length} productos
        </p>
        <div className="space-y-2">
          {latestProducts.map((product) => (
            <div key={product.id} className="bg-white/5 p-3 rounded">
              <p className="font-bold">{product.nombre}</p>
              <p className="text-sm text-gray-400">
                Creado: {new Date(product.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Test 4 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 4: getFeaturedProducts()
        </h2>
        <p className="text-green-400 mb-2">
          Productos destacados: {featuredProducts.length}
        </p>
        <div className="space-y-2">
          {featuredProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white/5 p-3 rounded">
              <p className="font-bold">{product.nombre}</p>
              <p className="text-sm text-gray-400">
                Tags: {product.tags?.join(", ") || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Test 5 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 5: getAllCategories()
        </h2>
        <p className="text-green-400 mb-2">
          Total categorías: {allCategories.length}
        </p>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category.id} className="bg-white/5 p-3 rounded">
              <p className="font-bold">{category.nombre}</p>
              <p className="text-sm text-gray-400">Slug: {category.slug}</p>
              <p className="text-sm text-gray-300">{category.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Test 6 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 6: getProductsByCategory()
        </h2>
        <p className="text-green-400 mb-2">
          Productos en categoría "{categoryBySlug?.nombre}":{" "}
          {productsByCategory.length}
        </p>
        <div className="space-y-2">
          {productsByCategory.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white/5 p-3 rounded">
              <p className="font-bold">{product.nombre}</p>
              <p className="text-sm text-gray-400">
                Categoría: {product.category?.nombre}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Test 7 */}
      <section className="mb-12 border border-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ✅ Test 7: getCategoryBySlug()
        </h2>
        {categoryBySlug ? (
          <div className="bg-white/5 p-4 rounded">
            <p className="font-bold text-xl">{categoryBySlug.nombre}</p>
            <p className="text-gray-300 mt-2">{categoryBySlug.descripcion}</p>
            <p className="text-sm text-gray-400 mt-2">
              Slug: {categoryBySlug.slug}
            </p>
            {categoryBySlug.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-400">Imagen URL:</p>
                <p className="text-xs text-blue-400 break-all">
                  {getStrapiMediaUrl(categoryBySlug.imagen.url)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-400">No se encontró la categoría</p>
        )}
      </section>

      {/* Resumen */}
      <section className="border border-green-500/50 bg-green-500/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          📊 Resumen de Tests
        </h2>
        <ul className="space-y-2">
          <li>✅ getAllProducts: {allProducts.length} productos</li>
          <li>
            ✅ getProductBySlug: {productBySlug ? "Funcionando" : "Error"}
          </li>
          <li>✅ getLatestProducts: {latestProducts.length} productos</li>
          <li>✅ getFeaturedProducts: {featuredProducts.length} productos</li>
          <li>✅ getAllCategories: {allCategories.length} categorías</li>
          <li>
            ✅ getProductsByCategory: {productsByCategory.length} productos
          </li>
          <li>
            ✅ getCategoryBySlug: {categoryBySlug ? "Funcionando" : "Error"}
          </li>
        </ul>
      </section>
    </div>
  );
}

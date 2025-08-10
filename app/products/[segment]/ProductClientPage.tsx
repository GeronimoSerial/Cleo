import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageGalleryDark } from "@/components/product-image-gallery-dark";
import { ProductSelectorDark } from "@/components/product-selector-dark";
import { ProductDetailGalleryDark } from "@/components/product-detail-gallery-dark";
import { RelatedProductsDark } from "@/components/related-products-dark";
import { StickyWhatsAppButtonDark } from "@/components/sticky-whatsapp-button-dark";
import { DynamicProductCard } from "@/components/dynamic-product-card";
import { CategoryHero } from "@/components/category-hero";
import {
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/lib/products-api";

interface ProductPageProps {
  params: {
    segment: string;
  };
}

export default async function ProductClientPage({ params }: ProductPageProps) {
  const { segment } = params;

  // Try to find a product first
  const product = await getProductBySlug(segment);

  if (product) {
    // This is an individual product page
    const relatedProducts = await getRelatedProducts(
      product.id,
      product.category
    );

    return (
      <main className="min-h-screen bg-dark-900 relative">
        {/* Rock-themed Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${5 + i * 8}%`,
                opacity: 0.4 - i * 0.03,
              }}
            />
          ))}
          {/* Guitar pick shapes */}
          <div
            className="absolute top-1/4 right-8 w-4 h-5 bg-white opacity-10"
            style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
          />
          <div
            className="absolute bottom-1/3 left-12 w-3 h-4 bg-white opacity-10"
            style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-20 md:pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-dark-600 hover:border-gray-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Productos</span>
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  CLEO
                </h1>
                <p className="text-sm md:text-base text-gray-400">
                  STREETSWEAR & ROCK
                </p>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </div>

        {/* Product Hero Section */}
        <div className="relative z-10 pb-12 md:pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="order-1">
                <ProductImageGalleryDark
                  images={product.images}
                  productName={product.name}
                />
              </div>

              {/* Product Info */}
              <div className="order-2">
                <ProductSelectorDark product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Gallery */}
        <div className="relative z-10 py-12 md:py-16 bg-dark-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <ProductDetailGalleryDark productName={product.name} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="relative z-10 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <RelatedProductsDark products={relatedProducts} />
            </div>
          </div>
        )}

        {/* Final CTA Section */}
        <div className="relative z-10 bg-dark-800 py-12 border-t border-dark-600">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              ¿Listo para Rockear tu Estilo?
            </h3>
            <p className="text-gray-300 mb-6">
              Envío gratis a nivel nacional • Entrega en 24h • Cambios gratis en
              tienda
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-105 transition-all duration-300"
              size="lg"
              // onClick={() => {
              //   const message = `¡Hola! Estoy interesado en ${product.name}`;
              //   const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
              //     message
              //   )}`;
              //   window.open(whatsappUrl, "_blank");
              // }}
            >
              Comprar por WhatsApp
            </Button>
          </div>
        </div>

        {/* Sticky WhatsApp Button */}
        <StickyWhatsAppButtonDark product={product} />
      </main>
    );
  }

  // Try to find a category
  const category = await getCategoryBySlug(segment);

  if (category) {
    // This is a category page - keep existing category page logic
    const categoryProducts = await getProductsByCategory(segment);

    return (
      <main className="min-h-screen bg-dark-900 relative">
        {/* Rock-themed Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${10 + i * 9}%`,
                opacity: 0.3 - i * 0.03,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-10 pt-20 md:pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Products</span>
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  CLEO
                </h1>
                <p className="text-sm md:text-base text-gray-400">
                  STREETSWEAR & ROCK
                </p>
              </div>
              <div className="w-32"></div>
            </div>

            {/* Category Hero */}
            <CategoryHero
              category={category}
              productCount={categoryProducts.length}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative z-10 pb-12 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {categoryProducts.map((product) => (
                  <DynamicProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No products found in this category.
                </p>
                <Link href="/products">
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Neither product nor category found
  notFound();
}

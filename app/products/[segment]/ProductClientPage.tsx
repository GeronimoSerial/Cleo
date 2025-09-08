import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageGalleryDark } from "@/components/products/details/product-image-gallery-dark";
import { ProductDetailGalleryDark } from "@/components/products/details/product-detail-gallery-dark";
import { RelatedProductsDark } from "@/components/related-products-dark";
import { StickyWhatsAppButtonDark } from "@/components/sticky-whatsapp-button-dark";

import { getProductBySlug, getRelatedProducts } from "@/lib/directus-api";

interface ProductPageProps {
  params: {
    segment: string;
  };
}

export default async function ProductClientPage({ params }: ProductPageProps) {
  const { segment } = await params;

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
              <Link href="/">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-dark-600 hover:border-gray-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </Button>
              </Link>
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
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:transform hover:scale-105 transition-all duration-300"
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
  notFound();
}

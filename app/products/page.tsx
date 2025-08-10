import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DynamicProductCard } from "@/components/dynamic-product-card";
import { RockSoundWave } from "@/components/rock-sound-wave";
import { Card } from "@/components/ui/card";
import { getAllProducts, categories } from "@/lib/products-data";
import Image from "next/image";

export default function ProductsPage() {
  const allProducts = getAllProducts();

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
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 md:pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
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

          {/* Page Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              ALL PRODUCTS
            </h2>
            <p className="text-gray-400 text-lg md:text-xl tracking-wide mb-6">
              WHERE STREET MEETS ROCK
            </p>
            <RockSoundWave />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="relative z-10 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6 md:mb-8 text-center">
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {categories.map((category) => (
              <Link key={category.slug} href={`/products/${category.slug}`}>
                <Card className="bg-dark-800 border-dark-600 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-500 group cursor-pointer">
                  <div className="relative aspect-video">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {category.name.toUpperCase()}
                      </h4>
                      <p className="text-sm md:text-base text-gray-200">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="relative z-10 pb-12 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6 md:mb-8 text-center">
            All Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {allProducts.map((product) => (
              <DynamicProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

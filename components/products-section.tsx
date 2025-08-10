"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { RockSoundWave } from "./rock-sound-wave"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "CLEO Classic Black Hoodie",
    price: 149.99,
    originalPrice: 179.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "CLEO Premium Gray Hoodie",
    price: 154.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    id: 3,
    name: "CLEO Signature Navy Hoodie",
    price: 159.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    id: 4,
    name: "CLEO Limited Edition Rock Hoodie",
    price: 199.99,
    originalPrice: 249.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    isLimited: true,
  },
  {
    id: 5,
    name: "CLEO Street Rebel Hoodie",
    price: 164.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    isNew: true,
  },
  {
    id: 6,
    name: "CLEO Underground Hoodie",
    price: 174.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
]

const categories = ["All", "New Arrivals", "Limited Edition", "Best Sellers"]

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleProducts, setVisibleProducts] = useState(6)

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true
    if (selectedCategory === "New Arrivals") return product.isNew
    if (selectedCategory === "Limited Edition") return product.isLimited
    if (selectedCategory === "Best Sellers") return product.id <= 3
    return true
  })

  const displayedProducts = filteredProducts.slice(0, visibleProducts)

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 3, filteredProducts.length))
  }

  return (
    <section id="products-section" className="w-full py-12 md:py-16 lg:py-24 bg-dark-900 relative">
      {/* Rock-themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Guitar fret lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-white"
            style={{
              top: `${15 + i * 10}%`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}

        {/* Floating music notes */}
        <div
          className="absolute top-1/4 left-1/6 w-3 h-3 bg-white opacity-20 animate-pulse"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white opacity-15 animate-pulse"
          style={{ animationDelay: "2s", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 relative">
            PRODUCTS
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </h2>
          <p className="text-gray-400 text-lg md:text-xl tracking-wide mb-6 md:mb-8">WHERE STREET MEETS ROCK</p>

          {/* Sound Wave Divider */}
          <div className="flex justify-center mb-8 md:mb-12">
            <RockSoundWave />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setVisibleProducts(6)
              }}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 md:px-6 py-2 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold tracking-wide bg-transparent border-2 border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              LOAD MORE
            </Button>
          </div>
        )}

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
    </section>
  )
}

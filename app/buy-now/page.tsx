"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductSelector } from "@/components/product-selector"
import { RockSoundWave } from "@/components/rock-sound-wave"

const products = [
  {
    id: 1,
    name: "SDFM Classic Black",
    price: 149.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    id: 2,
    name: "SDFM Premium Gray",
    price: 154.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    id: 3,
    name: "SDFM Signature Navy",
    price: 159.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    id: 4,
    name: "SDFM Limited Edition",
    price: 199.99,
    image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
]

function BuyNowContent() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState(products[0])

  useEffect(() => {
    const productId = searchParams.get("product")
    if (productId) {
      const product = products.find((p) => p.id === Number.parseInt(productId))
      if (product) {
        setSelectedProduct(product)
      }
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-dark-900 relative">
      {/* Rock-themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Guitar Fret Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${10 + i * 10}%`,
                opacity: 0.2 - i * 0.02,
              }}
            />
          ))}
        </div>

        {/* Corner Graphics */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-white opacity-30"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-white opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Shop</span>
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-100">CLEO</h1>
              <p className="text-sm md:text-base text-gray-400">STREETSWEAR & ROCK</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>

          {/* Sound Wave Divider */}
          <div className="flex justify-center mb-8 md:mb-12">
            <RockSoundWave />
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="relative z-10 pb-12 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <ProductSelector product={selectedProduct} />
        </div>
      </div>

      {/* Rock-themed Footer Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-800 to-transparent opacity-50"></div>
    </main>
  )
}

export default function BuyNowPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <BuyNowContent />
    </Suspense>
  )
}

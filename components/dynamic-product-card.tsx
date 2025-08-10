"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Product } from "@/lib/products-data"

interface DynamicProductCardProps {
  product: Product
}

export function DynamicProductCard({ product }: DynamicProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card className="bg-dark-800 border-dark-600 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-500 group">
      <div className="relative">
        {/* Product Image */}
        <Link href={`/products/${product.slug}`}>
          <div
            className="relative aspect-square overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isHovered ? "scale-110" : "scale-100"}`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Loading skeleton */}
            {!imageLoaded && <div className="absolute inset-0 bg-dark-600 animate-pulse" />}

            {/* Rock-themed overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

            {/* Guitar pick accent */}
            <div
              className="absolute top-4 right-4 w-4 h-5 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
          {product.isNew && <Badge className="bg-white text-black font-semibold text-xs px-2 py-1">NEW</Badge>}
          {product.isLimited && (
            <Badge className="bg-red-600 text-white font-semibold text-xs px-2 py-1">LIMITED</Badge>
          )}
          {!product.inStock && (
            <Badge className="bg-gray-600 text-white font-semibold text-xs px-2 py-1">OUT OF STOCK</Badge>
          )}
        </div>

        {/* Rock-inspired geometric accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
      </div>

      <CardContent className="p-4 md:p-6">
        <div className="space-y-3">
          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 line-clamp-2 group-hover:text-white transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Category */}
          <p className="text-sm text-gray-400 capitalize">{product.category}</p>

          {/* Buy Now Button */}
          <Link href={`/products/${product.slug}`} className="block">
            <Button
              className="w-full text-sm md:text-base py-2 md:py-3 bg-transparent border-2 border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              variant="outline"
              disabled={!product.inStock}
            >
              {product.inStock ? "BUY NOW" : "OUT OF STOCK"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

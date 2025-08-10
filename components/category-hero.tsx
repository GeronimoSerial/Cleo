"use client"

import Image from "next/image"
import type { Category } from "@/lib/products-data"

interface CategoryHeroProps {
  category: Category
  productCount: number
}

export function CategoryHero({ category, productCount }: CategoryHeroProps) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8 md:mb-12">
      <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" priority />

      {/* Rock-themed overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Guitar fret pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-white"
            style={{
              top: `${20 + i * 20}%`,
              opacity: 0.3 - i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          {category.name.toUpperCase()}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl">{category.description}</p>
        <p className="text-sm md:text-base text-gray-300">
          {productCount} {productCount === 1 ? "Product" : "Products"} Available
        </p>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white opacity-50" />
    </div>
  )
}

"use client"

import type React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { DynamicProductCard } from "./dynamic-product-card"
import type { Product } from "@/lib/products-api"

interface ProductCarouselProps {
  products: Product[]
  title: string
  showNavigation?: boolean
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No products available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-100">{title}</h3>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Rock-themed decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent" />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: false,
            slidesToScroll: 1,
          }}
          className="w-full"
          data-carousel-container
        >
          <CarouselContent 
            className="-ml-1 sm:-ml-2 md:-ml-4"
            data-carousel-content
          >
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 sm:pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                data-carousel-item
              >
                <div className="p-1">
                  <DynamicProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Gradient Overlays for Visual Effect */}
        <div className="absolute top-0 left-0 w-8 h-full bg-linear-to-r from-dark-900 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-8 h-full bg-linear-to-l from-dark-900 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}

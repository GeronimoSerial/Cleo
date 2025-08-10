"use client"

import { DynamicProductCard } from "./dynamic-product-card"
import type { Product } from "@/lib/products-api"

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

export function RelatedProducts({ products, title = "Complete Your Look" }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">Perfect pieces to complement your style</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <DynamicProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

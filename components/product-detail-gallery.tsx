"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

interface ProductDetailGalleryProps {
  productName: string
}

export function ProductDetailGallery({ productName }: ProductDetailGalleryProps) {
  const detailImages = [
    {
      src: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      title: "Fabric Detail",
      description: "Premium 100% cotton blend",
    },
    {
      src: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      title: "Stitching Quality",
      description: "Reinforced seams for durability",
    },
    {
      src: "https://i.pinimg.com/736x/8a/8e/7c/8a8e7c8f5d4c3b2a1e9f8d7c6b5a4e3d.jpg",
      title: "Logo Detail",
      description: "Signature CLEO branding",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Details</h3>
        <p className="text-gray-600">See the quality and craftsmanship up close</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {detailImages.map((image, index) => (
          <Card key={index} className="overflow-hidden bg-gray-50">
            <div className="relative aspect-square">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`${productName} - ${image.title}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">{image.title}</h4>
              <p className="text-sm text-gray-600">{image.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Video Section */}
      <Card className="overflow-hidden bg-gray-50">
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Product Video Coming Soon</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

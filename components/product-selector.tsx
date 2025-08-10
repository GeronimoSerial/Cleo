"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
}

interface ProductSelectorProps {
  product: Product
}

export function ProductSelector({ product }: ProductSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image1)

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const totalPrice = product.price * quantity

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-dark-800 rounded-lg overflow-hidden">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Rock-themed overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-30"></div>
        </div>

        {/* Image Thumbnails */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedImage(product.image1)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === product.image1 ? "border-white" : "border-dark-400"
            }`}
          >
            <Image src={product.image1 || "/placeholder.svg"} alt="View 1" fill className="object-cover" />
          </button>
          <button
            onClick={() => setSelectedImage(product.image2)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === product.image2 ? "border-white" : "border-dark-400"
            }`}
          >
            <Image src={product.image2 || "/placeholder.svg"} alt="View 2" fill className="object-cover" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">{product.name}</h1>
          <p className="text-xl md:text-2xl text-gray-300">${product.price.toFixed(2)}</p>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Size</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-4 border-2 rounded-lg font-semibold transition-colors ${
                  selectedSize === size
                    ? "border-white bg-white text-black"
                    : "border-dark-400 text-gray-300 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Quantity</h3>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-xl font-semibold text-gray-100 w-8 text-center">{quantity}</span>
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange(1)} className="w-10 h-10 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Total Price */}
        <Card className="bg-dark-800 border-dark-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-300">Total:</span>
              <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Add to Cart Button */}
        <Button className="w-full py-3 text-lg font-semibold bg-white text-black hover:bg-gray-200 transition-colors">
          Add to Cart
        </Button>

        {/* Product Description */}
        <div className="pt-4 border-t border-dark-600">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">
            Premium streetwear hoodie crafted from 100% cotton. Features the signature CLEO design with rock-inspired
            details. Perfect for street style or casual wear. Machine washable and pre-shrunk for lasting fit.
          </p>
        </div>
      </div>
    </div>
  )
}

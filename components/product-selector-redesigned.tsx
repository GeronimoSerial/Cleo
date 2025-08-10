"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Minus, Plus, MessageCircle, ShoppingCart, Ruler, Package, Truck } from "lucide-react"
import type { Product } from "@/lib/products-api"

interface ProductSelectorRedesignedProps {
  product: Product
}

export function ProductSelectorRedesigned({ product }: ProductSelectorRedesignedProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "Black")
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const totalPrice = product.price * quantity
  const savings = product.originalPrice ? (product.originalPrice - product.price) * quantity : 0

  const handleWhatsAppPurchase = () => {
    const message = `Hi! I'm interested in the ${product.name} - Size: ${selectedSize}, Color: ${selectedColor}, Quantity: ${quantity}. Total: $${totalPrice.toFixed(2)}`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              {product.isNew && <Badge className="bg-green-100 text-green-800 text-xs">NEW</Badge>}
              {product.isLimited && <Badge className="bg-red-100 text-red-800 text-xs">LIMITED EDITION</Badge>}
              {product.isBestSeller && <Badge className="bg-blue-100 text-blue-800 text-xs">BEST SELLER</Badge>}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {savings > 0 && <p className="text-sm text-green-600 font-medium">You save ${savings.toFixed(2)}</p>}
        </div>
      </div>

      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Color</h3>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Size</h3>
          <button
            onClick={() => setShowSizeChart(!showSizeChart)}
            className="text-sm text-gray-600 hover:text-gray-900 underline flex items-center gap-1"
          >
            <Ruler className="w-3 h-3" />
            Size Chart
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-2 border-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Size Chart */}
        {showSizeChart && (
          <Card className="p-4 bg-gray-50">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Size Guide (inches)</h4>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="font-medium">Size</div>
                <div className="font-medium">Chest</div>
                <div className="font-medium">Length</div>
                <div className="font-medium">Sleeve</div>
                <div>S</div>
                <div>38-40</div>
                <div>27</div>
                <div>24</div>
                <div>M</div>
                <div>42-44</div>
                <div>28</div>
                <div>25</div>
                <div>L</div>
                <div>46-48</div>
                <div>29</div>
                <div>26</div>
                <div>XL</div>
                <div>50-52</div>
                <div>30</div>
                <div>27</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 font-semibold text-lg min-w-12 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {quantity > 1 && (
            <div className="text-sm text-gray-600">
              Total: <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleWhatsAppPurchase}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          Buy via WhatsApp
        </Button>
        <Button
          variant="outline"
          className="w-full py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 bg-transparent"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">In Stock - Ready to Ship</span>
        </div>

        {/* Shipping Info */}
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">Free shipping nationwide • 24h delivery</span>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Description</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

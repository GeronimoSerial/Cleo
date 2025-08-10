"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface StickyWhatsAppButtonProps {
  product: {
    name: string
    price: number
  }
  selectedSize?: string
  selectedColor?: string
  quantity?: number
}

export function StickyWhatsAppButton({
  product,
  selectedSize = "M",
  selectedColor = "Black",
  quantity = 1,
}: StickyWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleWhatsAppPurchase = () => {
    const totalPrice = product.price * quantity
    const message = `Hi! I'm interested in the ${product.name} - Size: ${selectedSize}, Color: ${selectedColor}, Quantity: ${quantity}. Total: $${totalPrice.toFixed(2)}`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <>
      {/* Mobile Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <Button
          onClick={handleWhatsAppPurchase}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          Buy via WhatsApp - ${(product.price * quantity).toFixed(2)}
        </Button>
      </div>

      {/* Desktop Sticky Button */}
      <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <Button
          onClick={handleWhatsAppPurchase}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          Buy via WhatsApp
        </Button>
      </div>
    </>
  )
}

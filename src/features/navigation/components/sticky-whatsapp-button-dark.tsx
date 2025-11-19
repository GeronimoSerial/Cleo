"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface StickyWhatsAppButtonDarkProps {
  product: {
    name: string
    price: number
  }
  selectedSize?: string
  selectedColor?: string
  quantity?: number
}

export function StickyWhatsAppButtonDark({
  product,
  selectedSize = "M",
  selectedColor = "Black",
  quantity = 1,
}: StickyWhatsAppButtonDarkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 400px
      if (window.pageYOffset > 400) {
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
    const message = `¡Hola! Estoy interesado en ${product.name} - Talla: ${selectedSize}, Color: ${selectedColor}, Cantidad: ${quantity}. Total: $${totalPrice.toFixed(2)}`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <>
      {/* Mobile Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-dark-900/95 backdrop-blur-md border-t border-dark-600 shadow-2xl md:hidden">
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-xs text-gray-400">Envío en 24h • Cambios gratis en tienda</p>
          </div>
          <Button
            onClick={handleWhatsAppPurchase}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
            size="lg"
          >
            <MessageCircle className="w-5 h-5" />
            Comprar por WhatsApp - ${(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Desktop Sticky Button */}
      <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <div className="space-y-2">
          <div className="bg-dark-900/90 backdrop-blur-md border border-dark-600 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Envío en 24h</p>
            <Button
              onClick={handleWhatsAppPurchase}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base font-bold rounded-lg shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <MessageCircle className="w-5 h-5" />
              Comprar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Minus,
  Plus,
  MessageCircle,
  ShoppingCart,
  Ruler,
  Package,
  Truck,
  Clock,
} from "lucide-react";
import type { Product } from "@/lib/products-api";

interface ProductSelectorDarkProps {
  product: Product;
}

export function ProductSelectorDark({ product }: ProductSelectorDarkProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || "Black"
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const totalPrice = product.price * quantity;
  const savings = product.originalPrice
    ? (product.originalPrice - product.price) * quantity
    : 0;

  const handleWhatsAppPurchase = () => {
    const message = `¡Hola! Estoy interesado en ${
      product.name
    } - Talla: ${selectedSize}, Color: ${selectedColor}, Cantidad: ${quantity}. Total: $${totalPrice.toFixed(
      2
    )}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-4">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 leading-tight tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {product.isNew && (
              <Badge className="bg-indigo-900 text-white text-xs px-3 py-1 font-semibold">
                NUEVO
              </Badge>
            )}
            {product.isLimited && (
              <Badge className="bg-red-600 text-white text-xs px-3 py-1 font-semibold">
                EDICIÓN LIMITADA
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-indigo-900 text-white text-xs px-3 py-1 font-semibold">
                MÁS VENDIDO
              </Badge>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl md:text-2xl text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-sm md:text-base text-green-400 font-semibold">
              Ahorras ${savings.toFixed(2)} (
              {Math.round(
                (savings / (product.originalPrice! * quantity)) * 100
              )}
              % OFF)
            </p>
          )}
          <div className="w-20 h-1 bg-linear-to-r from-white to-transparent opacity-50"></div>
        </div>
      </div>

      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider">
            Color
          </h3>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-3 border-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  selectedColor === color
                    ? "border-white bg-white text-black"
                    : "border-dark-600 text-gray-300 hover:border-gray-400 hover:text-white bg-dark-800"
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
        {/* <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider">
            Talla
          </h3>
          <button
            onClick={() => setShowSizeChart(!showSizeChart)}
            className="text-sm text-gray-400 hover:text-white underline flex items-center gap-1 transition-colors"
          >
            <Ruler className="w-3 h-3" />
            Guía de Tallas
          </button>
        </div> */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-2 border-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                selectedSize === size
                  ? "border-white bg-white text-black"
                  : "border-dark-600 text-gray-300 hover:border-gray-400 hover:text-white bg-dark-800"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Size Chart */}
        {showSizeChart && (
          <Card className="p-4 bg-dark-800 border-dark-600">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-gray-100">
                Guía de Tallas (cm)
              </h4>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="font-semibold text-gray-200">Talla</div>
                <div className="font-semibold text-gray-200">Pecho</div>
                <div className="font-semibold text-gray-200">Largo</div>
                <div className="font-semibold text-gray-200">Manga</div>
                <div className="text-gray-300">S</div>
                <div className="text-gray-300">96-102</div>
                <div className="text-gray-300">69</div>
                <div className="text-gray-300">61</div>
                <div className="text-gray-300">M</div>
                <div className="text-gray-300">107-112</div>
                <div className="text-gray-300">71</div>
                <div className="text-gray-300">64</div>
                <div className="text-gray-300">L</div>
                <div className="text-gray-300">117-122</div>
                <div className="text-gray-300">74</div>
                <div className="text-gray-300">66</div>
                <div className="text-gray-300">XL</div>
                <div className="text-gray-300">127-132</div>
                <div className="text-gray-300">76</div>
                <div className="text-gray-300">69</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider">
          Cantidad
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-dark-600 rounded-lg bg-dark-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="px-3 py-2 hover:bg-dark-700 text-gray-300 hover:text-white disabled:opacity-30"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 font-bold text-lg min-w-12 text-center text-white">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-2 hover:bg-dark-700 text-gray-300 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {quantity > 1 && (
            <div className="text-sm text-gray-400">
              Total:{" "}
              <span className="font-bold text-white text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleWhatsAppPurchase}
          className="w-full bg-gray-700 hover:bg-green-700 text-white py-4 text-lg font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          Comprar por WhatsApp
        </Button>
        <Button
          variant="outline"
          className="w-full py-4 text-lg font-bold rounded-lg border-2 border-gray-600 hover:border-white hover:bg-white hover:text-black bg-transparent text-gray-300 transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Agregar al Carrito
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-4 pt-6 border-t border-dark-600">
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-green-400">
            En Stock - Listo para Enviar
          </span>
        </div>

        {/* Shipping Info */}
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            Envío gratis a nivel nacional • Entrega en 24h
          </span>
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-orange-400 font-medium">
            Últimas 3 unidades disponibles
          </span>
        </div>

        {/* Description */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-gray-100 uppercase tracking-wider">
            Descripción
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

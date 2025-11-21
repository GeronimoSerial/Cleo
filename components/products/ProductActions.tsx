"use client"; // <--- ¡Esto es lo más importante!

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductActionsProps {
  productName: string;
  initialSizes?: string[]; // Opcional, por si vienen de la DB
}

export default function ProductActions({
  productName,
  initialSizes = ["XS", "S", "M", "L", "XL", "XXL"],
}: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Generar mensaje de WhatsApp dinámico
  const waNumber = "543777301196";
  const waMessage = `Hola, me interesa el producto: ${productName}.
Talle: ${selectedSize || "A consultar"}
Cantidad: ${quantity}`;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waMessage
  )}`;

  return (
    <>
      {/* Size Selector */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-widest">
            Seleccionar talle
          </span>
          <span className="font-mono text-xs uppercase tracking-widest underline cursor-pointer hover:text-white text-neutral-500">
            Guía de talles
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {initialSizes.map((size) => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                h-12 border font-mono text-sm transition-all duration-300 uppercase
                ${
                  selectedSize === size
                    ? "bg-white text-black border-white" // Estilo Activo
                    : "bg-transparent border-white/20 text-neutral-400 hover:border-white hover:text-white" // Estilo Inactivo
                }
              `}
            >
              {size}
            </Button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-xs text-red-400/80 mt-2 font-mono hidden">
            * Por favor selecciona un talle
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-12">
        <div className="flex items-center border border-white/20 h-14 px-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:text-white text-neutral-500 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-mono">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:text-white text-neutral-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          className={`flex-1 h-14 rounded-none font-mono uppercase tracking-widest text-lg
          
            bg-white text-black
          `}
          asChild={!!selectedSize}
        >
          <Link href={waLink} target="_blank">
            Consultar
          </Link>
        </Button>
      </div>
    </>
  );
}

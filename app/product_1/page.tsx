"use client";
import { useState, useEffect } from "react";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Grain Overlay */}
      <div className="grain opacity-20 z-50 pointer-events-none fixed inset-0"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left: Image Gallery (Scrollable) */}
        <div className="lg:col-span-7 lg:border-r border-white/10 pt-24 lg:pt-0">
          <div className="flex flex-col">
            <div className="aspect-[3/4] w-full relative border-b border-white/10 group overflow-hidden">
              <Image
                src="/products/8.jpg"
                alt="Product Front"
                fill
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 font-mono text-xs bg-black text-white px-2 py-1">
                FIG_01 // FRONT VIEW
              </div>
            </div>
            <div className="aspect-[3/4] w-full relative border-b border-white/10 group overflow-hidden">
              <Image
                src="/products/9.jpg"
                alt="Product Back"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                fill
              />
              <div className="absolute bottom-4 left-4 font-mono text-xs bg-black text-white px-2 py-1">
                FIG_02 // REVERSE VIEW
              </div>
            </div>
            <div className="aspect-video w-full relative group overflow-hidden">
              <Image
                src="/products/10.jpg"
                alt="Fabric Detail"
                className="w-full h-full object-cover grayscale contrast-150 scale-150 group-hover:scale-[1.6] transition-transform duration-700"
                fill
              />
              <div className="absolute bottom-4 left-4 font-mono text-xs bg-black text-white px-2 py-1">
                FIG_03 // TEXTURE MACRO
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details (Sticky) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-0 h-screen overflow-y-auto px-6 py-24 lg:px-12 lg:py-32 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge
                  variant="outline"
                  className="rounded-none border-white/20 text-neutral-400 font-mono text-xs uppercase tracking-widest"
                >
                  Season 04 // 90s Revival
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500/80">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-neutral-500 text-xs ml-2 font-mono"></span>
                </div>
              </div>

              <h1 className="font-display text-5xl lg:text-7xl leading-[0.85] mb-6 tracking-tight uppercase">
                BOXY_FIT
                <br />
                shirt_01
              </h1>

              <p className="font-mono text-2xl mb-8">$00.00</p>

              <div className="prose prose-invert mb-12 text-neutral-400 font-sans leading-relaxed max-w-md">
                <p>
                  Liviana camiseta de algodón orgánico con un ajuste boxy y
                  detalles desgastados. Perfecta para un look casual y cómodo,
                  con un diseño gráfico distintivo en la parte trasera.
                </p>
              </div>

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
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        h-12 border font-mono text-sm transition-all duration-300 uppercase
                        ${
                          selectedSize === size
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-neutral-400 hover:border-white hover:text-white"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
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
                  className="flex-1 h-14 rounded-none bg-white text-black hover:bg-neutral-200 font-mono uppercase tracking-widest text-lg"
                  asChild
                >
                  <Link href="https://wa.me/543777301196">Consultar</Link>
                </Button>
              </div>
            </div>
            {/* Technical Details Accordion */}
            <div className="mt-auto">
              <Accordion
                type="single"
                collapsible
                className="w-full border-t border-white/10"
              >
                <AccordionItem
                  value="details"
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="font-mono text-sm uppercase tracking-widest hover:no-underline py-6">
                    Technical Specifications
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400 font-mono text-xs leading-relaxed pb-6">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>GSM:</span>
                        <span>480GSM HEAVYWEIGHT COTTON</span>
                      </li>
                      <li className="flex justify-between">
                        <span>FIT:</span>
                        <span>OVERSIZED / BOXY</span>
                      </li>
                      <li className="flex justify-between">
                        <span>ORIGIN:</span>
                        <span>SHATO</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CARE:</span>
                        <span>COLD WASH / HANG DRY</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="shipping"
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="font-mono text-sm uppercase tracking-widest hover:no-underline py-6">
                    Envíos & Devoluciones
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400 font-sans text-sm pb-6">
                    Retirá en tienda o envíos a todo el país. Para cambios y
                    devoluciones, contáctenos directamente para obtener más
                    información.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

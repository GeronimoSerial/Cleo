"use client";

import { ProductCard } from "./products/ui/dynamic-product-card";
import { RockSoundWave } from "./ui/rock-sound-wave";
import type { Product } from "@/lib/directus-api";

interface RelatedProductsDarkProps {
  products: Product[];
  title?: string;
}

export function RelatedProductsDark({
  products,
  title = "Completa tu Look",
}: RelatedProductsDarkProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
          {title}
        </h3>
        <p className="text-gray-400 mb-6">
          Piezas perfectas para complementar tu estilo
        </p>
        <div className="flex justify-center">
          <RockSoundWave />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

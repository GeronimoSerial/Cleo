"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface ProductDetailGalleryDarkProps {
  productName: string;
}

export function ProductDetailGalleryDark({
  productName,
}: ProductDetailGalleryDarkProps) {
  const detailImages = [
    {
      src: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      title: "Detalle de Tela",
      description: "Algodón 100% premium",
    },
    {
      src: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      title: "Calidad de Costuras",
      description: "Costuras reforzadas para durabilidad",
    },
    {
      src: "https://i.pinimg.com/736x/8a/8e/7c/8a8e7c8f5d4c3b2a1e9f8d7c6b5a4e3d.jpg",
      title: "Detalle del Logo",
      description: "Marca CLEO signature",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
          Detalles
        </h3>
        <p className="text-gray-400">Ve la calidad y artesanía de cerca</p>
        <div className="w-20 h-1 bg-linear-to-r from-transparent via-white to-transparent mx-auto mt-4 opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {detailImages.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-dark-800 border-dark-600 group hover:border-gray-500 transition-colors"
          >
            <div className="relative aspect-square">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`${productName} - ${image.title}`}
                fill
                className="object-cover overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-500 group"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Rock-themed overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Guitar pick accent */}
              <div
                className="absolute top-3 right-3 w-3 h-4 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)",
                }}
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-100 mb-2">{image.title}</h4>
              <p className="text-sm text-gray-400">{image.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Video Section */}
      <Card className="overflow-hidden bg-dark-800 border-dark-600 group hover:border-gray-500 transition-colors">
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex items-center justify-center bg-dark-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-dark-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-dark-500 transition-colors">
                <Play className="w-6 h-6 text-gray-300 ml-1" />
              </div>
              <h4 className="text-lg font-bold text-gray-100 mb-2">
                Video del Producto
              </h4>
              <p className="text-sm text-gray-400">Próximamente disponible</p>
            </div>
          </div>
          {/* Rock-themed decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white opacity-20" />
        </div>
      </Card>
    </div>
  );
}

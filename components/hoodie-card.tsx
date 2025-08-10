"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HoodieCardProps {
  id: number
  name: string
  price: number
  image1: string
  image2: string
}

export function HoodieCard({ id, name, price, image1, image2 }: HoodieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div
        className="relative aspect-square"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? image2 : image1}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Rock-themed overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-2">{name}</h3>
        <p className="text-gray-400 mb-4 text-base md:text-lg">${price.toFixed(2)}</p>
        <Link href={`/buy-now?product=${id}`}>
          <Button className="w-full text-sm md:text-base py-2 md:py-3 bg-transparent" variant="outline">
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

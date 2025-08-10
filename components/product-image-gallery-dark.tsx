"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryDarkProps {
  images: string[]
  productName: string
}

export function ProductImageGalleryDark({ images, productName }: ProductImageGalleryDarkProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    }
    if (isRightSwipe && currentImage > 0) {
      setCurrentImage(currentImage - 1)
    }
  }

  const goToPrevious = () => {
    setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1)
  }

  const goToNext = () => {
    setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-dark-800 rounded-lg overflow-hidden group border border-dark-600">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Rock-themed overlay elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Guitar pick accent */}
          <div
            className="absolute top-4 right-4 w-4 h-5 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
          />
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-white opacity-20" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-white opacity-20" />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-dark-900/80 hover:bg-dark-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-dark-600"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark-900/80 hover:bg-dark-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-dark-600"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsZoomed(true)}
          className="absolute top-2 right-2 bg-dark-900/80 hover:bg-dark-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-dark-600"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-dark-900/80 text-white px-3 py-1 rounded-full text-sm font-medium border border-dark-600">
            {currentImage + 1} / {images.length}
          </div>
        )}

        {/* Touch Area for Mobile */}
        <div
          className="absolute inset-0 md:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors bg-dark-800 ${
                currentImage === index ? "border-white" : "border-dark-600 hover:border-gray-400"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`${productName} - Zoomed`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-dark-900/80 hover:bg-dark-700 text-white p-2 rounded-full border border-dark-600"
              aria-label="Close zoom"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicProductCard } from "./dynamic-product-card"
import type { Product } from "@/lib/products-api"

interface ProductCarouselProps {
  products: Product[]
  title: string
  showNavigation?: boolean
}

export function ProductCarousel({ products, title, showNavigation = true }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Calculate how many items are visible at different screen sizes
  const getVisibleItems = () => {
    if (typeof window === "undefined") return 1
    if (window.innerWidth >= 1280) return 4 // xl
    if (window.innerWidth >= 1024) return 3 // lg
    if (window.innerWidth >= 640) return 2 // sm
    return 1 // mobile
  }

  const [visibleItems, setVisibleItems] = useState(getVisibleItems)

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems())
      setCurrentIndex(0) // Reset to start on resize
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    updateNavigationState()
  }, [currentIndex, visibleItems, products.length])

  const updateNavigationState = () => {
    setIsAtStart(currentIndex === 0)
    setIsAtEnd(currentIndex >= products.length - visibleItems)
  }

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return

    const maxIndex = Math.max(0, products.length - visibleItems)
    const newIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(newIndex)

    const cardWidth = carouselRef.current.scrollWidth / products.length
    const scrollPosition = newIndex * cardWidth

    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }

  const goToPrevious = () => {
    scrollToIndex(currentIndex - 1)
  }

  const goToNext = () => {
    scrollToIndex(currentIndex + 1)
  }

  // Touch handlers for mobile swipe
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

    if (isLeftSwipe && !isAtEnd) {
      goToNext()
    }
    if (isRightSwipe && !isAtStart) {
      goToPrevious()
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No products available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-100">{title}</h3>

        {/* Navigation Buttons - Desktop */}
        {showNavigation && products.length > visibleItems && (
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={isAtStart}
              className="p-2 bg-dark-800 border-dark-600 hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={isAtEnd}
              className="p-2 bg-dark-800 border-dark-600 hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Rock-themed decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>

        {/* Products Scroll Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              style={{ scrollSnapAlign: "start" }}
            >
              <DynamicProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        {showNavigation && products.length > visibleItems && (
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(products.length / visibleItems) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index * visibleItems)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / visibleItems) === index ? "bg-white" : "bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Gradient Overlays for Visual Effect */}
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-dark-900 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-dark-900 to-transparent pointer-events-none z-10" />
      </div>

      {/* Progress Indicator */}
      {showNavigation && products.length > visibleItems && (
        <div className="mt-4 hidden md:block">
          <div className="w-full bg-dark-600 h-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + visibleItems) / products.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

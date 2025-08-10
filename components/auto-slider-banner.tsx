"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
];

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}

      {/* Rock-themed Guitar Neck Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Guitar Fret Lines - Responsive */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${15 + i * 12}%`,
                opacity: 0.3 - i * 0.05,
              }}
            />
          ))}
        </div>

        {/* Guitar String Lines - Vertical */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-full opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full border-l border-white"
              style={{
                left: `${20 + i * 10}%`,
                opacity: 0.4 - i * 0.06,
              }}
            />
          ))}
        </div>

        {/* Corner Graphics - Responsive */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-l-2 border-t-2 border-white opacity-50"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-r-2 border-t-2 border-white opacity-50"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-l-2 border-b-2 border-white opacity-50"></div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-r-2 border-b-2 border-white opacity-50"></div>

        {/* Floating Music Notes - Rock Theme */}
        <div
          className="absolute top-1/4 left-1/6 w-2 h-2 md:w-3 md:h-3 bg-white opacity-60 animate-pulse"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-white opacity-40 animate-pulse"
          style={{
            animationDelay: "1s",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 md:w-2 md:h-2 bg-white opacity-80 animate-pulse"
          style={{
            animationDelay: "2s",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        ></div>
      </div>

      {/* Fixed Centered Content */}
      <div className="absolute inset-0 bg-opacity-10 bg-black/40 flex items-center justify-center z-10 px-4">
        <div className="text-center max-w-4xl w-full">
          {/* Main Brand Text - Properly Centered */}
          <div className="mb-6 md:mb-8 relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-100 mb-3 md:mb-4 relative">
              CLEO
              <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-0.5 md:h-1 bg-linear-to-r from-transparent via-white to-transparent"></div>
            </h1>

            {/* Streetwear & Rock - Properly Centered */}
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-gray-100 mb-3 md:mb-4 relative">
                <span className="relative z-10">STREETWEAR</span>
                <span className="mx-2 md:mx-4 text-white opacity-75">&</span>
                <span className="relative z-10 text-gray-200">ROCK</span>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-4 md:h-8 bg-linear-to-r from-transparent via-white to-transparent opacity-10 -skew-x-12"></div>
              </h2>
              <p className="text-base md:text-lg text-gray-300 tracking-wide font-light mb-6 md:mb-8">
                ELEVATE YOUR STYLE
              </p>
            </div>
          </div>

          {/* Enhanced CTA Button - Centered */}
          <div className="relative inline-block">
            <Button
              onClick={handleShopClick}
              size="lg"
              variant="outline"
              className="relative z-10 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold tracking-wider border-2 hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
            >
              SHOP NOW
            </Button>
            <div className="absolute -top-1 md:-top-2 -left-1 md:-left-2 w-3 md:w-4 h-3 md:h-4 border-l-2 border-t-2 border-white opacity-50"></div>
            <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 w-3 md:w-4 h-3 md:h-4 border-r-2 border-b-2 border-white opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

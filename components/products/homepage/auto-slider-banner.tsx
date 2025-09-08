"use client";

import { BackgroundMedia } from "@/components/ui/bg-media";
import { Button } from "@/components/ui/button";

export function AutoSliderBanner() {
  const handleShopClick = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Media Component */}
      <BackgroundMedia
        type="video"
        src="https://res.cloudinary.com/dsdt8edxl/video/upload/v1755051832/ezgif.com-video-merger_gznxyv.mp4"
        variant="dark"
        autoPlay
        loop
      />

      {/* Fixed Centered Content */}
      <div className="absolute inset-0 bg-opacity-10 bg-black/40 flex items-center justify-center z-10 px-4">
        <div className="text-center max-w-4xl w-full">
          {/* Main Brand Text - Properly Centered */}
          <div className="mb-6 md:mb-8 relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-100 mb-3 md:mb-4 relative">
              Resolv
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

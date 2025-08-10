import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { ProductsHomepage } from "@/components/products-homepage"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {/* Full-screen Auto-sliding Banner */}
      <AutoSliderBanner />

      {/* Products Homepage with Carousels */}
      <ProductsHomepage />

      {/* Brand Story Section */}
      <section className="w-full py-8 md:py-12 lg:py-24 bg-dark-800 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="mb-4 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 relative">
                The CLEO Story
                <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-0.5 md:h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-50"></div>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Born from the fusion of street culture and rock rebellion. CLEO represents the intersection where
                  urban streetwear meets the raw energy of rock music.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Each piece embodies the spirit of both worlds—comfortable enough for the streets, bold enough for the
                  stage. Premium materials meet edgy design in every thread.
                </p>

                {/* Stats Grid - Responsive */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 text-center md:text-left pt-4 md:pt-6">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">2520</div>
                    <div className="text-xs md:text-sm text-gray-400">Founded</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">100%</div>
                    <div className="text-xs md:text-sm text-gray-400">Premium Cotton</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">∞</div>
                    <div className="text-xs md:text-sm text-gray-400">Attitude</div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square bg-dark-600 rounded-lg overflow-hidden order-1 lg:order-2">
                <img
                  src="https://i.pinimg.com/736x/8a/8e/7c/8a8e7c8f5d4c3b2a1e9f8d7c6b5a4e3d.jpg"
                  alt="CLEO Brand Story"
                  className="w-full h-full object-cover"
                />
                {/* Rock-themed overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent to-black opacity-30"></div>
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-6 md:w-8 h-6 md:h-8 border-r-2 border-b-2 border-white opacity-50"></div>

                {/* Guitar Pick Shape */}
                <div
                  className="absolute top-4 left-4 w-6 h-8 md:w-8 md:h-10 bg-white opacity-20"
                  style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark-900 relative flex items-center justify-center">
      {/* Rock-themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-white"
            style={{
              top: `${15 + i * 10}%`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">Product Not Found</h2>
          <p className="text-gray-400 text-lg mb-6">
            The product or category you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent px-6 py-3">
              <Search className="w-4 h-4" />
              <span>Browse All Products</span>
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-30" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-white opacity-30" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-white opacity-30" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-white opacity-30" />
      </div>
    </main>
  )
}

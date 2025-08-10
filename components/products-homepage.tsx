"use client";

import { useState, useEffect } from "react";
import { ProductCarousel } from "./product-carousel";
import { Button } from "@/components/ui/button";
import { ProductsTextReveal } from "./reveal-products";
import {
  getAllProducts,
  getNewArrivals,
  getLimitedEdition,
  getBestSellers,
  getFeaturedProducts,
  type Product,
} from "@/lib/products-api";
import Lightning from "./Lightning/Lightning";

const tabs = [
  { id: "featured", label: "Featured", icon: "⭐" },
  { id: "all", label: "All", icon: "🎸" },
  { id: "new", label: "New Arrivals", icon: "🔥" },
  { id: "limited", label: "Limited Edition", icon: "💎" },
  { id: "bestsellers", label: "Best Sellers", icon: "🏆" },
];

export function ProductsHomepage() {
  const [activeTab, setActiveTab] = useState("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let productData: Product[] = [];

      switch (activeTab) {
        case "all":
          productData = await getAllProducts();
          break;
        case "new":
          productData = await getNewArrivals();
          break;
        case "limited":
          productData = await getLimitedEdition();
          break;
        case "bestsellers":
          productData = await getBestSellers();
          break;
        case "featured":
        default:
          productData = await getFeaturedProducts();
          break;
      }

      setProducts(productData);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 relative">
      {/* Rock-themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Guitar fret lines */}

        {/* Floating music elements */}
        <div
          className="absolute top-1/4 left-1/6 w-2 h-2 md:w-3 md:h-3 bg-white opacity-20 animate-pulse"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-white opacity-15 animate-pulse"
          style={{
            animationDelay: "2s",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <ProductsTextReveal />
        </div>

        {/* Mobile-First Tab Navigation */}
        <div className="mb-8 md:mb-12">
          {/* Mobile: Horizontal Scroll Tabs */}
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  size="sm"
                  className={`shrink-0 px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white"
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop: Centered Tabs */}
          <div className="hidden md:flex justify-center gap-2 lg:gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`px-4 lg:px-6 py-2 text-sm lg:text-base font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <ProductCarousel
              products={products}
              title={
                tabs.find((tab) => tab.id === activeTab)?.label || "Products"
              }
              showNavigation={true}
            />
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-dark-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎸</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400">
                  Check back soon for new arrivals!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent opacity-20" />
    </section>
  );
}

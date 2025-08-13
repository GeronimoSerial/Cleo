"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductCarousel } from "./product-carousel";
import { Button } from "@/components/ui/button";
import { ProductsTextReveal } from "./reveal-products";
import { getAllProducts, type Product } from "@/lib/directus-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { id: "all", label: "All", shortLabel: "All" },
  { id: "featured", label: "Featured", shortLabel: "★" },
  { id: "new", label: "New Arrivals", shortLabel: "New" },
];

export function ProductsHomepage() {
  const [activeTab, setActiveTab] = useState("all");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all products once on mount
  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      try {
        const productData = await getAllProducts();
        setAllProducts(productData);
      } catch (error) {
        console.error("Error loading products:", error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []); // Only run once on mount

  // Filter products based on active tab - no API calls, instant filtering
  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "all":
        return allProducts;
      case "featured":
        return allProducts.filter((product) => product.featured);
      case "new":
        // Get the latest 5 products (products are already sorted by newest first from API)
        return allProducts.slice(0, 5);
      default:
        return allProducts;
    }
  }, [activeTab, allProducts]);

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 relative">
      <div className="absolute inset-0 pointer-events-none opacity-5">
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

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10  ">
        {/* Section Header */}
        <div className="text-center">
          <ProductsTextReveal />
        </div>

        <div className="bg-transparent p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-hidden">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="bg-transparent p-1 rounded-full border border-zinc-700 flex items-center justify-center md:justify-center space-x-1 overflow-x-auto scrollbar-hide w-full max-w-full">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`
                px-2 md:px-6 py-2 rounded-full transition-all duration-300 ease-in-out
                text-zinc-400 data-[state=active]:bg-zinc-700 data-[state=active]:text-white data-[state=active]:font-semibold
                hover:text-white hover:bg-zinc-700
                focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none
                whitespace-nowrap text-xs md:text-base shrink-0 min-w-0
              `}
                  >
                    <span className="md:hidden">{tab.shortLabel}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-8">
                {tabs.map((tab) => (
                  <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="focus:outline-none"
                  >
                    <ProductCarousel
                      products={filteredProducts}
                      title={tab.label}
                      showNavigation={true}
                    />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
        {/* Empty State */}
        {/* {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-dark-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-400">Check back soon for new arrivals!</p>
            </div>
          </div>
        )}
      </div> */}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent opacity-20" />
    </section>
  );
}

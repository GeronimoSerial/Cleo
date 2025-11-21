import Link from "next/link";
import ProductCard from "../shared/ProductCard";
import {
  getLatestProducts,
  getLatestSeason,
  getStrapiMediaUrl,
} from "@/lib/strapi";
import { Product } from "@/interfaces/product";

export default async function LatestArrivals() {
  const [products, season] = await Promise.all([
    getLatestProducts(),
    getLatestSeason(),
  ]);

  return (
    <section
      id="latest-arrivals"
      className="py-24 px-4 md:px-12 border-b border-white/10"
    >
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-display">LATEST ARRIVALS</h2>
        <span className="font-mono text-sm text-muted-foreground hidden md:block">
          {season}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {/* We can map over these or just manually link the first one for the demo */}
        {products.map((product, index) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <span className="block cursor-pointer">
              <ProductCard
                image={getStrapiMediaUrl(product.fotos?.[0]?.url) || ""}
                title={product.nombre || "PRODUCT_NAME"}
                brand={product.marca || "BRAND_NAME"}
                price={`$${product.precio?.toLocaleString() || "00.00"}`}
                tag={
                  index === 0
                    ? "BESTSELLER"
                    : index === 1
                    ? "LOW STOCK"
                    : "NEW IN"
                }
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

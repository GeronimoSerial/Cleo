import Link from "next/link";
import ProductCard from "../shared/ProductCard";

export default function LatestArrivals() {
  return (
    <section
      id="latest-arrivals"
      className="py-24 px-4 md:px-12 border-b border-white/10"
    >
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-display">LATEST ARRIVALS</h2>
        <span className="font-mono text-sm text-muted-foreground hidden md:block">
          SEASON 04 // 90'S REVIVAL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {/* We can map over these or just manually link the first one for the demo */}
        <Link href="/product_1">
          <span className="block cursor-pointer">
            <ProductCard
              image="/products/1.jpg"
              title="BOXY_FIT_01"
              price="$00.00"
              tag="BESTSELLER"
            />
          </span>
        </Link>

        <Link href="/product_2">
          <span className="block cursor-pointer">
            <ProductCard
              image="/products/2.jpg"
              title="GR_TV_90_TSHIRT"
              price="$00.00"
              tag="LOW STOCK"
            />
          </span>
        </Link>

        <Link href="/product_3">
          <span className="block cursor-pointer">
            <ProductCard
              image="/products/5.jpg"
              title="ROLLING_STONES_03"
              price="$00.00"
              tag="NEW IN"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}

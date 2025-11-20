import Link from "next/link";
import ProductCard from "../shared/ProductCard";

export default function LatestArrivals() {
  return (
    <section className="py-24 px-4 md:px-12 border-b border-white/10">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-display">LATEST ARRIVALS</h2>
        <span className="font-mono text-sm text-muted-foreground hidden md:block">
          SEASON 04 // CONCRETE JUNGLE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {/* We can map over these or just manually link the first one for the demo */}
        <Link href="/product">
          <span className="block cursor-pointer">
            <ProductCard
              image="https://via.placeholder.com/800x1067/000000/FFFFFF?text=HOODIE"
              title="OVR_SIZED_HOODIE_01"
              price="€450.00"
              tag="BESTSELLER"
            />
          </span>
        </Link>

        <Link href="/product">
          <span className="block cursor-pointer">
            <ProductCard
              image="https://via.placeholder.com/800x1067/000000/FFFFFF?text=PANTS"
              title="TECH_CARGO_V2"
              price="€380.00"
              tag="LOW STOCK"
            />
          </span>
        </Link>

        <Link href="/product">
          <span className="block cursor-pointer">
            <ProductCard
              image="https://via.placeholder.com/800x1067/000000/FFFFFF?text=SNEAKER"
              title="HYPER_RUNNER_X"
              price="€620.00"
              tag="NEW IN"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}

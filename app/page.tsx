import Manifesto from "@/components/home/Manifesto";
import About from "@/components/home/About";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import LatestArrivals from "@/components/home/LatestArrivals";
import DropZone from "@/components/home/DropZone";
import { Separator } from "@/components/ui/separator";
import { getStrapiData } from "@/lib/strapi";
import { getLatestProducts } from "@/lib/strapi";

export default async function Home() {
  const latestProducts = await getLatestProducts();

  console.log("Latest Products:", latestProducts);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-white selection:text-black">
      {/* <Navbar /> */}
      <Hero />
      <LatestArrivals products={latestProducts} />
      <DropZone />
      <Separator></Separator>
      <Manifesto />
      <About />
      <Footer />
    </div>
  );
}

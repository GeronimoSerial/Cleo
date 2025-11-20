import Manifesto from "@/components/home/Manifesto";
import About from "@/components/home/About";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import LatestArrivals from "@/components/home/LatestArrivals";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-white selection:text-black">
      {/* <Navbar /> */}
      <Hero />
      <LatestArrivals />
      <Manifesto />
      <About />
      <Footer />
    </div>
  );
}

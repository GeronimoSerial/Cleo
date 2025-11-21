"use cache";
import Manifesto from "@/components/home/Manifesto";
import About from "@/components/home/About";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import LatestArrivals from "@/components/home/LatestArrivals";
import DropZone from "@/components/home/DropZone";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import LatestArrivalsSkeleton from "@/components/home/SkeletonLatestArrivals";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-white selection:text-black">
      <Hero />
      <Suspense fallback={<LatestArrivalsSkeleton />}>
        <LatestArrivals />
      </Suspense>
      <DropZone />
      <Separator></Separator>
      <Manifesto />
      <About />
      <Footer />
    </div>
  );
}

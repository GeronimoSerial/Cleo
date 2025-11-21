"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BackgroundMedia from "../ui/bg-media";
import { Button } from "../ui/button";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <section className="relative w-full h-screen bg-nexus-black overflow-hidden">
      {/* Aesthetic Statue Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Using a specific Unsplash image of a Greek bust for that Vaporwave/Aesthetic look */}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-nexus-black via-transparent to-nexus-black/60" />

        {/* Scanlines for Vaporwave CRT effect */}
        <div className="scanlines opacity-30"></div>
        <div className="vignette"></div>
      </div>

      {/* Grid Decoration */}
      <div
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="relative container mx-auto h-full grid lg:grid-cols-2 items-center gap-8 px-4">
        {/* Left Column: Text Content */}
        <div className="relative z-20 text-center lg:text-left flex flex-col items-center lg:items-start w-full mix-blend-screen lg:col-span-1">
          <div className="overflow-hidden mb-4">
            <h2
              className={`text-nexus-acid font-mono text-xs md:text-sm tracking-[0.8em] transform transition-transform duration-1000 delay-300 border border-nexus-acid px-4 py-1 ${
                loaded ? "translate-y-0" : "translate-y-full"
              }`}
            >
              WHERE STREET CULTURE
            </h2>
          </div>

          {/* Main Typography with Overlapping "Aesthetic" positioning */}
          <div className="relative">
            <div className="overflow-hidden relative z-10">
              <h1
                className={`text-white font-display font-bold text-7xl md:text-9xl lg:text-[13rem] leading-[0.85] tracking-tighter uppercase transform transition-transform duration-1000 delay-500 ${
                  loaded ? "translate-y-0" : "translate-y-[120%]"
                }`}
              >
                MEETS
              </h1>
            </div>

            <div className="overflow-hidden relative z-0 -mt-4 md:-mt-8 lg:-mt-12">
              <h1
                className={`text-transparent stroke-text font-display font-bold text-7xl md:text-9xl lg:text-[13rem] leading-[0.85] tracking-tighter uppercase transform transition-transform duration-1000 delay-700 blur-[1px] ${
                  loaded ? "translate-y-0" : "translate-y-[120%]"
                }`}
                style={{ WebkitTextStroke: "1px white", color: "transparent" }}
              >
                ROCK
              </h1>
            </div>

            {/* Decorative Japanese Text often found in Vaporwave */}
            {/* <div
              className={`absolute -right-8 top-0 hidden md:block writing-vertical text-nexus-acid font-mono text-xs tracking-widest opacity-60 transition-opacity duration-1000 delay-1000 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            >
              ネクサス・アーカイブ
            </div> */}
          </div>

          <div
            className={`mt-16 flex flex-col md:flex-row gap-8 items-center transition-opacity duration-1000 delay-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              className="group relative px-10 py-4 bg-white text-black font-mono font-bold text-sm overflow-hidden hover:bg-accent transition-colors cursor-pointer duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] uppercase tracking-widest"
              onClick={() => {
                document
                  .getElementById("latest-arrivals")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Armá tu outfit
            </Button>
          </div>
        </div>

        {/* Right Column: Media Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center lg:relative lg:col-span-1 z-10 w-full h-full">
          <div className="w-full h-full lg:max-w-xl lg:aspect-video">
            <BackgroundMedia
              src="https://res.cloudinary.com/dmitnt8de/video/upload/v1763682573/bgmedia_1_ua6utj.mp4"
              type="video"
              variant="dark"
            />
          </div>
        </div>
      </div>

      {/* Aesthetic Floating Elements */}
      <div className="absolute top-1/4 left-10 hidden lg:block opacity-30 z-0">
        <div className="w-32 h-32 border border-white/30 rotate-45 animate-[spin_20s_linear_infinite]"></div>
        <div className="w-32 h-32 border border-white/30 -rotate-12 absolute top-0 left-0"></div>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] backdrop-blur-sm">
          <svg viewBox="0 0 100 100" className="w-full h-full p-2">
            <path
              id="curve"
              d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
              fill="transparent"
            />
            <text className="text-[9px] font-mono fill-nexus-acid uppercase tracking-widest">
              <textPath href="#curve">
                Digital decay • Classical Form • Nexus •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

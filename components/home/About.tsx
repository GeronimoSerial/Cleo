import Image from "next/image";
import { Button } from "../ui/button";

export default function About() {
  return (
    <section className="py-32 px-4 md:px-12 bg-white text-black relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-4 bg-black/5 group-hover:bg-black/10 transition-colors duration-500 -z-10 transform rotate-2"></div>
          <Image
            src="https://via.placeholder.com/1600x900/000000/FFFFFF?text=ABOUT"
            alt="Design Studio"
            fill
            className="object-cover grayscale contrast-125 hover:contrast-100 transition-all duration-700"
          />
          <div className="absolute bottom-4 right-4 font-mono text-xs bg-black text-white px-2 py-1">
            STUDIO_01 // SHIBUYA
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <span className="font-mono text-xs border border-black px-2 py-1 mb-6 inline-block">
            ABOUT US
          </span>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-[0.9]">
            THE ATELIER OF <br />
            <span className="italic font-serif normal-case tracking-normal">
              Destruction
            </span>
          </h2>

          <p className="font-mono text-sm md:text-base leading-relaxed mb-8 text-black/70">
            Founded in 2025, Resolv operates at the intersection of
            industrial design and avant-garde fashion. Our atelier is a
            laboratory where fabrics are treated as raw construction materials.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-2 text-lg">SUSTAINABLE DECAY</h4>
              <p className="text-xs text-black/60">
                We use organic dyes and recycled tactical fabrics designed to
                patina over time.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">LIMITED EDITION</h4>
              <p className="text-xs text-black/60">
                Small batch production. Each piece is numbered and archived.
              </p>
            </div>
          </div>

          <Button className="rounded-none bg-black text-white hover:bg-transparent hover:text-black border border-transparent hover:border-black uppercase tracking-widest px-8 py-6">
            Explore The Studio
          </Button>
        </div>
      </div>
    </section>
  );
}

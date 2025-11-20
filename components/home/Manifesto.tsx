import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Manifesto() {
  return (
    <section className="relative py-32 px-4 md:px-12 flex flex-col md:flex-row gap-12 items-start">
      <div className="w-full md:w-1/3 sticky top-24 z-10">
        <span className="font-mono text-xs border border-white/20 px-2 py-1">
          MANIFIESTO
        </span>
        <h3 className="font-display text-3xl mt-4 leading-tight">
          WE DO NOT DESIGN CLOTHES. WE ARCHITECT IDENTITIES.
        </h3>
      </div>
      <div className="w-full md:w-2/3 font-sans text-lg md:text-2xl leading-relaxed text-neutral-400 relative z-10">
        <p className="mb-8">
          Cada pieza es un solo de guitarra atemporal, extraído de la cacofonía
          global y puesto en loop por su resonancia perfecta. Somos los dealers
          de la actitud <span className="line-through">silenciosa</span>,
          curando el equipamiento de quienes se mueven al margen del{" "}
          <span className="italic">mainstream</span>
        </p>
        {/* <p>
          Each piece is a limited artifact, crafted with precision and intended
          to age, distress, and evolve with its wearer. This is not fashion.
          This is uniform for the new era.
        </p> */}
        {/* <Button
          variant="link"
          className="text-white p-0 mt-8 text-xl hover:text-neutral-400 font-mono uppercase"
        >
          Read Full Story <ArrowRight className="ml-2 h-5 w-5" />
        </Button> */}
      </div>
      {/* Background brand text -- low opacity, behind content */}
      <h2
        aria-hidden
        className="pointer-events-none select-none absolute font-bold left-1/2 bottom-8 -translate-x-1/2 translate-y-0 font-display text-[20vw] md:text-[10rem] lg:text-[14rem] leading-none tracking-tight text-white/10 z-0"
      >
        CLEO
      </h2>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Manifesto() {
  return (
    <section className="py-32 px-4 md:px-12 flex flex-col md:flex-row gap-12 items-start">
      <div className="w-full md:w-1/3 sticky top-24">
        <span className="font-mono text-xs border border-white/20 px-2 py-1">
          MANIFESTO
        </span>
        <h3 className="font-display text-3xl mt-4 leading-tight">
          WE DO NOT DESIGN CLOTHES. WE ARCHITECT IDENTITIES.
        </h3>
      </div>
      <div className="w-full md:w-2/3 font-sans text-lg md:text-2xl leading-relaxed text-neutral-400">
        <p className="mb-8">
          In a world of noise, silence is the ultimate luxury. Our garments are
          stripped of the unnecessary, leaving only form, function, and fabric.
          Inspired by the brutalist structures that define our urban landscapes,
          we create protective layers for the modern nomad.
        </p>
        <p>
          Each piece is a limited artifact, crafted with precision and intended
          to age, distress, and evolve with its wearer. This is not fashion.
          This is uniform for the new era.
        </p>
        <Button
          variant="link"
          className="text-white p-0 mt-8 text-xl hover:text-neutral-400 font-mono uppercase"
        >
          Read Full Story <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

import { Zap, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import { Suspense } from "react";

export const NEXT_DROP: any = {
  title: "COLLECTION 04: ENTROPY",
  // compute date 3 days from module load / render
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  description: "LIMITED RELEASE / 10 UNITS. NO RESTOCKS",
};

const DropZone = () => {
  // Keep the server component static; use a client-side `CountdownTimer` for live updates

  return (
    <section
      id="drop"
      className="w-full bg-nexus-gray py-24 px-6 relative overflow-hidden border-t border-white/10"
    >
      {/* Marble Texture Background */}
      {/* <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1598551636736-4e3208a00d3d?q=80&w=2000&auto=format&fit=crop&grayscale')`,
          backgroundSize: "cover",
        }}
      /> */}

      {/* Scanlines */}
      <div className="scanlines opacity-10"></div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-nexus-acid/50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-nexus-acid/50" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="flex items-center gap-2 text-nexus-acid mb-6 animate-pulse">
            <Globe size={16} />
            <span className="font-mono text-xs tracking-widest">
              RELEASE // DROP 04 OPEN
            </span>
          </div>

          <h2 className="font-display text-5xl md:text-8xl font-bold text-white mb-6 leading-[0.8] tracking-tighter">
            THE
            <br />
            90'S DROP
          </h2>
          <p className="font-mono text-nexus-concrete text-sm md:text-base max-w-md mb-8 leading-relaxed border-l border-nexus-acid pl-4">
            {NEXT_DROP.description}. Acceso exclusivo a la próxima colección
            limitada de RESOLV. Marca la fecha y prepárate para asegurar tus
            piezas antes de que se agoten.
          </p>

          <Link
            href="#drop"
            className="group relative inline-flex bg-white text-nexus-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-widest overflow-hidden hover:bg-nexus-acid transition-colors duration-300 items-center gap-4"
          >
            <span className="relative z-10 text-black">Ver Drop</span>
            <ArrowRight
              size={18}
              className="relativ text-black e z-10 group-hover:translate-x-1 transition-transform"
            />

            <div className="absolute inset-0 bg-nexus-acid transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center lg:items-end">
          <Suspense fallback={<div>Cargando cuenta regresiva...</div>}>
            <CountdownTimer targetDate={NEXT_DROP.date} />
          </Suspense>
          <div className="mt-8 inline-block border border-nexus-acid px-4 py-1 bg-nexus-acid/10">
            <span className="text-nexus-acid font-mono text-xs tracking-widest uppercase flex items-center gap-2">
              <Zap size={12} className="fill-nexus-acid" />
              Estado: Cuenta regresiva en vivo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropZone;

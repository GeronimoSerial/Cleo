import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-32 px-4 md:px-12 bg-white text-black relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative group aspect-[4/3] md:h-[480px]">
          <div className="absolute -inset-4 bg-black/5 group-hover:bg-black/10 transition-colors duration-500 -z-10 transform rotate-2"></div>
          <Image
            src="/products/img.jpg"
            alt="Estudio de Diseño"
            fill
            className="object-cover grayscale contrast-125 hover:contrast-100 transition-all duration-700"
          />
          <div className="absolute bottom-4 right-4 font-mono text-xs bg-black text-white px-2 py-1">
            STUDIO_01 // SHATO
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <span className="font-mono text-xs border border-black px-2 py-1 mb-6 inline-block">
            SOBRE NOSOTROS
          </span>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-[0.9]">
            LA INDUMENTARIA ROCK <br />
            <span className="italic font-serif normal-case tracking-normal">
              QUE NECESITÁS
            </span>
          </h2>

          <p className="font-mono text-sm md:text-base leading-relaxed mb-8 text-black/70">
            En RESOLV construimos tu actitud. Desde 2025, traemos la moda más
            vanguardista a Corrientes, creando piezas que son tanto diseño
            industrial como pura rebeldía
          </p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-2 text-lg">EDICIÓN LIMITADA</h4>
              <p className="text-xs text-black/60">
                Colecciones exclusivas. No hay reposición. Cada pieza está
                numerada y archivada. Conseguí la tuya antes de que se agote.
              </p>
            </div>
            {/* <div>
              <h4 className="font-bold mb-2 text-lg">EDICIÓN LIMITADA</h4>
              <p className="text-xs text-black/60">
                Producción en pequeños lotes. Cada pieza está numerada y
                archivada.
              </p>
            </div> */}
          </div>

          <Button
            className="rounded-none bg-black text-white hover:bg-transparent hover:text-black border border-transparent hover:border-black uppercase tracking-widest px-8 py-6"
            asChild
          >
            <Link
              href="https://instagram.com/cleo.street_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conocénos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

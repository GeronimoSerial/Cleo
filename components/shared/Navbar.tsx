"use client";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="grain opacity-20 z-50 pointer-events-none fixed inset-0"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-6 py-6 mix-blend-difference text-white">
        <div className="flex items-center gap-4 col-start-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-mono text-xs hidden md:block tracking-widest">
            EST. 2025 // Corrientes - Argentina
          </span>
        </div>

        <div className="col-start-2 justify-self-center">
          <Link href="/">
            <span className="font-display text-2xl text-center md:text-4xl font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity">
              RESOLV
            </span>
          </Link>
        </div>

        {/* <div className="flex items-center gap-4 col-start-3">
          <span className="font-mono text-xs hidden md:block">CART (0)</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none hover:bg-white hover:text-black transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div> */}
      </nav>

      {/* Full Screen Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? "0%" : "-100%",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-60 bg-background flex flex-col justify-center items-center"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 rounded-none hover:bg-white hover:text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="h-8 w-8" />
        </Button>
        <div className="flex flex-col gap-8 text-center">
          {/* Define menu items with id for direct smooth scrolling (no anchor navigation) */}
          {[
            { label: "Collections", id: "latest-arrivals" },
            { label: "Manifiesto", id: "manifesto" },
            { label: "Drop", id: "drop" },
          ].map((item) => (
            <a
              key={item.label}
              href={`/#${item.id}`}
              onClick={async (e) => {
                e.preventDefault();
                setIsMenuOpen(false);

                // Try to scroll to the section if it's on the current page
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  return;
                }

                // If the section isn't found on the current DOM (different page), navigate to home + hash
                // This keeps behavior simple: it's not a link, it's a scroll to an id when present.
                await router.push(`/#${item.id}`);
                // After navigation, attempt to smooth scroll. Small delay to give the page a chance to render.
                setTimeout(() => {
                  const el2 = document.getElementById(item.id);
                  if (el2) el2.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
              className="font-display text-4xl md:text-6xl uppercase hover:text-stroke hover:text-transparent transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

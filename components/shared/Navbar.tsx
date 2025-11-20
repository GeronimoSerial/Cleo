"use client";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="grain opacity-20 z-50 pointer-events-none fixed inset-0"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-mono text-xs hidden md:block tracking-widest">
            EST. 2025 // TOKYO — PARIS
          </span>
        </div>

        <Link href="/">
          <span className="font-display text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity">
            VANTABLACK
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs hidden md:block">CART (0)</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none hover:bg-white hover:text-black transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
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
          {["Collections", "Archive", "Manifesto", "Account"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-display text-4xl md:text-6xl uppercase hover:text-stroke hover:text-transparent transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { HamburgerMenu } from "./hamburger-menu";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show header on home page (it has its own logo positioning)
  if (pathname === "/") {
    return (
      <div className="fixed top-4 right-4 z-50">
        <HamburgerMenu />
      </div>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-md border-b border-dark-600"
          : "bg-transparent"
      }`}
    >
      {/* Rock-themed background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Guitar string lines */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${30 + i * 20}%`,
                opacity: 0.3 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="scale-75 md:scale-100">
              <Logo />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-white">CLEO</h1>
              <p className="text-xs md:text-sm text-gray-400">
                Streetwear & ROCK
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === "/" ? "text-white" : "text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname.startsWith("/products")
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Products
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Button - Desktop */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex p-2 bg-dark-800 hover:bg-dark-600 border border-dark-600 hover:border-gray-500 transition-all duration-300"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 text-gray-300" />
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 bg-dark-800 hover:bg-dark-600 border border-dark-600 hover:border-gray-500 transition-all duration-300 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-gray-300" />
              {/* Cart count badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Button>

            {/* Hamburger Menu */}
            <HamburgerMenu />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white to-transparent transition-opacity duration-300 ${
          isScrolled ? "opacity-20" : "opacity-0"
        }`}
      />
    </header>
  );
}

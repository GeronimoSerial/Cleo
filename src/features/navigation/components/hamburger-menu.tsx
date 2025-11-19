"use client";

import { useState, useEffect } from "react";
import { X, Home, ShoppingBag, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/products-data";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const heights: number[] = [12, 14, 10, 16, 13, 15, 11, 14];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "All Products", icon: ShoppingBag },
    ...categories.map((category) => ({
      href: `/products/${category.slug}`,
      label: category.name,
      icon: ShoppingBag,
    })),
  ];

  return (
    <>
      {/* Hamburger Button */}
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="sm"
        className="relative z-50 p-2 bg-dark-800 hover:bg-dark-600 border border-dark-600 hover:border-gray-500 transition-all duration-300 lg:hidden"
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-6 h-6">
          {/* Animated hamburger lines */}
          <span
            className={`absolute top-1 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 top-2.5" : ""
            }`}
          />
          <span
            className={`absolute top-2.5 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute top-4 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 top-2.5" : ""
            }`}
          />
        </div>
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Navigation Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-dark-900 border-l border-dark-600 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Rock-themed Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {/* Guitar fret lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white"
              style={{
                top: `${15 + i * 10}%`,
                opacity: 0.3 - i * 0.03,
              }}
            />
          ))}

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white opacity-30" />

          {/* Guitar pick shapes */}
          <div
            className="absolute top-1/4 right-8 w-4 h-5 bg-white opacity-20"
            style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
          />
          <div
            className="absolute bottom-1/3 right-12 w-3 h-4 bg-white opacity-15"
            style={{ clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)" }}
          />
        </div>

        {/* Menu Header */}
        <div className="relative z-10 p-6 border-b border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">RESOLV</h2>
              <p className="text-sm text-gray-400">Streetwear & ROCK</p>
            </div>
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-dark-700 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-gray-400" />
            </Button>
          </div>

          {/* Decorative line */}
          <div className="mt-4 w-16 h-0.5 bg-linear-to-r from-white to-transparent opacity-50" />
        </div>

        {/* Navigation Links */}
        <div className="relative z-10 flex-1 overflow-y-auto py-6">
          <div className="px-6 space-y-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              const isCategory =
                link.href.startsWith("/products/") && link.href !== "/products";

              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black"
                        : "text-gray-300 hover:text-white hover:bg-dark-700"
                    } ${isCategory ? "ml-4 text-sm" : ""}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{link.label}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-black rounded-full animate-pulse" />
                    )}

                    {/* Hover effect */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-white transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-6 my-6 border-t border-dark-600" />

          {/* Additional Links */}
          <div className="px-6 space-y-2">
            <Link href="/#about">
              <div className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-dark-700 transition-all duration-300">
                <Info className="w-5 h-5 shrink-0" />
                <span className="font-medium">About</span>
              </div>
            </Link>
            <Link href="/#contact">
              <div className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-dark-700 transition-all duration-300">
                <Mail className="w-5 h-5 shrink-0" />
                <span className="font-medium">Contact</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="relative z-10 p-6 border-t border-dark-600">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">© 2023 RESOLV</p>
            <p className="text-xs text-gray-600">Where Street Meets Rock</p>
          </div>
          {/* Sound wave visualization */}
          <div className="flex justify-center mt-4 space-x-1">
            {heights.map((height: number, i: number) => (
              <div
                key={i}
                className="w-0.5 bg-gray-600 animate-pulse"
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

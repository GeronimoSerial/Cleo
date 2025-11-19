"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Flame, ShoppingBag, Instagram, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickyWhatsAppButtonDark } from "../sticky-whatsapp-button-dark";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Drops",
    href: "/drop/shato-3",
    icon: Flame,
  },
  {
    name: "Shop",
    href: "/#collection",
    icon: ShoppingBag,
  },
  {
    name: "WhatsaApp",
    href: "/cart",
    icon: Phone,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/shato.store",
    icon: Instagram,
    external: true,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (href.includes("#")) {
      const element = document.querySelector(href.split("#")[1]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-dark-900/95 backdrop-blur-md border-t border-dark-600/30",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("#")[0]);

          const Icon = item.icon;

          return (
            <div key={item.name} className="flex-1">
              {item.external ? (
                <button
                  onClick={() => handleNavClick(item.href, item.external)}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-1 rounded-lg",
                    "transition-all duration-200 ease-in-out",
                    "hover:bg-dark-600/30 active:scale-95",
                    "group relative overflow-hidden",
                  )}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-full transition-all duration-200",
                      "cursor-pointer",
                    )}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 mt-1 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.includes("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-1 rounded-lg",
                    "transition-all duration-200 ease-in-out",
                    "hover:bg-dark-600/30 active:scale-95",
                    "group relative overflow-hidden",
                  )}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-gray-100 text-dark-900 shadow-lg shadow-gray-100/20"
                        : "bg-dark-600/50 text-gray-400 group-hover:bg-dark-500/70 group-hover:text-gray-200",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium mt-1 transition-colors",
                      isActive
                        ? "text-gray-100"
                        : "text-gray-400 group-hover:text-gray-200",
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gray-100 rounded-full" />
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Sparkles } from "lucide-react";

export function DropHero() {
  const scrollToNarrative = () => {
    document.getElementById("narrative-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const dropName = "Drop Shato #3";
  const dropFrase = "Redefiniendo el Streetwear Premium";
  const dropDescription =
    "Una fusión perfecta entre la elegancia urbana y la comodidad absoluta. Cada pieza cuenta una historia de innovación y estilo atemporal.";
  const dropStatus = "Lanzado";

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className="bg-white/10 text-white border-white/20 px-6 py-3 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {dropStatus}
            </Badge>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
              {dropName}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
              {dropFrase}
            </p>
          </div>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {dropDescription}
          </p>

          {/* Scroll Indicator */}
          <div className="pt-12">
            <Button
              variant="ghost"
              size="lg"
              onClick={scrollToNarrative}
              className="text-white hover:bg-white/10 transition-all duration-300 group"
            >
              Descubre la Historia
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}

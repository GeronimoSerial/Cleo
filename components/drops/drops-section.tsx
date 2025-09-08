import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";

interface DropSectionProps {
  dropName?: string;
  subtitle?: string;
  status?: "launched" | "coming-soon" | "ended";
  image?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function DropSection({
  dropName = "Drop Shato #3",
  subtitle = "Edición Limitada",
  status = "launched",
  image = "/file2.png",
  ctaText = "Ver Colección",
  onCtaClick,
}: DropSectionProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "launched":
        return {
          text: "Lanzado",
          icon: CheckCircle,
          className: "bg-green-500/20 text-green-400 border-green-500/30",
        };
      case "coming-soon":
        return {
          text: "Próximamente",
          icon: Clock,
          className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        };
      case "ended":
        return {
          text: "Finalizado",
          icon: XCircle,
          className: "bg-red-500/20 text-red-400 border-red-500/30",
        };
      default:
        return {
          text: "Lanzado",
          icon: CheckCircle,
          className: "bg-green-500/20 text-green-400 border-green-500/30",
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <section className="relative w-full min-h-screen bg-transparent overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 " />
      </div> */}

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Content Side */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge
                variant="outline"
                className={`${statusConfig.className} px-4 py-2 text-sm font-medium border backdrop-blur-sm`}
              >
                <StatusIcon className="w-4 h-4 mr-2" />
                {statusConfig.text}
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {dropName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
              Descubre la nueva colección que redefine el streetwear premium.
              Diseños únicos, calidad excepcional y estilo inigualable.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-white text-black hover:bg-gray-200 transition-all duration-300 px-8 py-6 text-lg font-semibold group"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-500 justify-center lg:justify-start">
              {/* <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Envío gratuito</span>
              </div> */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Stock limitado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Calidad premium</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative order-1 lg:order-2">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/30">
                <img
                  src={image || "/placeholder.svg"}
                  alt={dropName}
                  className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Elements */}
                <div className="absolute top-6 right-6">
                  <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
                    Nuevo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      {/*<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />*/}
    </section>
  );
}

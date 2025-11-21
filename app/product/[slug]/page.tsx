import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { getProductBySlug } from "@/lib/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";
import ProductActions from "@/components/products/ProductActions";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  //   const [selectedSize, setSelectedSize] = useState<string | null>(null);
  //   const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const photos = product?.fotos || [];

  const getLabel = (index: number) => {
    const labels = [
      "FRONT VIEW",
      "REVERSE VIEW",
      "TEXTURE MACRO",
      "DETAIL VIEW",
    ];
    return labels[index] || `VIEW_${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Grain Overlay */}
      <div className="opacity-5 z-50 pointer-events-none fixed inset-0"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left: Image Gallery (Scrollable) */}
        <div className="lg:col-span-7 lg:border-r border-white/10 pt-24 lg:pt-0">
          <div className="flex flex-col">
            {photos.map((photo: any, index: number) => {
              // Lógica condicional para el 3er elemento (índice 2) que es "Macro/Video"
              const isMacro = index === 2;

              return (
                <div
                  key={photo.id || index}
                  className={`
                w-full relative border-b border-white/10 group overflow-hidden
                ${isMacro ? "aspect-video" : "aspect-3/4"} 
              `}
                >
                  <Image
                    src={getStrapiMediaUrl(photo.url) || "/placeholder.jpg"}
                    alt={`Product view ${index + 1}`}
                    unoptimized={true}
                    fill
                    className={`
                  w-full h-full object-cover transition-transform duration-700
                  ${
                    isMacro
                      ? "contrast-150 scale-150 group-hover:scale-[1.6]"
                      : "contrast-125 group-hover:scale-105"
                  }
                `}
                  />
                  <div className="absolute bottom-4 left-4 font-mono text-xs bg-black text-white px-2 py-1">
                    FIG_{String(index + 1).padStart(2, "0")} //{" "}
                    {getLabel(index)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Product Details (Sticky) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-0 h-screen overflow-y-auto px-6 py-24 lg:px-12 lg:py-32 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge
                  variant="outline"
                  className="rounded-none border-white/20 text-neutral-400 font-mono text-xs uppercase tracking-widest"
                >
                  {product?.category?.nombre || "CATEGORY"}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500/80">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-neutral-500 text-xs ml-2 font-mono"></span>
                </div>
              </div>

              <h1 className="font-display text-5xl lg:text-7xl leading-[0.85] mb-6 tracking-tight uppercase">
                {product?.nombre || "PRODUCT_NAME"}
              </h1>

              <p className="font-mono text-2xl mb-8">{`$${
                product?.precio?.toLocaleString() || "00.00"
              }`}</p>

              <div className="prose prose-invert mb-12 text-neutral-400 font-sans leading-relaxed max-w-md">
                <p>
                  {product?.descripcion ||
                    "No description available for this product."}
                </p>
              </div>

              <ProductActions
                productName={product?.nombre || "Producto"}
                initialSizes={sizes}
              />
            </div>
            {/* Technical Details Accordion */}
            <div className="mt-auto">
              <Accordion
                type="single"
                collapsible
                className="w-full border-t border-white/10"
              >
                <AccordionItem
                  value="details"
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="font-mono text-sm uppercase tracking-widest hover:no-underline py-6">
                    Technical Specifications
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400 font-mono text-xs leading-relaxed pb-6">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>GSM:</span>
                        <span>480GSM HEAVYWEIGHT COTTON</span>
                      </li>
                      <li className="flex justify-between">
                        <span>FIT:</span>
                        <span>OVERSIZED / BOXY</span>
                      </li>
                      <li className="flex justify-between">
                        <span>ORIGIN:</span>
                        <span>SHATO</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CARE:</span>
                        <span>COLD WASH / HANG DRY</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="shipping"
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="font-mono text-sm uppercase tracking-widest hover:no-underline py-6">
                    Envíos & Devoluciones
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400 font-sans text-sm pb-6">
                    Retirá en tienda o envíos a todo el país. Para cambios y
                    devoluciones, contáctenos directamente para obtener más
                    información.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

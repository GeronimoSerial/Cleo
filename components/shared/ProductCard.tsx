import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ProductCard({
  image,
  title,
  price,
  tag,
}: {
  image: any;
  title: string;
  price: string;
  tag: string;
}) {
  return (
    <div className="group relative bg-black aspect-3/4 overflow-hidden border-r border-white/10 last:border-r-0">
      <div className="absolute top-4 left-4 z-20">
        <Badge
          variant="outline"
          className="rounded-none border-black text-black bg-white font-mono text-xs"
        >
          {tag}
        </Badge>
      </div>

      <div className="w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-0 group-hover:grayscale"
        />
      </div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ">
        <Button className="rounded-none bg-white text-black hover:bg-black hover:text-white border border-transparent hover:border-white uppercase tracking-widest">
          Ver producto
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-mono text-sm text-neutral-400 mb-1">
              04_COLLECTION
            </h3>
            <p className="font-display text-xl text-white leading-none">
              {title}
            </p>
          </div>
          <p className="font-mono text-lg text-white">{price}</p>
        </div>
      </div>
    </div>
  );
}

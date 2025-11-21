import { Skeleton } from "@/components/ui/skeleton";

export default function LatestArrivalsSkeleton() {
  return (
    <section className="py-24 px-4 md:px-12 border-b border-white/10">
      <div className="flex justify-between items-end mb-16">
        <Skeleton className="h-10 md:h-16 w-64 md:w-96 bg-neutral-800/50 rounded-none" />
        <Skeleton className="h-5 w-32 bg-neutral-800/50 hidden md:block rounded-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-background relative aspect-[3/4] md:aspect-auto md:h-[600px] flex flex-col p-4"
          >
            <div className="absolute top-4 left-4 z-10">
              <Skeleton className="h-5 w-20 bg-neutral-800 rounded-none" />
            </div>

            <div className="flex-1 w-full relative mb-6">
              <Skeleton className="absolute inset-0 w-full h-full bg-neutral-900/50 rounded-sm" />
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-5 w-3/4 bg-neutral-800 rounded-none" />
                  <Skeleton className="h-3 w-1/2 bg-neutral-800/60 rounded-none" />
                  <Skeleton className="h-3 w-1/2 bg-neutral-800/60 rounded-none" />
                </div>
                <Skeleton className="h-5 w-16 bg-neutral-800 rounded-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

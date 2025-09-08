import { DropHero } from "@/components/drops/drop-hero";
import { DropNarrative } from "@/components/drops/drop-narrative";
import { DropLookbook } from "@/components/drops/drop-lookbook";
export default function DropPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <DropHero />
      <DropNarrative />
      <DropLookbook />
    </main>
  );
}

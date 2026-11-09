// Ported structure from NTWGC's src/app/wellness/mind/page.tsx — Cal.com
// embed and analytics tracker removed (no backend equivalent in TGD).

import { WellnessPageHero } from "@/components/sections/wellness/WellnessPageHero";
import { OfferingBlock } from "@/components/sections/wellness/OfferingBlock";
import { WELLNESS_SUBPAGES } from "@/data/wellness-content";

const data = WELLNESS_SUBPAGES.find((w) => w.slug === "mind")!;

export const metadata = {
  title: "Thank You Mind",
  description: "Mental clarity, consciousness elevation, and unlocking the true power of your mind.",
};

export default function WellnessMindPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <WellnessPageHero variant="dark" title={data.title} subtitle={data.subtitle} />

      {data.offerings.map((offering) => (
        <OfferingBlock key={offering.heading} {...offering} accentColor={data.tierColor} />
      ))}

      <div className="bg-ink pb-20 md:pb-28">
        <span className="mx-auto block h-px w-14 bg-gold" />
        <p className="mx-auto mt-8 max-w-xl px-6 text-center font-display text-[22px] font-light italic text-gold">
          Thank you for choosing to Elevate YOU and the world inside YOU.
        </p>
      </div>
    </main>
  );
}

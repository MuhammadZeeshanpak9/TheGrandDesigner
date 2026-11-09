// Ported structure from NTWGC's src/app/wellness/page.tsx — pure
// presentation, no backend dependency to strip. SignupCta (NTWGC's
// lead-capture newsletter block) dropped since TGD already has its own
// site-wide newsletter signup in the footer; replaced with a link into
// TGD's existing ConnectForm instead of duplicating a second lead form.

import Link from "next/link";
import { WellnessPageHero } from "@/components/sections/wellness/WellnessPageHero";
import { WaveTransition } from "@/components/sections/wellness/WaveTransition";
import { Philosophy } from "@/components/sections/wellness/Philosophy";
import { ServiceCards } from "@/components/sections/wellness/ServiceCards";

const PAPER = "#ffffff";
const PAPER_WARM = "#faf8f4";
const INK = "#16151a";

export const metadata = {
  title: "Wellness",
  description: "Wellness experiences designed With You In Mind — Body, Mind, Soul, and Unlock The Lock.",
};

export default function WellnessPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <WellnessPageHero variant="dark" title="WELLNESS" subtitle="With You In Mind" />
      <WaveTransition fromColor={INK} toColor={PAPER} variant={2} animated />

      <Philosophy />
      <WaveTransition fromColor={PAPER} toColor={PAPER_WARM} variant={1} />

      <ServiceCards />

      <section className="bg-ink py-20 md:py-28 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">GO WITHIN</p>
        <h2 className="font-display font-bold uppercase tracking-[0.08em] text-paper text-2xl md:text-4xl mb-8">
          Ready To Begin?
        </h2>
        <Link
          href="/connect"
          className="inline-flex items-center justify-center px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-gold text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:scale-[1.02] active:scale-[0.98]"
        >
          Connect With The Grand Designer
        </Link>
      </section>
    </main>
  );
}

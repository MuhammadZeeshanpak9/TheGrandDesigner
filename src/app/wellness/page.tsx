"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/sections/motion-variants";

type Tier = {
  tagline: string;
  eyebrow: string;
  title: string;
  price: string;
  ctaLabel: string;
  href: string;
  position: "left" | "center" | "right";
};

const CARD_TIERS: Tier[] = [
  {
    tagline: "INHALE · EXHALE · RELAX",
    eyebrow: "PHYSICAL WELLNESS & VITALITY",
    title: "THANK YOU BODY",
    price: "$5,000+",
    ctaLabel: "Book Session",
    href: "/wellness/body",
    position: "left",
  },
  {
    tagline: "EVERYTHING STARTS IN THE MIND",
    eyebrow: "MENTAL CLARITY & AWARENESS",
    title: "THANK YOU MIND",
    price: "$2,500+",
    ctaLabel: "Book Session",
    href: "/wellness/mind",
    position: "center",
  },
  {
    tagline: "THINK OF LIFE AS AN EXPERIENCE",
    eyebrow: "INNER PEACE & ALIGNMENT",
    title: "THANK YOU SOUL",
    price: "$5,000+",
    ctaLabel: "Book Session",
    href: "/wellness/soul",
    position: "right",
  },
];

export default function WellnessPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6 text-center"
      >
        <h1 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-5xl">
          Wellness
        </h1>
        <p className="mt-4 text-xs tracking-[0.25em] uppercase text-gold">
          With You In Mind
        </p>
        <p className="mt-8 max-w-3xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed">
          WELLNESS in the most simple form is a positive THOUGHT of
          well-being. How healthy or wealthy I become is a factor of my
          mental understanding of my MIND.
        </p>
        <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed">
          THE GRAND DESIGNER is the number 1 self-development and wellness
          brand, created to guide every individual back to their own inner
          understanding — body, mind, and soul — so that wellness becomes not
          a destination but a way of experiencing life itself.
        </p>
      </motion.section>

      <section className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto mb-16 items-center"
        >
          {CARD_TIERS.map((tier) => {
            const isCenter = tier.position === "center";
            return (
              <motion.div
                key={tier.href}
                variants={fadeInUp}
                className={cn(
                  "rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2",
                  isCenter
                    ? "border border-gold bg-gradient-to-b from-gold/25 to-gold/10 backdrop-blur-md shadow-[0_16px_40px_rgba(184,145,47,0.25)] md:scale-110 md:py-12 z-10 hover:shadow-[0_24px_56px_rgba(184,145,47,0.35)]"
                    : cn(
                        "border border-mist bg-white/60 backdrop-blur-md hover:shadow-[0_16px_32px_rgba(22,21,26,0.12)]",
                        tier.position === "left"
                          ? "md:-rotate-3 md:origin-bottom-right hover:md:rotate-0"
                          : "md:rotate-3 md:origin-bottom-left hover:md:rotate-0",
                      ),
                )}
              >
                <p
                  className={cn(
                    "text-[11px] tracking-[0.25em] uppercase mb-4",
                    isCenter ? "text-ink/70" : "text-ink/50",
                  )}
                >
                  {tier.tagline}
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
                  {tier.eyebrow}
                </p>
                <h2
                  className={cn(
                    "font-display font-bold uppercase tracking-[0.06em] text-ink mb-4",
                    isCenter ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
                  )}
                >
                  {tier.title}
                </h2>
                <p
                  className={cn(
                    "font-semibold text-ink mb-6",
                    isCenter ? "text-xl" : "text-lg",
                  )}
                >
                  {tier.price}
                </p>
                <Link
                  href={tier.href}
                  className={cn(
                    "inline-flex items-center justify-center px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    isCenter
                      ? "bg-gold text-ink hover:bg-gold/90"
                      : "bg-ink text-paper hover:bg-teal",
                  )}
                >
                  {tier.ctaLabel}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto rounded-2xl border border-gold/40 bg-[#0d0b08]/90 backdrop-blur-md px-6 py-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">
            GO WITHIN
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            THE GRAND DESIGNER.
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.08em] text-paper text-2xl md:text-4xl mb-4">
            UNLOCK THE LOCK
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gold mb-6">
            Enquire
          </p>
          <Link
            href="/wellness/unlock-the-lock"
            className="inline-flex items-center justify-center px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-gold text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:scale-[1.02] active:scale-[0.98]"
          >
            Enquire
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

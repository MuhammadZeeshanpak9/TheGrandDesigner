"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Testimonial = { quote: string; name: string; context: string };

// TODO: replace placeholder testimonials with real client quotes before launch
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "This experience changed how I understand myself completely. I didn't know 'HOW' until I went within.",
    name: "[Client Name]",
    context: "Body Session",
  },
  {
    quote:
      "The Mind session gave me clarity I'd been searching for years. Everything really does start in the mind.",
    name: "[Client Name]",
    context: "Mind Session",
  },
  {
    quote:
      "Working with The Grand Designer on Unlock The Lock was the single greatest investment I've made in myself.",
    name: "[Client Name]",
    context: "Unlock The Lock",
  },
  {
    quote:
      "The Soul session helped me find a stillness I didn't know I was missing. I feel aligned for the first time.",
    name: "[Client Name]",
    context: "Soul Session",
  },
];

// Duplicated so the strip can loop seamlessly from -50% back to 0%.
const TRACK = [...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6 overflow-hidden">
      <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl text-center mb-14">
        What They Say
      </h2>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {TRACK.map((t, i) => {
            const isGold = i % 2 === 0;
            return (
              <div
                key={`${t.name}-${t.context}-${i}`}
                className={cn(
                  "w-[320px] shrink-0 rounded-xl p-6 shadow-sm backdrop-blur-md transition-all duration-300",
                  isGold
                    ? "border border-gold bg-gold/15 hover:shadow-[0_8px_24px_rgba(184,145,47,0.25)]"
                    : "border border-mist bg-white/70 hover:shadow-[0_8px_24px_rgba(22,21,26,0.08)]",
                )}
              >
                <p
                  className={cn(
                    "text-sm leading-relaxed italic",
                    isGold ? "text-ink/90" : "text-ink/80",
                  )}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink">
                  {t.name}
                  <span className="text-ink/50 font-normal normal-case">
                    {" "}
                    — {t.context}
                  </span>
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

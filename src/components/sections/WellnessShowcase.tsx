"use client";

// Ported structure/animation from NTWGC's src/components/sections/Wellness.tsx
// (the homepage 4-card version, not the simpler /wellness hub ServiceCards.tsx)
// — card art, hover/auto-reveal overlay, and stagger timing kept verbatim;
// TGD's own heading/copy/fonts/tokens otherwise.

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";
import { GoWithinArt } from "@/components/sections/wellness/GoWithinArt";
import { MindCardArt } from "@/components/sections/wellness/MindCardArt";

type Card = {
  name: string;
  blurb: string;
  price: string;
  cta: string;
  href: string;
};

const CARDS: Card[] = [
  {
    name: "Thank You Body",
    blurb: "PHYSICAL WELLNESS & VITALITY",
    price: "$5,000+",
    cta: "Book Session",
    href: "/wellness/body",
  },
  {
    name: "Thank You Mind",
    blurb: "MENTAL CLARITY & AWARENESS",
    price: "$2,500+",
    cta: "Book Session",
    href: "/wellness/mind",
  },
  {
    name: "Thank You Soul",
    blurb: "INNER PEACE & ALIGNMENT",
    price: "$5,000+",
    cta: "Book Session",
    href: "/wellness/soul",
  },
  {
    name: "Unlock The Lock",
    blurb: "THE GRAND DESIGNER.",
    price: "$1,000,000+",
    cta: "Enquire",
    href: "/wellness/unlock-the-lock",
  },
];

function CardBackground({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="absolute inset-0 flex flex-col font-sans bg-white">
          <div className="flex-1 border-b-[0.5px] border-[#6b2fa0]/30 flex items-center justify-center text-[#6b2fa0] relative bg-[#f9f5fd]">
            <div className="grid grid-cols-4 gap-x-2 gap-y-[4px] text-center text-[13px] tracking-[0.4em] font-medium mt-4 z-10">
              <span>I</span><span>N</span><span>E</span><span>X</span>
              <span>H</span><span>A</span><span>H</span><span>A</span>
              <span>L</span><span>E</span><span>L</span><span>E</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-[#6b2fa0] opacity-20" />
          </div>
          <div className="flex-1 bg-[#ead9fa] text-[#4b1d75] flex items-center justify-center">
            <div className="flex flex-col items-center gap-[4px] text-[13px] tracking-[0.4em] font-semibold mb-4">
              <div className="flex gap-6"><span>R</span><span>E</span></div>
              <div className="flex gap-6"><span>L</span><span>A</span></div>
              <div>X</div>
            </div>
          </div>
        </div>
      );
    case 1:
      return <MindCardArt />;
    case 2:
      return (
        <div className="absolute inset-0 bg-[#fdfcff] flex items-center justify-center p-4">
          <div className="relative flex items-center justify-center w-full max-w-[160px] h-32">
            <div className="absolute left-0 top-0 bottom-0 w-[55px] border border-[#bd9de0] bg-[#f5ecfd] shadow-sm" />
            <div className="relative z-10 flex items-center w-full px-2">
              <div className="text-[#8861b5] text-[9px] tracking-[0.2em] leading-[2] text-right w-[45px] mr-[10px]">
                THINK<br />OF<br />LIFE<br />AS<br />AN
              </div>
              <div className="text-[#51237a] text-[11px] tracking-[0.2em] font-medium">
                EXPERIENCE
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return <GoWithinArt />;
    default:
      return <div className="absolute inset-0 bg-[#f7effc]" />;
  }
}

export function WellnessShowcase() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(1024);
  const autoReveal = isMobile && !reduced;

  return (
    <section className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6">
      <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl text-center mb-14">
        Soul. Mind. Body.
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto lg:items-center">
        {CARDS.map((card, i) => {
          // Mind/Soul (the 2 middle cards) pop forward and sit above the
          // row; Body tilts left, Unlock The Lock tilts right — mirroring
          // TGD's earlier 3-card left/center/right treatment, extended to 4.
          const isPopped = i === 1 || i === 2;
          const tiltClass =
            i === 0
              ? "lg:-rotate-3 lg:origin-bottom-right"
              : i === 3
                ? "lg:rotate-3 lg:origin-bottom-left"
                : "";

          return (
            <Link key={card.name} href={card.href} className="block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2px] h-[400px] shadow-sm transition-all duration-300 hover:shadow-[0_20px_60px_rgba(184,145,47,0.25)] bg-white hover:-translate-y-2",
                  tiltClass,
                  isPopped
                    ? "lg:scale-105 lg:z-10 lg:shadow-[0_16px_40px_rgba(184,145,47,0.2)]"
                    : "lg:hover:rotate-0",
                )}
              >
                <CardBackground index={i} />

                {/* Default name label at bottom (visible when NOT hovering, desktop only) */}
                <div className="absolute inset-x-0 bottom-0 p-4 hidden justify-center bg-gradient-to-t from-white/90 to-transparent transition-opacity duration-300 lg:flex lg:group-hover:opacity-0">
                  <span className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-ink drop-shadow-sm">
                    {card.name}
                  </span>
                </div>

                {/* Info overlay — auto-crossfades with the art on mobile, hover-reveal on desktop. */}
                <motion.div
                  className={`absolute inset-0 bg-ink/90 transition-opacity duration-300 ${
                    reduced ? "opacity-100 lg:opacity-0" : "opacity-0"
                  } lg:group-hover:opacity-100 flex flex-col justify-between p-6 md:p-8 z-20 backdrop-blur-sm`}
                  initial={autoReveal ? { opacity: 0 } : undefined}
                  animate={autoReveal ? { opacity: [0, 0, 1, 1, 0] } : undefined}
                  transition={
                    autoReveal
                      ? {
                          duration: 8,
                          times: [0, 0.375, 0.5, 0.875, 1],
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 1.2,
                        }
                      : { duration: 0.3 }
                  }
                >
                  <div>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80 border-b border-paper/20 pb-3">
                      {card.blurb}
                    </p>
                    <h3 className="mt-4 font-sans text-[16px] font-bold uppercase tracking-[0.15em] text-paper leading-snug">
                      {card.name}
                    </h3>
                  </div>

                  <div>
                    <p className="font-display text-[28px] text-paper mb-4">{card.price}</p>
                    <span className="flex w-fit items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-paper bg-paper/10 group-hover:bg-paper/20 px-4 py-2 rounded-full transition-colors">
                      {card.cta}
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

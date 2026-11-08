"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";
import { BookingTierList } from "@/components/sections/BookingTierList";

const TIERS = [
  { label: "1 hr — Online", price: "$1,000,000" },
  { label: "30 min — One-on-One", price: "$2,000,000" },
  { label: "1 hr — One-on-One", price: "$4,000,000" },
  { label: "30 min — Media Appearance", price: "$5,000,000" },
  { label: "1 hr — Media Appearance", price: "$10,000,000" },
  { label: "30 min — Public Speaking", price: "$10,000,000" },
  { label: "1 hr — Public Speaking", price: "$25,000,000" },
];

export default function WellnessUnlockTheLockPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="bg-[#0d0b08]/90 backdrop-blur-md py-20 md:py-28 px-6"
      >
        <div className="text-center mb-10">
          <h1 className="font-display font-bold uppercase tracking-[0.1em] text-paper text-3xl md:text-4xl">
            Unlock The Lock.
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-sm md:text-base text-paper/70 leading-relaxed">
            This session is a custom mental and emotional analysis integrated
            with spiritual understanding of SELF that has been proven to be
            100% accurate and precise as the UNIVERSAL SECRET.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10 border border-gold/40 bg-gold/5 backdrop-blur-md rounded-xl px-6 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold">
            All 1 on 1 Consultation Experience Includes A Luxury Private Jet
            To A Highly Confidential Location.
          </p>
        </div>

        <p className="text-center text-xs tracking-[0.3em] uppercase text-gold/50 mb-10">
          Go Within — Body. Mind. Soul.
        </p>

        <BookingTierList tiers={TIERS} premium />
      </motion.section>
    </main>
  );
}

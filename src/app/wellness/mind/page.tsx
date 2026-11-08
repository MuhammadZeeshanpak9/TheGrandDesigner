"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";
import { BookingTierList } from "@/components/sections/BookingTierList";

const HEALTH_TIERS = [
  { label: "30 min — Phone", price: "$2,500" },
  { label: "1 hr — Phone", price: "$5,000" },
  { label: "30 min — Video", price: "$25,000" },
  { label: "1 hr — Video", price: "$50,000" },
  { label: "30 min — One-on-One", price: "$250,000" },
  { label: "1 hr — One-on-One", price: "$500,000" },
];

const WEALTH_TIERS = [
  { label: "1 hr — Phone", price: "$5,000" },
  { label: "1 hr — Video", price: "$50,000" },
  { label: "30 min — One-on-One", price: "$250,000" },
  { label: "1 hr — One-on-One", price: "$500,000" },
  { label: "30 min — Movie Production", price: "$500,000" },
  { label: "1 hr — Movie Production", price: "$1,000,000" },
];

export default function WellnessMindPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6"
      >
        <div className="text-center mb-10">
          <h1 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl">
            Mental Health
          </h1>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">
            Health is a &ldquo;Mental&rdquo; State of Well-Being.
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed text-center">
          To understand my health, it&apos;s important to understand
          &lsquo;HOW&rsquo; my mind operates the function of my body in the
          physical reality in regards to sickness and diseases. The universe
          is mental. I AM a mental spiritual being having physical life
          experiences. HEALING starts from WITHIN, expressed to the physical
          reality as wellness for my ultimate well-being. YES. YOU can heal
          from anything and everything when YOU know the mental
          &lsquo;HOW&rsquo;.
        </p>

        <div className="text-center mt-12 mb-8">
          <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-xl md:text-2xl">
            U.M.E (Understanding My Emotions)
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-ink/70 leading-relaxed">
            This session is a custom mental and emotional analysis integrated
            with spiritual understanding of SELF that has proven to 100%
            provide accurate and precise positive outcomes for individuals
            who practice their truth.
          </p>
        </div>

        <BookingTierList tiers={HEALTH_TIERS} />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6"
      >
        <div className="text-center mb-10">
          <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl">
            Mental Wealth
          </h2>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">
            Wealth is a &ldquo;Mental&rdquo; State of Well-Being.
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed text-center">
          To understand my wealth, it&apos;s important to understand
          &lsquo;HOW&rsquo; my mind operates the function of my body in the
          physical reality in regards to money and success. The universe is
          mental. I AM a mental spiritual being having physical life
          experiences. WEALTH starts from WITHIN, expressed to the physical
          reality as riches and success for my ultimate well-being. YES. YOU
          can attain anything and everything when YOU know the mental
          &lsquo;HOW&rsquo;.
        </p>

        <div className="text-center mt-12 mb-4">
          <h3 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-xl md:text-2xl">
            The World&apos;s Greatest Movie About You
          </h3>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-ink/70 leading-relaxed">
            This session is a custom mental and emotional analysis integrated
            with spiritual understanding of SELF... production is an actual
            movie production created for the individual. (FINANCE OPTIONS
            AVAILABLE)
          </p>
          <p className="mt-6 text-xs tracking-[0.3em] uppercase text-ink/50">
            Everything Starts In The Mind
          </p>
        </div>

        <BookingTierList tiers={WEALTH_TIERS} />
      </motion.section>
    </main>
  );
}

"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";
import { MembershipForm } from "@/components/sections/MembershipForm";

const MEMBERSHIP_OPTIONS = [
  { label: "1 Year — $5,000", value: "1yr" },
  { label: "2 Year — $10,000", value: "2yr" },
];

export default function WellnessBodyPage() {
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
            Physical Wellness
          </h1>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">
            Wellness is a &ldquo;Physical&rdquo; State of Well-Being.
          </p>
        </div>

        <MembershipForm options={MEMBERSHIP_OPTIONS} />

        <p className="max-w-xl mx-auto mt-8 text-center text-sm text-ink/70 leading-relaxed">
          It is always a Win-Win for the family of Greatness! It only gets
          GREATER. For more information email:{" "}
          <a
            href="mailto:winwin@thegranddesigner.com"
            className="text-ink underline hover:text-teal transition-colors"
          >
            winwin@thegranddesigner.com
          </a>
        </p>

        <div className="max-w-xl mx-auto mt-10 border-t border-mist pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/60 mb-3 text-center">
            Collaborators
          </p>
          <ul className="text-sm text-ink/70 leading-relaxed text-center space-y-1">
            <li>Modern spa/yoga centers</li>
            <li>Modern/new age fitness centers</li>
            <li>Modern dance studio</li>
            <li>Technology companies created to enhance the human body</li>
            <li>Wellness seminars/workshops/programs</li>
          </ul>
        </div>
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
            Physical Success and Riches
          </h2>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">
            Success and Riches is a &ldquo;Physical&rdquo; State of
            Well-Being.
          </p>
        </div>

        <MembershipForm options={MEMBERSHIP_OPTIONS} />

        <div className="max-w-xl mx-auto mt-10 border-t border-mist pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/60 mb-3 text-center">
            Collaborators
          </p>
          <ul className="text-sm text-ink/70 leading-relaxed text-center space-y-1">
            <li>Billionaire mentors</li>
            <li>Successful and rich investors</li>
            <li>Prosperity seminars/workshops/programs</li>
          </ul>
        </div>
      </motion.section>
    </main>
  );
}

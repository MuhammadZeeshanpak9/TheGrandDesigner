"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "@/components/sections/motion-variants";

export function StoryBlock() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-32 px-6 text-center"
    >
      <p className="text-xs tracking-[0.25em] uppercase text-gold mb-6">
        Our Story
      </p>
      <p className="font-display italic text-xl md:text-3xl text-ink max-w-3xl mx-auto leading-relaxed">
        &ldquo;The greatest expression of oneself is adding value to others.
        The greatest gift I can give myself is to know myself from
        WITHIN.&rdquo;
      </p>
      <p className="mt-6 text-xs tracking-[0.2em] uppercase text-ink/50">
        — By Creators
      </p>
      <p className="mt-10 max-w-2xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed">
        THE GRAND DESIGNER is the creator of this grand design called LIFE.
        Experiencing itself through a series of imaginations manifesting in
        the now — no name, no time — only through its desires to enjoy its
        creativity.
      </p>
      <p className="font-display font-bold uppercase tracking-[0.2em] text-ink text-2xl md:text-3xl mt-10">
        I. AM. YOU.
      </p>
      <Link
        href="/our-story"
        className="inline-block mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-ink hover:text-teal transition-colors"
      >
        Know More →
      </Link>
    </motion.section>
  );
}

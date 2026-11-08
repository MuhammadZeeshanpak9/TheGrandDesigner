"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";

export function IntroBlock() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-32 px-6 text-center"
    >
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-6">
        WITH YOU IN MIND
      </p>
      <p className="font-display text-xl md:text-2xl text-ink max-w-3xl mx-auto leading-relaxed">
        Inside every experience with THE GRAND DESIGNER is an invitation to
        rise — to reinvent, to renew, and to remember who you truly are.
      </p>
      <p className="font-display font-bold uppercase tracking-[0.2em] text-ink text-2xl md:text-3xl mt-10">
        I. AM. YOU.
      </p>
    </motion.section>
  );
}

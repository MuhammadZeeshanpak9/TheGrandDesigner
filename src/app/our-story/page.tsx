"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";

export default function OurStoryPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6 text-center"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-gold mb-6">
          Our Story
        </p>
        <p className="font-display italic text-xl md:text-3xl text-ink max-w-3xl mx-auto leading-relaxed">
          &ldquo;The greatest expression of oneself is adding value to
          others. The greatest gift I can give myself is to know myself from
          WITHIN.&rdquo;
        </p>
        <p className="mt-6 text-xs tracking-[0.2em] uppercase text-ink/50">
          — By Creators
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6 text-center"
      >
        <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-2xl md:text-4xl mb-8">
          1 Water. 12 Understandings
        </h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed">
          THE GRAND DESIGNER is the creator of this grand design called LIFE.
          Experiencing itself through a series of imaginations manifesting in
          the now — no name, no time — only through its desires to enjoy its
          creativity. Sees all. Knows all. Because it is the ALL and the only
          ONE.
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6 text-center"
      >
        <p className="font-display font-bold uppercase tracking-[0.14em] text-ink text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
          Information is Power.
          <br />
          Information is &ldquo;Mental&rdquo; MIND.
          <br />
          Power is &ldquo;Physical&rdquo; REALITY.
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-center md:text-left">
          <div>
            <h3 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-xl mb-4">
              Our Vision
            </h3>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed">
              To create a brand that will positively impact the world and
              every individual to aspire for more enjoyable life experiences
              in this beautiful GRAND DESIGN called LIFE.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-xl mb-4">
              Our Mission
            </h3>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed">
              To ELEV8 YOUR LIFE.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6 text-center"
      >
        <p className="font-display italic text-lg md:text-2xl text-ink max-w-3xl mx-auto leading-relaxed">
          &ldquo;Words are the vibrations of nature. Therefore, beautiful
          words create beautiful nature. Ugly words create ugly nature. This
          is the root of the universe.&rdquo;
        </p>
        <p className="mt-6 text-xs tracking-[0.2em] uppercase text-ink/50">
          — Masaru Emoto
        </p>
        <p className="mt-8 max-w-2xl mx-auto text-sm text-ink/70 leading-relaxed">
          Through the research of Dr. Masaru Emoto and several of the world&apos;s
          top scientists and researchers in the area of water showed how our
          words, thoughts, and emotions impact water and our overall
          well-being.
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 px-6 text-center"
      >
        <p className="font-display font-bold uppercase tracking-[0.2em] text-ink text-2xl md:text-3xl">
          I. AM. YOU.
        </p>
      </motion.section>
    </main>
  );
}

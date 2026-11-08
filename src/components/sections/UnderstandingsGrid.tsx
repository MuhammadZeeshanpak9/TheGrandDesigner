"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { fadeInUp } from "@/components/sections/motion-variants";
import CircularSplitRoll, {
  type CircularSplitRollItem,
} from "@/components/ui/circular-split-roll";

const UNDERSTANDINGS: CircularSplitRollItem[] = [
  { title: "ALL", definition: "Everyone without exception. The grand design." },
  {
    title: "YOU",
    definition:
      "The experiencer of the experience called life. THE GRAND DESIGNER.",
  },
  {
    title: "LOVE",
    definition: "Love begins within myself, then radiates to everything around me.",
  },
  {
    title: "DESIRE",
    definition:
      "The feeling that creates the will to move towards an experience in life.",
  },
  {
    title: "ENERGY",
    definition: "Everything is energy, including myself. I direct it intentionally.",
  },
  {
    title: "BELIEVE",
    definition: "My beliefs create my reality. I believe in myself without a doubt.",
  },
  {
    title: "VIBRATION",
    definition:
      "Emotional connection to reality — always putting out good vibes.",
  },
  {
    title: "MINDSET",
    definition:
      "My perspective of myself and the world around me creates my reality.",
  },
  {
    title: "GRATITUDE",
    definition: "The feeling of connection to an undefined source of love.",
  },
  { title: "FREQUENCY", definition: "The understanding of awareness to life." },
  {
    title: "THOUGHTS",
    definition: "My thoughts are the seeds of my reality — series of imagination.",
  },
  {
    title: "CONSCIOUSNESS",
    definition: "Awareness of my existence in connection to all and everything.",
  },
];

export function UnderstandingsGrid() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      className="section-fade-edges bg-paper/40 backdrop-blur-md py-20 md:py-28 px-6"
    >
      <div className="text-center mb-14">
        <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl">
          12 Understandings
        </h2>
        <p className="mt-3 text-sm tracking-[0.15em] uppercase text-ink/70">
          One philosophy. <span className="text-gold">Twelve ways to live it.</span>
        </p>
      </div>

      <CircularSplitRoll items={UNDERSTANDINGS} />
    </motion.section>
  );
}

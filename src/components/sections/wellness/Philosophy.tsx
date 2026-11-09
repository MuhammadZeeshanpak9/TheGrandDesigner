"use client";

// Structure ported from NTWGC's src/components/sections/wellness/Philosophy.tsx —
// copy replaced with TGD's own existing wellness-hub philosophy text (no
// ELEV8/water branding carried over). Reuses raw motion.* per project
// convention (see floating-dock.tsx).

import { motion } from "framer-motion";

const PARAGRAPHS = [
  "WELLNESS in the most simple form is a positive THOUGHT of well-being. How healthy or wealthy I become is a factor of my mental understanding of my MIND.",
  "THE GRAND DESIGNER is the number 1 self-development and wellness brand, created to guide every individual back to their own inner understanding — body, mind, and soul — so that wellness becomes not a destination but a way of experiencing life itself.",
];

export function Philosophy() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[36px] text-plum"
        >
          With You In Mind.
        </motion.h2>

        <div className="mt-8 flex flex-col gap-5">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="font-sans text-base leading-[1.9] text-ink/70"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

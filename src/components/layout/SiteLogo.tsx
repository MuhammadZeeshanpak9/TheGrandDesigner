"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import Link from "next/link";
import { motion } from "framer-motion";

const WORDS = ["THE", "GRAND", "DESIGNER"];
const CYCLE_SECONDS = WORDS.length * 0.5 + 2.2; // pop-in duration + hold before looping

export function SiteLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="fixed top-14 right-6 z-50"
    >
      <Link
        href="/"
        className="flex h-11 items-center gap-1.5"
        aria-label="The Grand Designer — Home"
      >
        {/* TODO: replace text mark with client-provided logo image */}
        {WORDS.map((word, i) => (
          <motion.span
            key={word}
            className="font-display font-extrabold text-ink text-xs tracking-[0.2em] uppercase select-none [text-shadow:0_1px_10px_rgba(255,255,255,0.9)]"
            initial={{ opacity: 0, y: -8, scale: 0.7 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8], scale: [0.7, 1, 1, 0.7] }}
            transition={{
              duration: CYCLE_SECONDS,
              times: [0, 0.08, 0.9, 1],
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </Link>
    </motion.div>
  );
}

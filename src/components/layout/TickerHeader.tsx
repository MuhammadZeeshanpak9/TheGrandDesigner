"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";

const TICKER_TEXT = "I WILL GUARANTEE TO SHOW YOU THE MIRACLE IN YOU.        —        ";

function repeat(text: string, times: number) {
  return text.repeat(times);
}

export function TickerHeader() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-plum text-paper overflow-hidden select-none">
      <div className="overflow-hidden whitespace-nowrap py-1.5">
        <motion.div
          className="inline-block whitespace-nowrap text-[10px] tracking-[0.25em] uppercase font-medium text-paper/85"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {repeat(TICKER_TEXT, 4)}
        </motion.div>
      </div>
    </div>
  );
}

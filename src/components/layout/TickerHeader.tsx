"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";

const TICKER_TEXT = "I WILL GUARANTEE TO SHOW YOU THE MIRACLE IN YOU. — ";

function repeat(text: string, times: number) {
  return text.repeat(times);
}

export function TickerHeader() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-plum text-paper overflow-hidden select-none">
      <div className="overflow-hidden whitespace-nowrap py-1">
        <motion.div
          className="inline-block whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-semibold"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {repeat(TICKER_TEXT, 8)}
        </motion.div>
      </div>
      <div className="overflow-hidden whitespace-nowrap py-1 border-t border-paper/10">
        <motion.div
          className="inline-block whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-semibold text-gold"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          {repeat(TICKER_TEXT, 8)}
        </motion.div>
      </div>
    </div>
  );
}

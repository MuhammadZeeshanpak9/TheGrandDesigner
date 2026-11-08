"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import Link from "next/link";
import { motion } from "framer-motion";

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
        className="flex h-11 items-center"
        aria-label="The Grand Designer — Home"
      >
        {/* TODO: replace text mark with client-provided logo image */}
        <span className="font-display text-ink text-xs tracking-[0.2em] uppercase select-none">
          THE GRAND DESIGNER
        </span>
      </Link>
    </motion.div>
  );
}

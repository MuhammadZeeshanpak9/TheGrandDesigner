"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function SiteLogo() {
  // On pages with a Hero section (home), hide the fixed top logo once the
  // user scrolls past it — it's a Hero-only flourish, not a site-wide mark.
  // Pages with no [data-hero] element (Our Story, Wellness, etc.) keep it
  // visible the whole time, since there's nothing to scroll past there.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, x: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, y: 0, x: "-50%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className={`fixed top-9 left-1/2 z-50 ${visible ? "" : "pointer-events-none"}`}
    >
      <Link
        href="/"
        className="flex h-40 items-center md:h-48"
        aria-label="The Grand Designer — Home"
      >
        <Image
          src="/images/tgd-logo-transparent.png"
          alt="The Grand Designer"
          width={1024}
          height={1024}
          priority
          className="h-40 w-40 object-contain md:h-48 md:w-48"
        />
      </Link>
    </motion.div>
  );
}

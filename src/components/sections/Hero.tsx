"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: "easeOut" } },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: "easeOut", delay: 0.15 } },
};

const slideFromBottom: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut", delay: 0.3 } },
};

const plainFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const v = (variants: Variants) => (reduced ? plainFadeIn : variants);

  // On mobile, this block disappears 5s after load to make room for the
  // video/other content instead of staying on screen permanently.
  const [showInfoBlock, setShowInfoBlock] = useState(true);
  useEffect(() => {
    if (!isMobile) return;
    const timer = setTimeout(() => setShowInfoBlock(false), 5000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section
      data-hero
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-16 pt-32 pb-14 sm:pb-16"
    >
      {/* Background video — replaces the old site-wide animated nebula,
          which now only covers the Hero section instead of the whole site.
          Mobile gets its own portrait-cropped source via a media query on
          <source> (resolved natively by the browser, no hydration flash).
          Reduced-motion users get the same video as a still first frame
          (no autoplay/loop) rather than a blank background. */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay={!reduced}
        loop={!reduced}
        muted
        playsInline
        aria-hidden
      >
        <source media="(max-width: 767px)" src="/videos/hero-background-mobile.mp4" />
        <source src="/videos/hero-background-main.mp4" />
      </video>

      {/* Curved (not straight) edge into the light paper-warm section below. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 w-full sm:h-40"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,60 C360,170 1080,-30 1440,90 L1440,160 L0,160 Z" fill="#ffffff" />
      </svg>

      {/* Middle text blocks — client-specified palette: navy base text with
          gold accents on specific words, per the approved color scheme. */}
      <div className="relative z-10 my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={v(slideFromLeft)}
          animate={isMobile ? { opacity: showInfoBlock ? 1 : 0 } : undefined}
          transition={isMobile ? { duration: 0.6, ease: "easeOut" } : undefined}
          className="flex flex-col items-center text-center md:items-start md:text-left select-none max-w-sm mx-auto md:mx-0"
        >
          <p className="font-display font-extrabold uppercase tracking-[0.06em] text-[#0A1A2B] text-base sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed">
            INFORMATION IS <span className="text-[#9C7A2E]">POWER</span>
            <br />
            &ldquo;<span className="text-[#9C7A2E]">INFORMATION</span>&rdquo; IS MENTAL
            <br />
            &ldquo;POWER&rdquo; IS <span className="text-[#9C7A2E]">PHYSICAL</span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={v(slideFromRight)}
          className="flex flex-col items-center text-center md:items-end md:text-right select-none mx-auto md:mx-0 mt-10 sm:mt-6 md:mt-0"
        >
          <p className="font-display font-extrabold uppercase tracking-[0.06em] text-[#0A1A2B] text-base sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed">
            I AM A MENTAL BEING
            <br />
            MY UNIVERSE IS <span className="text-[#9C7A2E]">MENTAL</span>
          </p>
        </motion.div>
      </div>

      {/* Greatness In You heading + Book Now button — white, bottom-left,
          slides up last */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={v(slideFromBottom)}
        className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left gap-6 sm:gap-7 select-none mt-auto pt-8"
      >
        <h1 className="font-display font-extrabold uppercase tracking-[0.02em] sm:tracking-[0.06em] text-ink sm:text-paper text-5xl min-[480px]:text-6xl sm:text-7xl md:text-7xl lg:text-[80px] leading-[0.95] max-w-2xl">
          GREATNESS <span className="text-[#9C7A2E]">IN YOU</span>
        </h1>

        <button
          type="button"
          onClick={() => {
            if (process.env.NODE_ENV !== "production") {
              console.log("[Hero] Book Now clicked (stub)");
            }
          }}
          className="inline-flex items-center justify-center bg-[#9C7A2E] text-[#0A1A2B] px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-[#b08e3e] hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9C7A2E] cursor-pointer"
        >
          BOOK NOW
        </button>
      </motion.div>
    </section>
  );
}

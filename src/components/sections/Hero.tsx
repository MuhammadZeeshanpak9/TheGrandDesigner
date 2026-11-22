"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

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
  const v = (variants: Variants) => (reduced ? plainFadeIn : variants);

  return (
    <section
      data-hero
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-16 pt-32 pb-14 sm:pb-16"
    >
      {/* Background video — replaces the old site-wide animated nebula,
          which now only covers the Hero section instead of the whole site.
          The slow-motion is baked into this file (frame-interpolated via
          ffmpeg's minterpolate, 30fps source -> 60fps, 2.5x duration) rather
          than done at runtime via playbackRate, which just holds the
          original 30fps frames longer and looks like a stutter/slideshow —
          real in-between frames are the only way to get smooth slow motion.
          Reduced-motion users get the same video as a still first frame
          (no autoplay/loop) rather than a blank background. */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero-background-slowmo.mp4"
        autoPlay={!reduced}
        loop={!reduced}
        muted
        playsInline
        aria-hidden
      />

      {/* Middle text blocks — gold, slide in from their respective sides.
          On mobile the text uses a deeper, darker gold shade instead of the
          bright accent gold, since the video has light frames (pale walls,
          light floors) that wash out bright gold — no backdrop box, just a
          richer text color. Desktop keeps the normal bright gold. */}
      <div className="relative z-10 my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={v(slideFromLeft)}
          className="flex flex-col items-center text-center md:items-start md:text-left select-none max-w-sm mx-auto md:mx-0"
        >
          <p className="font-display font-extrabold uppercase tracking-[0.06em] text-[#7a5a14] sm:text-gold text-base sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed">
            INFORMATION IS POWER
            <br />
            &ldquo;INFORMATION&rdquo; IS MENTAL
            <br />
            &ldquo;POWER&rdquo; IS PHYSICAL
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={v(slideFromRight)}
          className="flex flex-col items-center text-center md:items-end md:text-right select-none mx-auto md:mx-0 mt-10 sm:mt-6 md:mt-0"
        >
          <p className="font-display font-extrabold uppercase tracking-[0.06em] text-[#7a5a14] sm:text-gold text-base sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed">
            I AM A MENTAL BEING
            <br />
            MY UNIVERSE IS MENTAL
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
          GREATNESS IN YOU
        </h1>

        <button
          type="button"
          onClick={() => {
            if (process.env.NODE_ENV !== "production") {
              console.log("[Hero] Book Now clicked (stub)");
            }
          }}
          className="inline-flex items-center justify-center bg-paper text-ink px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-gold hover:text-ink hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          BOOK NOW
        </button>
      </motion.div>
    </section>
  );
}

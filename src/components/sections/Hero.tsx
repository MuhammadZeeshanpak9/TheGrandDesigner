"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

// Slow, smooth reveal for the face/mind visual: it starts small and more
// heavily blurred than its resting state, then eases — unhurried, no sharp
// jitter — down to full size and its normal resting blur level.
const FACE_REST_BLUR = "blur(8px)";
const FACE_REST_BLUR_SM = "blur(10px)";

const glitchIn: Variants = {
  hidden: { opacity: 0, x: 14, scale: 0.6, filter: "blur(18px)" },
  visible: {
    opacity: [0, 0.5, 1],
    x: [14, -3, 0],
    scale: [0.6, 0.85, 1],
    filter: ["blur(18px)", "blur(12px)", FACE_REST_BLUR],
    transition: { duration: 2.6, ease: "easeInOut" },
  },
};

const glitchInSm: Variants = {
  hidden: { opacity: 0, x: 14, scale: 0.6, filter: "blur(22px)" },
  visible: {
    opacity: [0, 0.5, 1],
    x: [14, -3, 0],
    scale: [0.6, 0.85, 1],
    filter: ["blur(22px)", "blur(15px)", FACE_REST_BLUR_SM],
    transition: { duration: 2.6, ease: "easeInOut" },
  },
};

const plainFadeIn: Variants = {
  hidden: { opacity: 0, filter: FACE_REST_BLUR },
  visible: { opacity: 1, filter: FACE_REST_BLUR, transition: { duration: 0.6, ease: "easeOut" } },
};

const plainFadeInSm: Variants = {
  hidden: { opacity: 0, filter: FACE_REST_BLUR_SM },
  visible: { opacity: 1, filter: FACE_REST_BLUR_SM, transition: { duration: 0.6, ease: "easeOut" } },
};

// "INFORMATION IS POWER..." slides in from the left. On mobile only, it
// holds briefly then fades out and stays gone (a one-time intro beat there);
// on tablet/desktop it slides in and stays on screen permanently.
const slideFromLeftThenVanish: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: [0, 1, 1, 0],
    x: [-48, 0, 0, 0],
    transition: { duration: 3.6, times: [0, 0.35, 0.75, 1], ease: "easeInOut" },
  },
};

const slideFromLeftReducedVanish: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: [0, 1, 1, 0], transition: { duration: 2, times: [0, 0.3, 0.7, 1], ease: "easeOut" } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeInOut" } },
};

const slideFromLeftReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// "I AM A MENTAL BEING..." slides in from the right and stays on screen.
const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeInOut" } },
};

const slideFromRightReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Fixed positions/timings for the shimmering sparkle dots over the face/mind
// visual — static so they don't reshuffle on re-render.
const SPARKLES = [
  { x: 20, y: 25, size: 4, duration: 2.2, delay: 0 },
  { x: 65, y: 15, size: 3, duration: 2.6, delay: 0.4 },
  { x: 80, y: 40, size: 5, duration: 2.1, delay: 0.9 },
  { x: 35, y: 55, size: 3, duration: 2.8, delay: 0.2 },
  { x: 55, y: 70, size: 4, duration: 2.4, delay: 1.2 },
  { x: 15, y: 60, size: 3, duration: 2.5, delay: 0.7 },
  { x: 75, y: 75, size: 4, duration: 2.3, delay: 1.5 },
  { x: 45, y: 35, size: 3, duration: 2.7, delay: 1.0 },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(640); // matches Tailwind's sm: breakpoint

  return (
    <section
      data-hero
      className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-32 pb-14 sm:pb-16"
    >
      {/* Light glass layer: lifts Hero content off the moving nebula so it stays legible */}
      <div className="absolute inset-0 bg-white/18 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />

      {/* Face/mind halftone visual. On phones/tablets it's centered
          horizontally (so the "I AM A MENTAL BEING" text sitting over it is
          also centered); from md: up it moves to the right side, vertically
          centered with equal gap from top and bottom of the hero. Glitches
          into place on scroll-into-view, then holds a subtle ambient float.
          Softly blurred with a sprinkle of shimmering highlight dots over it.
          Centering uses inset + my-auto/mx-auto (not a transform) so it
          doesn't collide with Framer Motion's own transform writes on this
          element. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={reduced ? (isMobile ? plainFadeIn : plainFadeInSm) : isMobile ? glitchIn : glitchInSm}
        className="pointer-events-none absolute inset-y-0 inset-x-0 md:inset-x-auto md:right-0 lg:-right-8 mx-auto md:mx-0 my-auto w-[300px] sm:w-[420px] md:w-[560px] lg:w-[720px] xl:w-[820px] h-[300px] sm:h-[420px] md:h-[560px] lg:h-[720px] xl:h-[820px] z-0"
      >
        <motion.div
          className="relative h-full w-full"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/face-mental-visual.png"
            alt=""
            width={1254}
            height={1254}
            className="h-full w-full object-contain mix-blend-screen"
          />
          {!reduced && (
            <div className="absolute inset-0" aria-hidden>
              {SPARKLES.map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-gold"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.size,
                    height: s.size,
                    boxShadow: "0 0 6px 1px rgba(201,162,39,0.8)",
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
                  transition={{
                    duration: s.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: s.delay,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Middle text blocks */}
      <div className="relative my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center pt-8">
        {/* Left-middle: 3 stacked lines, ink, bold, uppercase, tracking-wide.
            On mobile only, slides in from the left, holds briefly, then
            fades out for good (a one-time intro beat there); on tablet/
            desktop it slides in from the left and stays on screen. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={
            isMobile
              ? reduced
                ? slideFromLeftReducedVanish
                : slideFromLeftThenVanish
              : reduced
                ? slideFromLeftReduced
                : slideFromLeft
          }
          className="flex flex-col items-center text-center md:items-start md:text-left select-none max-w-sm mx-auto md:mx-0"
        >
          <p className="font-display font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-ink text-sm sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed [text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_2px_18px_rgba(255,255,255,0.9)]">
            INFORMATION IS POWER
            <br />
            &ldquo;INFORMATION&rdquo; IS MENTAL
            <br />
            &ldquo;POWER&rdquo; IS PHYSICAL
          </p>
        </motion.div>

        {/* Right-middle: 2 stacked lines, solid pitch-black, bold, uppercase,
            tracking-wide — kept solid (not gradient) so it stays legible over
            the blurred face visual behind it. Slides in from the right and
            stays on screen permanently. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reduced ? slideFromRightReduced : slideFromRight}
          className="relative z-10 flex flex-col items-center text-center md:items-end md:text-right select-none mx-auto md:mx-0 mt-10 sm:mt-6 md:mt-0"
        >
          <p className="font-display font-black uppercase tracking-[0.08em] sm:tracking-[0.14em] text-black text-base sm:text-2xl md:text-2xl lg:text-[28px] leading-snug sm:leading-relaxed max-w-sm [text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_2px_18px_rgba(255,255,255,0.9)]">
            I AM A MENTAL BEING
            <br />
            MY UNIVERSE IS MENTAL
          </p>
        </motion.div>
      </div>

      {/* Greatness In You heading + Book Now button — centered on
          phone/tablet, left-aligned from md: up */}
      <div className="relative flex flex-col items-center text-center md:items-start md:text-left gap-6 sm:gap-7 select-none mt-auto pt-8">
        <h1 className="font-display font-extrabold uppercase tracking-[0.02em] sm:tracking-[0.06em] bg-gradient-to-br from-gold via-[#2a2410] to-ink bg-clip-text text-transparent text-6xl min-[480px]:text-7xl sm:text-7xl md:text-7xl lg:text-[80px] leading-[0.95] max-w-2xl drop-shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
          GREATNESS IN YOU
        </h1>

        <button
          type="button"
          onClick={() => {
            if (process.env.NODE_ENV !== "production") {
              console.log("[Hero] Book Now clicked (stub)");
            }
          }}
          className="inline-flex items-center justify-center bg-ink text-paper px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-teal hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(22,21,26,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </section>
  );
}

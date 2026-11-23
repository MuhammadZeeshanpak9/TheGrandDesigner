"use client";

// Adapted from NTWGC's src/components/layout/PageHero.tsx — pure
// presentation. Dropped the `youtube` prop (no TGD wellness video asset
// exists); token names translated: violet -> plum, violet-tint -> paper-warm.
// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionParticles } from "@/components/sections/wellness/SectionParticles";

type WellnessPageHeroProps = {
  variant: "dark" | "light";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  titleClassName?: string;
  /** Full-bleed photographic background (e.g. the private-jet visual on
   * Unlock The Lock) instead of the flat `wellness-bg-gradient-hero` fill —
   * layered with a cinematic dark gradient + radial vignette for legibility. */
  backgroundImage?: string;
  /** Same treatment as `backgroundImage` but a looping video, scoped to this
   * section only (absolute, not fixed — it scrolls away with the section,
   * it isn't pinned behind the whole page). Takes priority over
   * `backgroundImage` if both are given. */
  backgroundVideo?: string;
  children?: ReactNode;
};

export function WellnessPageHero({
  variant,
  eyebrow,
  title,
  subtitle,
  description,
  titleClassName,
  backgroundImage,
  backgroundVideo,
  children,
}: WellnessPageHeroProps) {
  const dark = variant === "dark";
  const hasBackgroundMedia = Boolean(backgroundImage || backgroundVideo);

  return (
    <section
      className={`relative overflow-hidden ${
        backgroundVideo
          ? "flex min-h-[80vh] flex-col justify-end pb-16 pt-40 md:pb-20"
          : "pt-40 pb-20 md:pt-48 md:pb-28"
      } ${dark && !hasBackgroundMedia ? "wellness-bg-gradient-hero" : ""} ${
        !dark ? "bg-paper-warm" : ""
      }`}
    >
      {hasBackgroundMedia && (
        <>
          {backgroundVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              src={backgroundVideo}
              aria-hidden
            />
          ) : (
            <Image
              src={backgroundImage!}
              alt=""
              fill
              priority
              className="object-cover"
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #060608 0%, rgba(10,4,16,0.55) 45%, rgba(10,4,16,0.85) 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,8,0.65) 100%)",
            }}
            aria-hidden
          />
        </>
      )}
      {dark && <SectionParticles count={30} />}

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <p
            className={`font-sans text-[10px] font-semibold uppercase tracking-[0.4em] ${
              dark ? "text-teal-light" : "text-plum"
            }`}
          >
            {eyebrow}
          </p>
        )}

        <motion.h1
          initial={backgroundVideo ? { opacity: 0, y: -40 } : undefined}
          animate={backgroundVideo ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className={`mt-3 font-display font-bold leading-[0.95] ${
            titleClassName ?? "text-[52px] md:text-[80px]"
          } ${dark ? "text-paper" : "text-ink"}`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <p
            className={`mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] ${
              dark ? "text-teal-light" : "text-plum"
            }`}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className={`mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed ${
              dark ? "text-paper/65" : "text-ink/70"
            }`}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}

// Adapted from NTWGC's src/components/layout/PageHero.tsx — pure
// presentation. Dropped the `youtube` prop (no TGD wellness video asset
// exists); token names translated: violet -> plum, violet-tint -> paper-warm.

import type { ReactNode } from "react";
import { SectionParticles } from "@/components/sections/wellness/SectionParticles";

type WellnessPageHeroProps = {
  variant: "dark" | "light";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export function WellnessPageHero({
  variant,
  eyebrow,
  title,
  subtitle,
  description,
  titleClassName,
  children,
}: WellnessPageHeroProps) {
  const dark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 ${
        dark ? "wellness-bg-gradient-hero" : "bg-paper-warm"
      }`}
    >
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

        <h1
          className={`mt-3 font-display font-bold leading-[0.95] ${
            titleClassName ?? "text-[52px] md:text-[80px]"
          } ${dark ? "text-paper" : "text-ink"}`}
        >
          {title}
        </h1>

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

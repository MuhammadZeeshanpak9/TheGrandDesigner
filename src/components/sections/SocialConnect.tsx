"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/sections/motion-variants";

// TODO: replace "#" placeholders with real social profile URLs before launch
const SOCIAL_PLATFORMS = [
  {
    label: "Instagram",
    href: "#",
    Icon: Instagram,
    description: "Daily reflections, behind-the-scenes, and the 12 Understandings in motion.",
    position: "side" as const,
    tilt: "-rotate-3 origin-bottom-right",
  },
  {
    label: "Facebook",
    href: "#",
    Icon: Facebook,
    description: "Community conversations and announcements from The Grand Designer.",
    position: "center" as const,
  },
  {
    label: "YouTube",
    href: "#",
    Icon: Youtube,
    description: "Full sessions, teachings, and the world's greatest movie about you.",
    position: "center" as const,
  },
  {
    label: "WhatsApp",
    href: "#",
    Icon: MessageCircle,
    description: "A direct, private line to connect and begin your own journey within.",
    position: "side" as const,
    tilt: "rotate-3 origin-bottom-left",
  },
];

export function SocialConnect() {
  return (
    <section className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">
          Stay Close To The Creation
        </p>
        <h2 className="font-display font-bold uppercase tracking-[0.1em] text-ink text-3xl md:text-4xl">
          Follow The Grand Designer
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.1)}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center"
      >
        {SOCIAL_PLATFORMS.map(({ label, href, Icon, description, position, tilt }, i) => {
          const isCenter = position === "center";
          return (
            <motion.a
              key={label}
              href={href}
              variants={fadeInUp}
              className={cn(
                "group flex flex-col items-center text-center rounded-2xl p-5 sm:p-7",
                "transition-all duration-300 hover:-translate-y-2",
                isCenter
                  ? cn(
                      "border border-gold bg-gradient-to-b from-gold/25 to-gold/10 backdrop-blur-md",
                      "shadow-[0_16px_40px_rgba(184,145,47,0.25)] scale-105 sm:scale-110 py-7 sm:py-10 z-10",
                      "hover:shadow-[0_24px_56px_rgba(184,145,47,0.35)]",
                    )
                  : cn(
                      "border border-mist bg-white/60 backdrop-blur-md",
                      "hover:shadow-[0_16px_32px_rgba(22,21,26,0.12)] hover:border-gold hover:bg-gold/10",
                      tilt,
                      "hover:rotate-0",
                    ),
              )}
            >
              <motion.span
                className={cn(
                  "flex items-center justify-center rounded-full mb-4 sm:mb-5",
                  isCenter
                    ? "h-16 w-16 sm:h-20 sm:w-20 border-2 border-gold text-gold bg-gold/10"
                    : "h-12 w-12 sm:h-16 sm:w-16 border border-gold/40 text-gold",
                )}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                whileHover={{ scale: 1.15, rotate: 8 }}
              >
                <Icon
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    isCenter ? "h-8 w-8 sm:h-10 sm:w-10" : "h-6 w-6 sm:h-7 sm:w-7",
                  )}
                />
              </motion.span>
              <p
                className={cn(
                  "font-display font-bold uppercase tracking-[0.15em] text-ink mb-2 sm:mb-3",
                  isCenter ? "text-base sm:text-lg" : "text-xs sm:text-sm",
                )}
              >
                {label}
              </p>
              <p
                className={cn(
                  "leading-relaxed",
                  isCenter ? "text-xs sm:text-sm text-ink/70" : "text-[11px] sm:text-xs text-ink/60",
                )}
              >
                {description}
              </p>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}

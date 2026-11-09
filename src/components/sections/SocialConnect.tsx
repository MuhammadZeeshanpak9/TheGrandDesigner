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
  },
  {
    label: "Facebook",
    href: "#",
    Icon: Facebook,
    description: "Community conversations and announcements from The Grand Designer.",
  },
  {
    label: "YouTube",
    href: "#",
    Icon: Youtube,
    description: "Full sessions, teachings, and the world's greatest movie about you.",
  },
  {
    label: "WhatsApp",
    href: "#",
    Icon: MessageCircle,
    description: "A direct, private line to connect and begin your own journey within.",
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
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {SOCIAL_PLATFORMS.map(({ label, href, Icon, description }, i) => (
          <motion.a
            key={label}
            href={href}
            variants={fadeInUp}
            className={cn(
              "group flex flex-col items-center text-center rounded-2xl border border-mist bg-white/60 backdrop-blur-md p-7",
              "transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:bg-gold/10",
              "hover:shadow-[0_16px_40px_rgba(184,145,47,0.25)]",
            )}
          >
            <motion.span
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold mb-5"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.2,
              }}
              whileHover={{ scale: 1.15, rotate: 8 }}
            >
              <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            </motion.span>
            <p className="font-display font-bold uppercase tracking-[0.15em] text-ink text-sm mb-3">
              {label}
            </p>
            <p className="text-xs text-ink/60 leading-relaxed">{description}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

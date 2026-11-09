"use client";

// Structure ported from NTWGC's src/components/sections/wellness/ServiceCards.tsx —
// copy/data replaced with TGD's own existing tier summaries. Reuses raw
// motion.* per project convention (see floating-dock.tsx).

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceCard = {
  name: string;
  price: string;
  description: string;
  href: string;
  cta: "Enquire" | "Book";
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    name: "THANK YOU BODY",
    price: "$5,000+",
    description: "Physical wellness and vitality — a premium, consciousness-driven transformation.",
    href: "/wellness/body",
    cta: "Book",
  },
  {
    name: "THANK YOU MIND",
    price: "$2,500+",
    description: "Mental clarity and awareness. Everything starts in the mind.",
    href: "/wellness/mind",
    cta: "Book",
  },
  {
    name: "THANK YOU SOUL",
    price: "$5,000+",
    description: "Inner peace and alignment — reconnect with your highest self.",
    href: "/wellness/soul",
    cta: "Book",
  },
  {
    name: "UNLOCK THE LOCK",
    price: "$1,000,000+",
    description: "The ultimate transformation experience. By invitation and application only.",
    href: "/wellness/unlock-the-lock",
    cta: "Enquire",
  },
];

export function ServiceCards() {
  return (
    <section className="bg-paper-warm py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-2">
        {SERVICE_CARDS.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="relative overflow-hidden rounded-[20px] wellness-glass-card-light p-8 transition-shadow hover:shadow-[0_20px_60px_rgba(74,59,107,0.15)]"
          >
            <svg
              className="absolute inset-x-0 top-0 h-3 w-full"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0,6 C25,0 40,12 60,6 C75,2 90,10 100,5"
                fill="none"
                stroke="#4a3b6b"
                strokeWidth="3"
              />
            </svg>

            <h3 className="mt-4 font-sans text-[12px] font-semibold uppercase tracking-[0.25em] text-ink">
              {card.name}
            </h3>
            <p className="mt-4 font-display text-[36px] text-plum">{card.price}</p>
            <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink/70">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="group mt-6 inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-plum"
            >
              {card.cta === "Enquire" ? "Enquire Now" : "Book Session"}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

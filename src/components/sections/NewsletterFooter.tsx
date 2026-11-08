"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/sections/motion-variants";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "YouTube", href: "#", Icon: Youtube },
];

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Wellness", href: "/wellness" },
  { label: "Connect", href: "/connect" },
];

export function NewsletterFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink text-paper">
      {/* Top: newsletter signup band */}
      <div className="border-b border-paper/10 py-12 px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Stay Connected
          </h2>
          {subscribed ? (
            <p className="text-gold text-sm">You&apos;re on the list.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 bg-transparent border border-paper/20 rounded-sm px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="bg-gold text-ink px-5 py-2.5 rounded-sm uppercase text-xs font-bold tracking-wide hover:bg-gold/90 transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 4-column grid */}
      <div className="py-16 px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1)}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="sm:col-span-2 md:col-span-1">
            <p className="font-display tracking-[0.2em] uppercase text-paper text-sm mb-4">
              The Grand Designer
            </p>
            <p className="text-paper/60 text-sm leading-relaxed mb-6 max-w-xs">
              Twelve understandings. One philosophy. A guide back to the self
              — body, mind, and soul — for everyone ready to meet the
              greatness already within them.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div variants={fadeInUp}>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-paper/50 mb-5">
              Explore
            </p>
            <ul className="space-y-3 text-sm text-paper/70">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={fadeInUp}>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-paper/50 mb-5">
              Support
            </p>
            <ul className="space-y-3 text-sm text-paper/70">
              <li>
                <Link href="/connect" className="hover:text-gold transition-colors">
                  Say Hello
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Collaborators
                </a>
              </li>
              <li>
                <a
                  href="mailto:winwin@thegranddesigner.com"
                  className="hover:text-gold transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeInUp}>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-paper/50 mb-5">
              Legal
            </p>
            <ul className="space-y-3 text-sm text-paper/70">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-paper/10 py-6 px-6 text-center text-paper/40 text-xs">
        <p>© 2026 The Grand Designer. All Rights Reserved. · I AM YOU.</p>
      </div>
    </footer>
  );
}

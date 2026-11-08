"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type BookingTier = { label: string; price: string };

export function BookingTierList({
  tiers,
  premium = false,
}: {
  tiers: BookingTier[];
  premium?: boolean;
}) {
  const [reserved, setReserved] = useState(false);

  return (
    <div
      className={cn(
        "max-w-xl mx-auto border rounded-2xl shadow-sm p-6 backdrop-blur-md",
        premium
          ? "bg-[#0d0b08]/90 border-gold/40"
          : "bg-white/80 border-mist",
      )}
    >
      <AnimatePresence mode="wait">
        {reserved ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p
              className={cn(
                "font-display text-xl",
                premium ? "text-paper" : "text-ink",
              )}
            >
              Thank you, we&apos;ll be in touch.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            {tiers.map((tier, i) => (
              <div
                key={tier.label}
                className={cn(
                  "flex items-center justify-between gap-4 py-3",
                  i !== tiers.length - 1 &&
                    (premium ? "border-b border-gold/20" : "border-b border-mist"),
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    premium ? "text-paper/80" : "text-ink",
                  )}
                >
                  {tier.label}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      premium ? "text-gold" : "text-ink",
                    )}
                  >
                    {tier.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => setReserved(true)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                      premium
                        ? "border border-gold text-gold hover:bg-gold hover:text-ink"
                        : "bg-ink text-paper hover:bg-teal",
                    )}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

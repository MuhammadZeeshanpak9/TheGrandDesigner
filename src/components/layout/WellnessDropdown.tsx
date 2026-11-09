"use client";

// NOTE: this component intentionally uses raw `motion.*`/`AnimatePresence`
// from "framer-motion" rather than the lazy `m.*` variant, matching
// floating-dock.tsx — see the note there for why.

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HeartPulse, Brain, Flame, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

type WellnessDropdownProps = {
  open: boolean;
  anchor: { left: number; bottom: number } | null;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  triggerRef: React.RefObject<HTMLAnchorElement | null>;
};

const LINKS = [
  {
    href: "/wellness/body",
    icon: HeartPulse,
    label: "BODY",
    subtitle: "Physical wellness & vitality",
  },
  {
    href: "/wellness/mind",
    icon: Brain,
    label: "MIND",
    subtitle: "Mental clarity & awareness",
  },
  {
    href: "/wellness/soul",
    icon: Flame,
    label: "SOUL",
    subtitle: "Inner peace & alignment",
  },
  {
    href: "/wellness/unlock-the-lock",
    icon: KeyRound,
    label: "UNLOCK THE LOCK",
    subtitle: "Go within — body, mind, soul",
    premium: true,
  },
] as const;

export function WellnessDropdown({
  open,
  anchor,
  onClose,
  onMouseEnter,
  onMouseLeave,
  triggerRef,
}: WellnessDropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, triggerRef]);

  useEffect(() => {
    if (open) firstItemRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onClose, triggerRef]);

  if (!anchor) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="menu"
          aria-label="Wellness"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: "fixed",
            left: anchor.left,
            bottom: anchor.bottom,
            transform: "translateX(-50%)",
          }}
          className={cn(
            "z-50 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-ink/10 bg-white/90 p-2 backdrop-blur-xl",
            "shadow-[inset_0_0_40px_rgba(184,145,47,0.08),0_8px_32px_rgba(0,0,0,0.4)]",
          )}
        >
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              ref={i === 0 ? firstItemRef : undefined}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/5"
            >
              <link.icon
                className={cn(
                  "h-5 w-5 shrink-0 text-ink/70 transition-colors group-hover:text-gold",
                  "premium" in link && link.premium && "text-gold/80",
                )}
              />
              <span className="flex flex-col">
                <span
                  className={cn(
                    "text-xs font-semibold tracking-wide",
                    "premium" in link && link.premium ? "text-gold" : "text-ink",
                  )}
                >
                  {link.label}
                </span>
                <span className="text-[11px] text-ink/50">{link.subtitle}</span>
              </span>
            </Link>
          ))}
          <div className="my-1 border-t border-ink/10" />
          <Link
            href="/wellness"
            role="menuitem"
            className="block px-3 py-2 text-xs font-medium text-gold/90 hover:text-gold transition-colors"
          >
            View All Wellness →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

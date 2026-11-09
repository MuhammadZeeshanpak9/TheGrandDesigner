"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, Sparkles, Mail } from "lucide-react";
import { FloatingDock, type FloatingDockItem } from "@/components/ui/floating-dock";
import { WellnessDropdown } from "@/components/layout/WellnessDropdown";

const WELLNESS_HREF = "/wellness";

export function Nav() {
  const [wellnessOpen, setWellnessOpen] = useState(false);
  const [anchor, setAnchor] = useState<{ left: number; bottom: number } | null>(null);
  const wellnessTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function computeAnchor() {
    const el = wellnessTriggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const panelHalfWidth = 144; // half of WellnessDropdown's w-72 (288px)
    const margin = 16;
    const rawLeft = rect.left + rect.width / 2;
    const clampedLeft = Math.min(
      Math.max(rawLeft, panelHalfWidth + margin),
      window.innerWidth - panelHalfWidth - margin,
    );
    setAnchor({
      left: clampedLeft,
      bottom: window.innerHeight - rect.top + 16,
    });
  }

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setWellnessOpen(false), 200);
  }

  const items: FloatingDockItem[] = [
    { title: "Home", icon: <Home className="h-full w-full" />, href: "/" },
    {
      title: "Our Story",
      icon: <BookOpen className="h-full w-full" />,
      href: "/our-story",
    },
    {
      title: "Wellness",
      icon: <Sparkles className="h-full w-full" />,
      href: WELLNESS_HREF,
      onContainerRef: (el) => {
        wellnessTriggerRef.current = el;
      },
      closeMobileOnTrigger: false,
      ariaProps: { "aria-haspopup": "true", "aria-expanded": wellnessOpen },
      onTrigger: () => {
        // Hover doesn't exist on touch devices, so on mobile tapping
        // Wellness toggles the same dropdown panel open/closed (anchored to
        // the mobile dock's Wellness icon) instead of relying on hover.
        clearCloseTimer();
        computeAnchor();
        setWellnessOpen((v) => !v);
      },
      onHoverStart: () => {
        clearCloseTimer();
        computeAnchor();
        setWellnessOpen(true);
      },
      onHoverEnd: () => {
        scheduleClose();
      },
      onKeyDown: (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          clearCloseTimer();
          computeAnchor();
          setWellnessOpen(true);
        }
      },
    },
    { title: "Connect", icon: <Mail className="h-full w-full" />, href: "/connect" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <FloatingDock items={items} />
      </motion.div>
      <WellnessDropdown
        open={wellnessOpen}
        anchor={anchor}
        onClose={() => setWellnessOpen(false)}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        triggerRef={wellnessTriggerRef}
      />
    </>
  );
}

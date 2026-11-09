"use client";

// Button-driven circular carousel, adapted from a scroll-pinned GSAP
// reference component. The original drove its circular layout entirely via
// ScrollTrigger page-pinning; that mechanism was dropped here in favor of
// explicit left/right navigation, so GSAP is used only for the per-click
// transform/opacity tween, not for scroll hijacking.

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CircularSplitRollItem = {
  id?: string | number;
  title: string;
  definition: string;
  /** Tailwind gradient classes for the card's abstract placeholder visual. */
  gradient?: string;
};

type CardGeometry = {
  x: number;
  scale: number;
  opacity: number;
  zIndex: number;
  rotateY: number;
};

const DEFAULT_GRADIENTS = [
  "from-ink via-plum to-teal",
  "from-plum via-teal-light to-gold",
  "from-teal via-plum to-ink",
  "from-gold via-ink to-plum",
];

function geometryFor(offset: number, spacing: number): CardGeometry {
  const abs = Math.abs(offset);
  if (abs > 2) {
    const far = spacing * 1.9;
    return { x: offset > 0 ? far : -far, scale: 0.6, opacity: 0, zIndex: 0, rotateY: offset > 0 ? 35 : -35 };
  }
  const x = offset * spacing;
  const scale = 1 - abs * 0.22;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.2;
  const zIndex = 10 - abs;
  const rotateY = offset * -18;
  return { x, scale, opacity, zIndex, rotateY };
}

export default function CircularSplitRoll({
  items,
  className,
}: {
  items: CircularSplitRollItem[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(220);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = items.length;

  useEffect(() => {
    function updateSpacing() {
      setSpacing(window.innerWidth < 640 ? 110 : 220);
    }
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);

  const safeItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        id: item.id ?? index,
        gradient: item.gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length],
      })),
    [items],
  );

  function wrap(n: number) {
    return ((n % count) + count) % count;
  }

  function go(direction: 1 | -1) {
    setActive((prev) => wrap(prev + direction));
  }

  useEffect(() => {
    safeItems.forEach((_, index) => {
      const node = cardRefs.current[index];
      if (!node) return;

      let offset = index - active;
      if (offset > count / 2) offset -= count;
      if (offset < -count / 2) offset += count;

      const geo = geometryFor(offset, spacing);
      gsap.to(node, {
        x: geo.x,
        scale: geo.scale,
        opacity: geo.opacity,
        zIndex: geo.zIndex,
        rotateY: geo.rotateY,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [active, count, safeItems, spacing]);

  const current = safeItems[active];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="relative mx-auto h-[300px] sm:h-[400px] max-w-3xl [perspective:1200px]">
        {safeItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute left-1/2 top-1/2 h-[210px] w-[160px] sm:h-[300px] sm:w-[230px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
            aria-hidden={index !== active}
          >
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br shadow-[0_24px_48px_rgba(22,21,26,0.25)]",
                item.gradient,
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-paper/15 text-[120px] leading-none select-none">
                  {item.title.charAt(0)}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-ink/40 backdrop-blur-sm px-4 py-3">
                <p className="font-display font-bold uppercase tracking-[0.1em] text-paper text-sm">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active item definition */}
      <div className="mx-auto mt-8 max-w-xl text-center px-6">
        <p className="font-display font-bold uppercase tracking-[0.1em] text-ink text-lg mb-2">
          {current.title}
        </p>
        <p className="text-sm text-ink/70 leading-relaxed">{current.definition}</p>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous understanding"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-mist bg-white/90 text-ink transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {safeItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to ${item.title}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === active ? "w-6 bg-gold" : "w-1.5 bg-mist",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next understanding"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-mist bg-white/90 text-ink transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

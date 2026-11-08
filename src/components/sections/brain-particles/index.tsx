"use client";

import dynamic from "next/dynamic";

const StaticGlowFallback = () => (
  <div
    className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-[radial-gradient(ellipse_at_68%_45%,rgba(201,162,39,0.08)_0%,transparent_65%)]"
    aria-hidden="true"
  />
);

/**
 * Active 3D WebGL Particle Brain implementation.
 *
 * To swap to the 2D Canvas Fallback for testing or lower-end fallbacks, change
 * the import target to `@/components/sections/BrainParticlesFallback` and re-export `BrainParticlesFallback`.
 */
export const BrainParticles = dynamic(
  () =>
    import("@/components/sections/BrainParticles").then(
      (mod) => mod.BrainParticles
    ),
  {
    ssr: false,
    loading: StaticGlowFallback,
  }
);

export { BrainParticlesFallback } from "@/components/sections/BrainParticlesFallback";

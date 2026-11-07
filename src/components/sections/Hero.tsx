"use client";

import Image from "next/image";
import { m } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative isolate h-[85vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400&auto=format&fit=crop"
        alt="Living room with a blush sofa, potted plant, and abstract art"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/5" aria-hidden="true" />

      <m.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-4 top-1/3 max-w-[220px] -translate-y-1/2 sm:left-10 sm:max-w-xs"
      >
        <p className="text-sm font-bold uppercase leading-snug tracking-[0.08em] text-[var(--color-gold)] drop-shadow-sm sm:text-xl sm:leading-tight">
          Information is power
          <br />
          &quot;Information&quot; is mental
          <br />
          &quot;Power&quot; is physical
        </p>
      </m.div>

      <m.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute right-4 top-1/3 max-w-[220px] -translate-y-1/2 text-right sm:right-10 sm:max-w-xs"
      >
        <p className="text-sm font-bold uppercase leading-snug tracking-[0.08em] text-[var(--color-gold)] drop-shadow-sm sm:text-xl sm:leading-tight">
          I am a mental being
          <br />
          My universe is mental
        </p>
      </m.div>

      <m.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-4 sm:p-10"
      >
        <h1 className="text-4xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-md sm:text-6xl">
          Greatness in you
        </h1>
        <button
          type="button"
          className="bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-white/90"
        >
          Book Now
        </button>
      </m.div>
    </section>
  );
}

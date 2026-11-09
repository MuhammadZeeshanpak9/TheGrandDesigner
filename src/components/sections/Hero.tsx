"use client";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-32 pb-14 sm:pb-16">
      {/* Light glass layer: lifts Hero content off the moving nebula so it stays legible */}
      <div className="absolute inset-0 bg-white/18 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />

      {/* Middle text blocks */}
      <div className="relative my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center pt-8">
        {/* Left-middle: 3 stacked lines, ink, bold, uppercase, tracking-wide */}
        <div className="flex flex-col select-none max-w-sm">
          <p className="font-display font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-ink text-lg sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed [text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_2px_18px_rgba(255,255,255,0.9)]">
            INFORMATION IS POWER
            <br />
            &ldquo;INFORMATION&rdquo; IS MENTAL
            <br />
            &ldquo;POWER&rdquo; IS PHYSICAL
          </p>
        </div>

        {/* Right-middle: 2 stacked lines, ink, bold, uppercase, tracking-wide */}
        <div className="flex flex-col md:items-end select-none">
          <p className="font-display font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-ink text-lg sm:text-lg md:text-xl lg:text-[22px] leading-snug sm:leading-relaxed md:text-right max-w-sm [text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_2px_18px_rgba(255,255,255,0.9)]">
            I AM A MENTAL BEING
            <br />
            MY UNIVERSE IS MENTAL
          </p>
        </div>
      </div>

      {/* Bottom-left: Greatness In You heading + Book Now button */}
      <div className="relative flex flex-col items-start gap-6 sm:gap-7 select-none mt-auto pt-8">
        <h1 className="font-display font-extrabold uppercase tracking-[0.02em] sm:tracking-[0.06em] bg-gradient-to-br from-gold via-[#2a2410] to-ink bg-clip-text text-transparent text-5xl min-[480px]:text-6xl sm:text-7xl md:text-7xl lg:text-[80px] leading-[0.95] max-w-2xl drop-shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
          GREATNESS IN YOU
        </h1>

        <button
          type="button"
          onClick={() => {
            if (process.env.NODE_ENV !== "production") {
              console.log("[Hero] Book Now clicked (stub)");
            }
          }}
          className="inline-flex items-center justify-center bg-ink text-paper px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-teal hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(22,21,26,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </section>
  );
}

"use client";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-32 pb-14 sm:pb-16">
      {/* Middle text blocks */}
      <div className="my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
        {/* Left-middle: 3 stacked lines, ink, bold, uppercase, tracking-wide */}
        <div className="flex flex-col select-none max-w-sm">
          <p className="font-display font-extrabold uppercase tracking-[0.14em] text-ink text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed drop-shadow-[0_1px_12px_rgba(255,255,255,0.9)]">
            INFORMATION IS POWER
            <br />
            &ldquo;INFORMATION&rdquo; IS MENTAL
            <br />
            &ldquo;POWER&rdquo; IS PHYSICAL
          </p>
        </div>

        {/* Right-middle: 2 stacked lines, ink, bold, uppercase, tracking-wide */}
        <div className="flex flex-col md:items-end select-none">
          <p className="font-display font-extrabold uppercase tracking-[0.14em] text-ink text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed md:text-right max-w-sm drop-shadow-[0_1px_12px_rgba(255,255,255,0.9)]">
            I AM A MENTAL BEING
            <br />
            MY UNIVERSE IS MENTAL
          </p>
        </div>
      </div>

      {/* Bottom-left: Greatness In You heading + Book Now button */}
      <div className="flex flex-col items-start gap-6 sm:gap-7 select-none mt-auto pt-8">
        <h1 className="font-display font-extrabold uppercase tracking-[0.04em] sm:tracking-[0.06em] text-ink text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] max-w-2xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.95)]">
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

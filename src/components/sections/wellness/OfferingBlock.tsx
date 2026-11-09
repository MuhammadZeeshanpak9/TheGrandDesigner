"use client";

// Structure/visual layout ported from NTWGC's
// src/components/sections/wellness/OfferingBlock.tsx. Backend coupling
// stripped: the inline lead-capture form + submitFormSubmission/trackLead
// calls are replaced with TGD's existing static MembershipForm/BookingTierList
// components (same glass-card-gold visual shell, TGD's own static
// submit-success logic inside it instead of a live API call).

import { useState, type ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/MediaWithFallback";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { GoWithinArt } from "@/components/sections/wellness/GoWithinArt";
import { MindCardArt } from "@/components/sections/wellness/MindCardArt";
import { SectionParticles } from "@/components/sections/wellness/SectionParticles";
import { WellnessFormField } from "@/components/sections/wellness/WellnessFormField";
import { BookingTierList } from "@/components/sections/BookingTierList";
import { motion } from "framer-motion";

/** Organic blob shape — matches NTWGC's asymmetric border-radius frame mask. */
const BLOB_SHAPE = "48% 52% 44% 56% / 55% 48% 52% 45%";

export type OfferingSession = {
  heading: string;
  subheading?: string;
  description: string;
  extraParagraph?: string;
};

export type OfferingBookingTier = { label: string; price: string };

export type WellnessOffering = {
  heading: string;
  image?: string;
  imageAspect?: string;
  secondaryImage?: string;
  secondaryImageAspect?: string;
  hasSecondaryImage?: boolean;
  hasPrimaryImage?: boolean;
  heroArt?: "go-within" | "mind-card";
  imagePlain?: boolean;
  tagline?: string;
  bodyParagraphs?: string[];
  session?: OfferingSession;
  bookingTiers?: OfferingBookingTier[];
  bookingLabel?: string;
  pricingLabel?: string;
  price1yr?: string;
  price2yr?: string;
  membershipOptions?: string[];
  winWinText?: string;
  contactEmail?: string;
  collaboratorPitch?: string;
  collaboratorItems?: string[];
  accentColor?: string;
};

function ImageBubble({
  src,
  alt,
  reduced,
  delay = 0,
  heroArt,
  plain = false,
  aspect = "4/3",
}: {
  src?: string;
  alt: string;
  reduced: boolean;
  delay?: number;
  heroArt?: "go-within" | "mind-card";
  plain?: boolean;
  aspect?: string;
}) {
  const borderRadius = plain ? "24px" : BLOB_SHAPE;

  return (
    <div className="relative mx-auto w-full max-w-xl" style={{ aspectRatio: aspect }}>
      <div
        className="absolute -inset-3 -z-10 opacity-70"
        style={{ borderRadius, boxShadow: "0 0 60px rgba(184,145,47,0.25)" }}
        aria-hidden
      />

      <motion.div
        className="relative h-full w-full overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.55)]"
        style={{ borderRadius }}
        animate={reduced ? undefined : { y: [0, -14, 0], scale: [1, 1.02, 1] }}
        transition={
          reduced ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay }
        }
      >
        {heroArt === "go-within" ? (
          <GoWithinArt />
        ) : heroArt === "mind-card" ? (
          <MindCardArt />
        ) : (
          <ImageWithFallback src={src} alt={alt} watermark={alt} rounded="" />
        )}
        <div
          className="pointer-events-none absolute inset-2 border border-gold/30"
          style={{ borderRadius }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

export function OfferingBlock({
  heading,
  image,
  imageAspect,
  secondaryImage,
  secondaryImageAspect,
  hasSecondaryImage,
  hasPrimaryImage,
  heroArt,
  imagePlain,
  tagline,
  bodyParagraphs,
  session,
  bookingTiers,
  bookingLabel,
  pricingLabel,
  price1yr,
  price2yr,
  membershipOptions,
  winWinText,
  contactEmail,
  collaboratorPitch,
  collaboratorItems,
  accentColor,
}: WellnessOffering) {
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    membership: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof values) => (value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static-only, no backend call.
    setSubmitted(true);
  };

  const hasMembershipForm = Boolean(pricingLabel && price1yr && membershipOptions?.length);

  const pricingBlock: ReactNode = hasMembershipForm ? (
    <div className="wellness-glass-card-gold relative overflow-hidden rounded-[28px] p-10">
      <span className="absolute left-5 top-5 h-4 w-4 border-l border-t border-gold/50" aria-hidden />
      <span className="absolute right-5 top-5 h-4 w-4 border-r border-t border-gold/50" aria-hidden />
      <span className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-gold/50" aria-hidden />
      <span className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-gold/50" aria-hidden />

      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">
        {pricingLabel}
      </p>
      <p className="wellness-text-gradient-gold mt-5 font-display text-[38px] font-light">
        {price1yr}
      </p>
      {price2yr && (
        <p className="wellness-text-gradient-gold mt-1 font-display text-[38px] font-light">
          {price2yr}
        </p>
      )}

      {submitted ? (
        <div className="mx-auto mt-10 max-w-md py-8 text-center">
          <p className="font-display text-xl text-paper">Thank you, we&apos;ll be in touch.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
        >
          <div className="grid grid-cols-2 gap-4">
            <WellnessFormField
              tone="dark"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={update("firstName")}
            />
            <WellnessFormField
              tone="dark"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={update("lastName")}
            />
          </div>
          <WellnessFormField
            tone="dark"
            label="Email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
          />
          <WellnessFormField
            tone="dark"
            label="Message"
            name="message"
            type="textarea"
            rows={4}
            required
            value={values.message}
            onChange={update("message")}
          />
          {membershipOptions && membershipOptions.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/70">
                Membership <span className="text-gold">*</span>
              </span>
              <div className="flex flex-col gap-3 sm:flex-row">
                {membershipOptions.map((option) => {
                  const selected = values.membership === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => update("membership")(option)}
                      aria-pressed={selected}
                      className={`flex-1 rounded-xl border px-4 py-3 text-left font-sans text-[13px] font-semibold transition-all ${
                        selected
                          ? "border-gold bg-gold text-ink"
                          : "wellness-glass-card-dark border-paper/15 text-paper/80 hover:border-gold/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="wellness-btn-gold-sheen group mt-2 flex h-[54px] items-center justify-center gap-2 rounded-full px-8 font-sans text-[11px] font-bold uppercase tracking-[0.3em]"
          >
            {submitted ? "Thank You" : "Request Access"}
            {!submitted && (
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      )}
    </div>
  ) : bookingTiers && bookingTiers.length > 0 ? (
    <div className="wellness-glass-card-gold relative overflow-hidden rounded-[28px] p-10 text-left">
      <span className="absolute left-5 top-5 h-4 w-4 border-l border-t border-gold/50" aria-hidden />
      <span className="absolute right-5 top-5 h-4 w-4 border-r border-t border-gold/50" aria-hidden />
      <span className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-gold/50" aria-hidden />
      <span className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-gold/50" aria-hidden />

      <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">
        {bookingLabel ?? "Booking"}
      </p>
      <div className="mt-6">
        <BookingTierList tiers={bookingTiers} premium />
      </div>
    </div>
  ) : null;

  const collaboratorBlock: ReactNode = winWinText ? (
    <div className="wellness-glass-card-gold relative overflow-hidden rounded-[28px] p-10">
      <div className="flex flex-col gap-3 text-center">
        <p className="font-sans text-[14px] leading-relaxed text-paper/70">{winWinText}</p>
        {contactEmail && (
          <p className="font-sans text-[14px] text-paper/70">
            For more information email:{" "}
            <a href={`mailto:${contactEmail}`} className="text-gold hover:underline">
              {contactEmail}
            </a>
          </p>
        )}
        {collaboratorPitch && (
          <>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-gold/70">
              AND
            </p>
            <p className="font-sans text-[14px] font-semibold text-paper">{collaboratorPitch}</p>
          </>
        )}
      </div>
      {collaboratorItems && collaboratorItems.length > 0 && (
        <ul className="mx-auto mt-4 flex max-w-sm flex-col gap-2 text-left">
          {collaboratorItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-sans text-[13px] leading-relaxed text-paper/70"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : null;

  const accentStyle = accentColor
    ? ({ "--tier-accent": accentColor } as React.CSSProperties)
    : undefined;

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36" style={accentStyle}>
      <motion.div
        className="pointer-events-none absolute -top-20 left-1/4 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[150px]"
        animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
        transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-1/5 h-[420px] w-[420px] rounded-full bg-plum/20 blur-[150px]"
        animate={reduced ? undefined : { x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      {!reduced && <SectionParticles count={26} />}
      <div
        className="wellness-grain-overlay pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section 1 — text left, image right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
        >
          <div className="flex flex-col gap-6 text-left">
            <span className="flex items-center gap-3">
              <span className="block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
              <Sparkles size={14} className="text-gold" />
            </span>
            <h2 className="wellness-text-gradient-gold font-display text-[34px] font-light uppercase leading-[1.15] tracking-[0.02em] md:text-[48px]">
              {heading}
            </h2>
            {tagline && (
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-gold">
                {tagline}
              </p>
            )}
            {bodyParagraphs && bodyParagraphs.length > 0 && (
              <div className="flex flex-col gap-4">
                {bodyParagraphs.map((p, i) => (
                  <p key={i} className="font-sans text-[15px] font-light leading-[1.9] text-paper/65">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {session && (
              <div className="wellness-glass-card-gold relative mt-3 overflow-hidden rounded-[24px] p-8 text-left">
                <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-gold/50" aria-hidden />
                <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-gold/50" aria-hidden />
                <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/50" aria-hidden />
                <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/50" aria-hidden />
                <h3 className="wellness-text-gradient-gold font-display text-[26px] font-semibold uppercase tracking-[0.1em]">
                  {session.heading}
                </h3>
                {session.subheading && (
                  <p className="mt-1 font-sans text-[12px] font-semibold uppercase tracking-[0.25em] text-paper/60">
                    {session.subheading}
                  </p>
                )}
                <p className="mt-4 font-sans text-[14px] font-light leading-[1.9] text-paper/65">
                  {session.description}
                </p>
                {session.extraParagraph && (
                  <p className="mt-3 font-sans text-[14px] font-light leading-[1.9] text-paper/65">
                    {session.extraParagraph}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-10">
            {hasPrimaryImage !== false && (
              <ImageBubble
                src={image}
                alt={heading}
                reduced={reduced}
                heroArt={heroArt}
                plain={imagePlain}
                aspect={imageAspect}
              />
            )}
            {hasSecondaryImage && (
              <ImageBubble
                src={secondaryImage}
                alt={heading}
                reduced={reduced}
                delay={0.4}
                aspect={secondaryImageAspect}
              />
            )}
          </div>
        </motion.div>

        {/* Section 2 — pricing, centered */}
        {(pricingBlock || collaboratorBlock) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mx-auto mt-20 max-w-md text-center md:mt-24"
          >
            <span className="mx-auto flex w-24 items-center justify-center gap-2" aria-hidden>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
              <Sparkles size={12} className="text-gold" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
            </span>
            {pricingBlock && <div className="mt-8">{pricingBlock}</div>}
            {collaboratorBlock && <div className="mt-10">{collaboratorBlock}</div>}
          </motion.div>
        )}
      </div>
    </section>
  );
}

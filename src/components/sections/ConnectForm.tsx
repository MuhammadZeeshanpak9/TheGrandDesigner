"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Lock, Compass } from "lucide-react";

type ConnectFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

const TRUST_SIGNALS = [
  { Icon: Gem, label: "Private, bespoke consultations" },
  { Icon: Lock, label: "Confidential by design" },
  { Icon: Compass, label: "Direct access to The Grand Designer" },
];

const inputClassName =
  "w-full border border-mist rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold transition-shadow";

export function ConnectForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectFormValues>();

  const onSubmit = () => {
    // Static-only, no backend call.
    setSubmitted(true);
  };

  return (
    <section className="section-fade-edges bg-paper-warm/40 backdrop-blur-md py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: heading, content, trust signals */}
        <div className="text-center md:text-left">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">
            By Invitation
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.08em] text-ink text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            Connect With
            <br />
            The Grand Designer
          </h2>
          <p className="text-sm md:text-base text-ink/70 leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
            Tell us where you are, and we&apos;ll show you the way within. Every
            engagement begins with a conversation — considered, unhurried, and
            held in complete confidence.
          </p>
          <ul className="flex flex-col gap-4 items-center md:items-start">
            {TRUST_SIGNALS.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-ink/80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div className="bg-white/80 backdrop-blur-md border border-mist rounded-2xl shadow-sm p-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="font-display text-xl text-ink">
                  Thank you, we&apos;ll be in touch.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className={inputClassName}
                  />
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className={inputClassName}
                  />
                </div>

                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  type="email"
                  placeholder="Email*"
                  className={inputClassName}
                />
                {errors.email && (
                  <span className="text-xs text-red-600">
                    A valid email is required
                  </span>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    {...register("phone")}
                    placeholder="Phone"
                    className={inputClassName}
                  />
                  <input
                    {...register("city")}
                    placeholder="City"
                    className={inputClassName}
                  />
                </div>

                <textarea
                  {...register("message", { required: true })}
                  placeholder="Message*"
                  rows={4}
                  className={inputClassName}
                />
                {errors.message && (
                  <span className="text-xs text-red-600">
                    Message is required
                  </span>
                )}

                <button
                  type="submit"
                  className="mt-2 bg-ink text-paper py-3 rounded-sm uppercase tracking-[0.2em] text-sm font-bold transition-all duration-300 hover:bg-teal hover:scale-[1.02] active:scale-[0.98]"
                >
                  Request Access
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

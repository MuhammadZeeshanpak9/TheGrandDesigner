"use client";

// NOTE: raw motion.* used per project convention (see floating-dock.tsx) —
// the app's LazyMotion wrapper is intentionally not used here.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type MembershipFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  membership: string;
};

type MembershipOption = { label: string; value: string };

const inputClassName =
  "w-full border border-mist rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold transition-shadow";

export function MembershipForm({
  options,
}: {
  options: MembershipOption[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipFormValues>();

  const onSubmit = () => {
    // Static-only, no backend call.
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md border border-mist rounded-2xl shadow-sm p-8">
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

            <select
              {...register("membership", { required: true })}
              defaultValue=""
              className={inputClassName}
            >
              <option value="" disabled>
                Select Membership*
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.membership && (
              <span className="text-xs text-red-600">
                Please select a membership
              </span>
            )}

            <textarea
              {...register("message", { required: true })}
              placeholder="Message*"
              rows={4}
              className={inputClassName}
            />
            {errors.message && (
              <span className="text-xs text-red-600">Message is required</span>
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
  );
}

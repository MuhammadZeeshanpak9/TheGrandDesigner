import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer = (staggerDelay = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
});

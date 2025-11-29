import { Variants } from "framer-motion";

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 1, 0.3, 1],
    },  
  },
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: delay,
    },
  }),
};

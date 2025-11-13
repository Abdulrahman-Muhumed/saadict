import type { MotionProps } from "framer-motion";

export const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "whileInView" | "transition"> => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

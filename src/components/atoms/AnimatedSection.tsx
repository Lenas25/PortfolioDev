import { motion } from "framer-motion";
import { useReveal } from "../../hooks/useReveal";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: Props) {
  const { ref, animate, initial, transition } = useReveal({ direction, delay });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

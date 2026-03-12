import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseRevealOptions {
  direction?: "up" | "left" | "right";
  delay?: number;
  margin?: string;
}

export function useReveal({
  direction = "up",
  delay = 0,
  margin = "-80px",
}: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: margin as any });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 32 : 0,
    x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
  };

  const animate = isInView ? { opacity: 1, y: 0, x: 0 } : initial;

  const transition = {
    duration: 0.7,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  };

  return { ref, animate, initial, transition };
}

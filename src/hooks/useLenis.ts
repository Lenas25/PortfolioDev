import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Auto-pause when modal opens (body overflow hidden)
    // Check continuously for modal state
    const checkModalState = () => {
      const bodyOverflow = document.body.style.overflow || 
        window.getComputedStyle(document.body).overflow;
      
      const hasModal = document.querySelector('[role="dialog"]') !== null;
      
      if (bodyOverflow === "hidden" || hasModal) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    // Check on scroll and wheel events
    lenis.on("scroll", checkModalState);

    // Use MutationObserver to detect body style changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Also check periodically for modal state (helps with touchpad)
    const intervalId = setInterval(checkModalState, 100);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      lenis.off("scroll", checkModalState);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

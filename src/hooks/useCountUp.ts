import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

/**
 * Hook para animar números con efecto count-up
 * @param options.end - Número final
 * @param options.duration - Duración en ms (default: 2000)
 * @param options.delay - Delay antes de iniciar en ms (default: 0)
 * @param options.enabled - Si está habilitado (default: true)
 */
export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      setIsComplete(true);
      return;
    }

    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out-cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;

        setCount(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setIsComplete(true);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [start, end, duration, delay, enabled]);

  return { count, isComplete };
}

/**
 * Formatea el número para mostrar
 * @param value - Valor numérico
 * @param suffix - Sufijo a añadir (ej: "+", "%")
 * @param decimals - Número de decimales (default: 0)
 */
export function formatCountUp(
  value: number,
  suffix?: string,
  decimals: number = 0,
): string {
  const formatted = value.toFixed(decimals);
  return suffix ? `${formatted}${suffix}` : formatted;
}

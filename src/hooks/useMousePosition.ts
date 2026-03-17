import { useEffect, useState, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

/**
 * Hook para trackear la posición del mouse
 * Útil para efectos de parallax y magnetic elements
 */
export function useMousePosition(enabled: boolean = true) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / window.innerWidth) * 2 - 1;
      const normalizedY = (y / window.innerHeight) * 2 - 1;

      setPosition({
        x,
        y,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  return position;
}

/**
 * Hook para crear efecto magnético en elementos
 * El elemento "sigue" ligeramente al cursor cuando está cerca
 */
export function useMagneticEffect(
  strength: number = 0.3,
  radius: number = 150,
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useState<HTMLElement | null>(null);
  const mousePosition = useMousePosition();

  const calculateOffset = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return { x: 0, y: 0 };

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = mousePosition.x - centerX;
      const distanceY = mousePosition.y - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const factor = (1 - distance / radius) * strength;
        return {
          x: distanceX * factor,
          y: distanceY * factor,
        };
      }

      return { x: 0, y: 0 };
    },
    [mousePosition, strength, radius],
  );

  useEffect(() => {
    if (!elementRef[0]) return;
    const offset = calculateOffset(elementRef[0]);
    setOffset(offset);
  }, [mousePosition, calculateOffset, elementRef]);

  return {
    offset,
    isHovered,
    setIsHovered,
    elementRef: elementRef[1],
  };
}

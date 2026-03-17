import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

/**
 * Hook para detectar el código Konami
 * ↑↑↓↓←→←→BA
 *
 * @param callback - Función a ejecutar cuando se completa el código
 * @returns objeto con el estado actual de la secuencia
 */
export function useKonamiCode(callback: () => void) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const resetSequence = useCallback(() => {
    setInputSequence([]);
    setProgress(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code];

      // Verificar si el nuevo input coincide con el código Konami
      const isValid = newSequence.every(
        (key, index) => key === KONAMI_CODE[index],
      );

      if (isValid) {
        setInputSequence(newSequence);
        setProgress(newSequence.length / KONAMI_CODE.length);

        // Si completó el código
        if (newSequence.length === KONAMI_CODE.length) {
          callback();
          resetSequence();
        }
      } else {
        // Reiniciar si el input es incorrecto
        // Pero verificar si el nuevo input podría ser el inicio del código
        if (e.code === "ArrowUp") {
          setInputSequence([e.code]);
          setProgress(1 / KONAMI_CODE.length);
        } else {
          resetSequence();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, callback, resetSequence]);

  return {
    progress,
    currentStep: inputSequence.length,
    totalSteps: KONAMI_CODE.length,
    resetSequence,
  };
}

/**
 * Representación visual del código Konami para hints
 */
export const KONAMI_CODE_DISPLAY = "↑↑↓↓←→←→BA";

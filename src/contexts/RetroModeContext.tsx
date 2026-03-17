import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useKonamiCode, KONAMI_CODE_DISPLAY } from "../hooks/useKonamiCode";

interface RetroModeContextType {
  isRetroMode: boolean;
  toggleRetroMode: () => void;
  enableRetroMode: () => void;
  disableRetroMode: () => void;
  konamiProgress: number;
}

const RetroModeContext = createContext<RetroModeContextType | null>(null);

const STORAGE_KEY = "portfolio-retro-mode";

export function RetroModeProvider({ children }: { children: ReactNode }) {
  const [isRetroMode, setIsRetroMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) === "true";
    }
    return false;
  });
  const [showToast, setShowToast] = useState(false);

  const enableRetroMode = () => {
    setIsRetroMode(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const disableRetroMode = () => {
    setIsRetroMode(false);
    setShowToast(false);
  };

  const toggleRetroMode = () => {
    if (isRetroMode) {
      disableRetroMode();
    } else {
      enableRetroMode();
    }
  };

  // Konami code handler
  const { progress } = useKonamiCode(enableRetroMode);

  // Persistir estado en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isRetroMode));
  }, [isRetroMode]);

  // Aplicar clase al body
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isRetroMode) {
        document.body.classList.add("retro-mode");
      } else {
        document.body.classList.remove("retro-mode");
      }
    }
  }, [isRetroMode]);

  // ESC para desactivar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isRetroMode) {
        disableRetroMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRetroMode]);

  // Mensaje en consola como pista
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.log(
        "%c🎮 Secret Hint 🎮",
        "font-size: 20px; font-weight: bold; color: #ff2d7b; text-shadow: 2px 2px 0 #00e8a2;",
      );
      console.log(
        `%cTry: ${KONAMI_CODE_DISPLAY}`,
        "font-size: 14px; color: #00e8a2;",
      );
    }
  }, []);

  return (
    <RetroModeContext.Provider
      value={{
        isRetroMode,
        toggleRetroMode,
        enableRetroMode,
        disableRetroMode,
        konamiProgress: progress,
      }}
    >
      {children}
      {/* Toast de activación */}
      {showToast && <RetroModeToast onClose={() => setShowToast(false)} />}
    </RetroModeContext.Provider>
  );
}

// Componente de Toast estilo arcade
function RetroModeToast({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "#ff2d7b",
        color: "#0d0d0d",
        padding: "12px 24px",
        fontFamily: "monospace",
        fontWeight: 700,
        fontSize: 14,
        border: "3px solid #0d0d0d",
        boxShadow: "4px 4px 0 #00e8a2",
        display: "flex",
        alignItems: "center",
        gap: 12,
        animation: "slideUp 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: 20 }}>🎮</span>
      <span>MODO RETRO ACTIVADO</span>
      <span
        style={{
          fontSize: 11,
          opacity: 0.8,
          marginLeft: 8,
        }}
      >
        ESC para salir
      </span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#0d0d0d",
          cursor: "pointer",
          fontSize: 16,
          marginLeft: 8,
        }}
      >
        ×
      </button>
    </div>
  );
}

export function useRetroMode() {
  const context = useContext(RetroModeContext);
  if (!context) {
    throw new Error("useRetroMode must be used within a RetroModeProvider");
  }
  return context;
}

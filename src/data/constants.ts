import type { Lang } from "./i18n";

export const STATUS_COLORS: Record<string, string> = {
  live: "#22C55E",
  freelance: "var(--accent)",
  personal: "#60A5FA",
};

export const STATUS_LABELS: Record<string, Record<Lang, string>> = {
  live: { en: "Live", es: "En vivo" },
  freelance: { en: "Freelance", es: "Freelance" },
  personal: { en: "Personal", es: "Personal" },
};

export const TOOLS_LIST = [
  "🤖 Claude API",
  "⚡ RAG",
  "🐍 Pydantic AI",
  "🔄 N8N",
  "⚛️ React",
  "🔺 Next.js",
  "🚀 Astro",
  "🐦 Flutter",
  "🐍 FastAPI",
  "🏠 NestJS",
  "🐳 Docker",
  "☁️ GCP",
  "💙 Azure",
  "🗄️ PostgreSQL",
  "🔥 Firebase",
  "🎨 Figma",
  "🤗 HuggingFace",
  "📦 Prisma",
  "🔑 Redis",
  "🔐 JWT",
  "📊 Chart.js",
] as const;

export const WHATSAPP_NUMBER = "51912905731";

export const PROJECT_GRID_COLS = [7, 5, 5, 7, 6, 6] as const;

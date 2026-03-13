import { motion } from "framer-motion";

const items = [
  "AI Engineering",
  "LangChain · LangGraph",
  "Next.js",
  "FastAPI",
  "N8N Automation",
  "Pydantic AI",
  "Full Stack Dev",
  "GCP · Azure",
  "Flutter Mobile",
  "Prompt Engineering",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-shell">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
        className="marquee-track"
      >
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

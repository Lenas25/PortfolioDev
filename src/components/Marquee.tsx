import { motion } from 'framer-motion';

const items = [
  'AI Engineering', 'LangChain · LangGraph', 'Next.js', 'FastAPI',
  'N8N Automation', 'Pydantic AI', 'Full Stack Dev', 'GCP · Azure',
  'Flutter Mobile', 'Prompt Engineering',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div style={{
      borderTop: '3px solid var(--border)',
      borderBottom: '3px solid var(--border)',
      background: 'var(--accent)',
      padding: '13px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 18,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ display: 'inline-flex' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#fff', padding: '0 28px',
            display: 'inline-flex', alignItems: 'center', gap: 14,
          }}>
            {item}
            <span style={{ opacity: 0.45 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

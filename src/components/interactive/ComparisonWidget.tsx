/**
 * ComparisonWidget — React vs Astro Code Comparison
 * ──────────────────────────────────────────────────
 * A tabbed code viewer that shows React code alongside its Astro equivalent.
 * Used in Lesson 1.3 (Astro Components) to help React developers see familiar
 * patterns translated to Astro syntax.
 *
 * This component is a React island — it needs JavaScript for the tab switching.
 * It's hydrated with client:idle since it's not critical to initial page load.
 *
 * @see Lesson 1.3 (Astro Components) — featured in this lesson.
 * @see Lesson 4.1 (Islands Concept) — an example of a non-critical island.
 */
import { useState } from 'react';

interface ComparisonExample {
  title: string;
  react: string;
  astro: string;
}

interface ComparisonWidgetProps {
  examples: ComparisonExample[];
}

export default function ComparisonWidget({ examples }: ComparisonWidgetProps) {
  const [activeExample, setActiveExample] = useState(0);
  const [activeTab, setActiveTab] = useState<'react' | 'astro'>('react');

  const current = examples[activeExample];

  return (
    <div style={styles.container}>
      {/* Example selector */}
      {examples.length > 1 && (
        <div style={styles.exampleTabs}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setActiveExample(i); setActiveTab('react'); }}
              style={{
                ...styles.exampleTab,
                ...(i === activeExample ? styles.exampleTabActive : {}),
              }}
            >
              {ex.title}
            </button>
          ))}
        </div>
      )}

      {/* React / Astro tabs */}
      <div style={styles.header}>
        <button
          onClick={() => setActiveTab('react')}
          style={{
            ...styles.tab,
            ...(activeTab === 'react' ? styles.tabActive : {}),
          }}
        >
          React
        </button>
        <span style={styles.arrow}>→</span>
        <button
          onClick={() => setActiveTab('astro')}
          style={{
            ...styles.tab,
            ...(activeTab === 'astro' ? styles.tabActiveAstro : {}),
          }}
        >
          Astro
        </button>
      </div>

      {/* Code display */}
      <pre style={styles.code}>
        <code>{activeTab === 'react' ? current.react : current.astro}</code>
      </pre>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    border: '1px solid #30363d',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '24px 0',
    background: '#0d1117',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  exampleTabs: {
    display: 'flex',
    gap: '0',
    borderBottom: '1px solid #30363d',
    background: '#161b22',
  },
  exampleTab: {
    padding: '8px 16px',
    border: 'none',
    background: 'transparent',
    color: '#8b949e',
    fontSize: '0.8rem',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  exampleTabActive: {
    color: '#e6edf3',
    borderBottomColor: '#a78bfa',
    background: '#1c2333',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
  },
  tab: {
    padding: '6px 16px',
    border: '1px solid #30363d',
    borderRadius: '6px',
    background: 'transparent',
    color: '#8b949e',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: 500,
  },
  tabActive: {
    background: '#1a3a5c',
    color: '#58a6ff',
    borderColor: '#1a3a5c',
  },
  tabActiveAstro: {
    background: '#2d1b69',
    color: '#a78bfa',
    borderColor: '#2d1b69',
  },
  arrow: {
    color: '#6e7681',
    fontSize: '0.9rem',
  },
  code: {
    padding: '16px 20px',
    margin: 0,
    fontSize: '0.85rem',
    lineHeight: 1.6,
    color: '#e6edf3',
    background: '#0d1117',
    overflow: 'auto',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    border: 'none',
    borderRadius: 0,
  },
};

/**
 * Counter — Interactive React Island Demo
 * ────────────────────────────────────────
 * A simple counter component used in Lesson 4.2 (Integrating React) to demonstrate
 * the difference between static rendering and hydrated islands.
 *
 * When used WITHOUT a client directive in Astro:
 *   <Counter />  →  Renders HTML at build time. Buttons don't work (no JS).
 *
 * When used WITH a client directive:
 *   <Counter client:load />  →  Renders HTML + hydrates with React. Buttons work!
 *
 * This is the key insight of Astro's islands architecture: React components
 * render to HTML by default, and you opt-in to interactivity per component.
 *
 * @see Lesson 4.2 (Integrating React) — this component is featured there.
 * @see Lesson 4.3 (Client Directives) — demonstrates different hydration strategies.
 */
import { useState } from 'react';

interface CounterProps {
  /** Starting value for the counter */
  initialCount?: number;
  /** Label displayed above the counter */
  label?: string;
  /** Visual style variant */
  variant?: 'default' | 'compact';
}

export default function Counter({
  initialCount = 0,
  label = 'Counter',
  variant = 'default',
}: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      style={{
        padding: variant === 'compact' ? '12px 16px' : '20px 24px',
        border: '1px solid #30363d',
        borderRadius: '8px',
        background: '#161b22',
        display: 'inline-block',
        fontFamily: 'Inter, system-ui, sans-serif',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          fontSize: '0.85rem',
          color: '#8b949e',
          marginBottom: '8px',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => setCount((c) => c - 1)}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #30363d',
            borderRadius: '6px',
            background: '#21262d',
            color: '#e6edf3',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          -
        </button>
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#e6edf3',
            minWidth: '3ch',
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {count}
        </span>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #30363d',
            borderRadius: '6px',
            background: '#21262d',
            color: '#e6edf3',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

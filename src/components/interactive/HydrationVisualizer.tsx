/**
 * HydrationVisualizer — Client Directive Timing Demo
 * ───────────────────────────────────────────────────
 * Visualizes when different client directives hydrate components.
 * Each "island" shows a visual indicator of its hydration state and
 * records the time it took to become interactive.
 *
 * This is the key interactive demo for Lesson 4.3 (Client Directives).
 * It helps React developers understand that in Astro, you choose WHEN
 * each component loads JavaScript, unlike React where everything hydrates.
 *
 * @see Lesson 4.3 (Client Directives Deep Dive) — featured in this lesson.
 */
import { useState, useEffect, useRef } from 'react';

interface HydrationIslandProps {
  /** Which client directive this island simulates */
  directive: 'client:load' | 'client:idle' | 'client:visible' | 'client:media' | 'none';
  /** Display label */
  label: string;
}

function HydrationIsland({ directive, label }: HydrationIslandProps) {
  const [hydrated, setHydrated] = useState(false);
  const [hydrateTime, setHydrateTime] = useState<number | null>(null);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const elapsed = Math.round(performance.now() - startTime.current);
    setHydrateTime(elapsed);
    setHydrated(true);
  }, []);

  return (
    <div
      style={{
        padding: '16px',
        border: `1px solid ${hydrated ? '#3fb950' : '#30363d'}`,
        borderRadius: '8px',
        background: hydrated ? 'rgba(63, 185, 80, 0.05)' : '#161b22',
        transition: 'all 500ms ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <code style={{ fontSize: '0.8rem', color: '#a78bfa', background: '#2d1b69', padding: '2px 8px', borderRadius: '4px' }}>
          {directive}
        </code>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: hydrated ? '#3fb950' : '#6e7681',
            display: 'inline-block',
            transition: 'background 300ms ease',
          }}
        />
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e6edf3', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>
        {hydrated
          ? `Hydrated in ${hydrateTime}ms`
          : 'Waiting for hydration...'}
      </div>
    </div>
  );
}

export default function HydrationVisualizer() {
  return (
    <div
      style={{
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '20px',
        background: '#0d1117',
        margin: '24px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#e6edf3' }}>
        Hydration Timeline
      </h4>
      <p style={{ fontSize: '0.8rem', color: '#6e7681', marginBottom: '16px' }}>
        Each box represents a component with a different client directive. The green dot indicates when JavaScript has loaded and the component is interactive.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        <HydrationIsland directive="client:load" label="Loads immediately" />
        <HydrationIsland directive="client:idle" label="Loads when browser is idle" />
        <HydrationIsland directive="client:visible" label="Loads when scrolled into view" />
        <HydrationIsland directive="client:media" label="Loads at breakpoint" />
        <div
          style={{
            padding: '16px',
            border: '1px solid #30363d',
            borderRadius: '8px',
            background: '#161b22',
          }}
        >
          <div style={{ marginBottom: '8px' }}>
            <code style={{ fontSize: '0.8rem', color: '#6e7681', background: '#21262d', padding: '2px 8px', borderRadius: '4px' }}>
              no directive
            </code>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e6edf3', marginBottom: '4px' }}>
            Static HTML only
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>
            No JavaScript shipped. Zero bytes.
          </div>
        </div>
      </div>
    </div>
  );
}

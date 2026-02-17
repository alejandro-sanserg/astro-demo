/**
 * StyleScopeDemo — CSS Scoping Visualizer
 * ────────────────────────────────────────
 * Demonstrates how Astro scopes CSS to individual components.
 * Shows two "components" side by side — each with a `.title` class
 * that has different styles, illustrating that styles don't leak.
 *
 * Toggles between "scoped" and "global" mode to show the difference.
 *
 * @see Lesson 2.1 (Scoped Styles & CSS) — featured in this lesson.
 */
import { useState } from 'react';

export default function StyleScopeDemo() {
  const [isScoped, setIsScoped] = useState(true);

  return (
    <div
      style={{
        border: '1px solid #30363d',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '24px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: '#161b22',
          borderBottom: '1px solid #30363d',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e6edf3' }}>
          CSS Scoping Demo
        </span>
        <button
          onClick={() => setIsScoped(!isScoped)}
          style={{
            padding: '4px 12px',
            border: '1px solid #30363d',
            borderRadius: '6px',
            background: isScoped ? '#2d1b69' : '#1a3a5c',
            color: isScoped ? '#a78bfa' : '#58a6ff',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {isScoped ? '🔒 Scoped (Astro)' : '🌍 Global (Traditional)'}
        </button>
      </div>

      {/* Components side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#30363d' }}>
        {/* Component A */}
        <div style={{ padding: '20px', background: '#0d1117' }}>
          <div style={{ fontSize: '0.7rem', color: '#6e7681', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace" }}>
            {'<ComponentA />'}
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '6px',
              border: '1px dashed #30363d',
            }}
          >
            <p
              style={{
                fontSize: isScoped ? '1.1rem' : '1.1rem',
                fontWeight: 600,
                color: isScoped ? '#a78bfa' : (isScoped ? '#a78bfa' : '#f85149'),
                margin: 0,
              }}
            >
              .title {'{'} color: purple {'}'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#8b949e', margin: '8px 0 0' }}>
              This component styles .title as purple
            </p>
          </div>
        </div>

        {/* Component B */}
        <div style={{ padding: '20px', background: '#0d1117' }}>
          <div style={{ fontSize: '0.7rem', color: '#6e7681', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace" }}>
            {'<ComponentB />'}
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '6px',
              border: '1px dashed #30363d',
            }}
          >
            <p
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: isScoped ? '#3fb950' : '#f85149',
                margin: 0,
              }}
            >
              .title {'{'} color: {isScoped ? 'green' : 'purple ← LEAKED!'} {'}'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#8b949e', margin: '8px 0 0' }}>
              {isScoped
                ? 'This component styles .title as green — no conflict!'
                : 'ComponentA\'s styles leaked and overrode this component!'}
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div style={{ padding: '12px 16px', background: '#161b22', fontSize: '0.8rem', color: '#8b949e', lineHeight: 1.5 }}>
        {isScoped
          ? '✅ Astro scopes styles automatically. Both components use .title but their styles don\'t conflict. Astro adds unique data attributes (like data-astro-cid-xyz) to isolate styles.'
          : '❌ Without scoping, the last .title style wins. ComponentA\'s purple leaks into ComponentB. This is the classic CSS global scope problem.'}
      </div>
    </div>
  );
}

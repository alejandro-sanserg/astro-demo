/**
 * FileTreeExplorer — Interactive Project Structure Viewer
 * ───────────────────────────────────────────────────────
 * An expandable/collapsible file tree that shows the Astro project structure.
 * Clicking a file or folder reveals a description of its purpose and which
 * lesson covers it.
 *
 * Used in Lesson 1.2 (Project Structure & Routing) to give learners an
 * interactive way to explore the project layout.
 *
 * @see Lesson 1.2 (Project Structure & Routing) — featured in this lesson.
 */
import { useState } from 'react';

interface TreeNode {
  name: string;
  description?: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

const projectTree: TreeNode[] = [
  {
    name: 'src/',
    type: 'folder',
    description: 'All your source code lives here. Astro processes everything inside src/.',
    children: [
      {
        name: 'pages/',
        type: 'folder',
        description: 'File-based routing! Every .astro file here becomes a URL route. index.astro → /, about.astro → /about.',
        children: [
          { name: 'index.astro', type: 'file', description: 'The homepage (/) — your site\'s entry point.' },
          {
            name: 'lessons/',
            type: 'folder',
            description: 'Nested folder = nested route. Files here are at /lessons/*.',
            children: [
              { name: '[...slug].astro', type: 'file', description: 'A dynamic catch-all route. Renders every lesson from the content collection.' },
              { name: 'index.astro', type: 'file', description: 'The lessons listing page at /lessons/.' },
            ],
          },
          {
            name: 'api/',
            type: 'folder',
            description: 'API endpoints. Files here export GET/POST handlers instead of HTML.',
            children: [
              { name: 'subscribe.ts', type: 'file', description: 'An example API endpoint at /api/subscribe. Returns JSON, not HTML.' },
            ],
          },
        ],
      },
      {
        name: 'components/',
        type: 'folder',
        description: 'Reusable UI components. Can be .astro (static) or .tsx/.jsx (React islands).',
        children: [
          { name: 'Header.astro', type: 'file', description: 'Astro component — renders to static HTML with scoped CSS.' },
          { name: 'Sidebar.astro', type: 'file', description: 'Course navigation sidebar. Queries content collections at build time.' },
          { name: 'Callout.astro', type: 'file', description: 'Info/tip/warning boxes used in lesson content.' },
          {
            name: 'interactive/',
            type: 'folder',
            description: 'React components for interactive demos. These are "islands" that hydrate with JavaScript.',
            children: [
              { name: 'Counter.tsx', type: 'file', description: 'React island. Uses useState — needs client:load to be interactive.' },
              { name: 'ComparisonWidget.tsx', type: 'file', description: 'React island. Tabs between React and Astro code examples.' },
            ],
          },
        ],
      },
      {
        name: 'content/',
        type: 'folder',
        description: 'Content collections — type-safe Markdown/MDX content managed by Astro.',
        children: [
          {
            name: 'lessons/',
            type: 'folder',
            description: 'Each subfolder is a chapter, each .mdx file is a lesson.',
            children: [
              { name: '1-foundations/', type: 'folder', description: 'Chapter 1 lessons: welcome, project structure, components, layouts.' },
              { name: '2-styling/', type: 'folder', description: 'Chapter 2 lessons: scoped styles, Tailwind CSS.' },
              { name: '3-content/', type: 'folder', description: 'Chapter 3 lessons: content collections, querying, MDX.' },
            ],
          },
        ],
      },
      {
        name: 'layouts/',
        type: 'folder',
        description: 'Layout components that wrap page content. Like React\'s layout pattern but with <slot />.',
        children: [
          { name: 'BaseLayout.astro', type: 'file', description: 'Root layout: HTML shell, <head>, View Transitions, Header/Footer.' },
          { name: 'LessonLayout.astro', type: 'file', description: 'Wraps BaseLayout. Adds sidebar, TOC, and lesson navigation.' },
        ],
      },
      { name: 'styles/', type: 'folder', description: 'Global CSS files. Component styles live in scoped <style> blocks instead.' },
      { name: 'utils/', type: 'folder', description: 'TypeScript utility functions for sorting lessons, building navigation, etc.' },
    ],
  },
  { name: 'public/', type: 'folder', description: 'Static assets copied directly to the build output. Fonts, images, favicon, etc.' },
  { name: 'content.config.ts', type: 'file', description: 'Defines content collection schemas using Zod. Validates frontmatter at build time.' },
  { name: 'astro.config.mjs', type: 'file', description: 'Astro configuration: integrations (React, MDX), markdown settings, site URL.' },
  { name: 'tsconfig.json', type: 'file', description: 'TypeScript config. Extends Astro\'s strict preset. Adds path aliases.' },
  { name: 'package.json', type: 'file', description: 'Project dependencies and scripts: dev, build, preview.' },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const [showInfo, setShowInfo] = useState(false);

  const isFolder = node.type === 'folder';
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const icon = isFolder ? (isOpen ? '📂' : '📁') : '📄';

  return (
    <div style={{ paddingLeft: depth > 0 ? '20px' : '0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          color: showInfo ? '#a78bfa' : '#e6edf3',
          background: showInfo ? 'rgba(124,58,237,0.1)' : 'transparent',
          fontFamily: "'JetBrains Mono', monospace",
          transition: 'all 150ms ease',
        }}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          setShowInfo(!showInfo);
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = showInfo ? 'rgba(124,58,237,0.1)' : 'transparent';
        }}
      >
        <span>{icon}</span>
        <span>{node.name}</span>
      </div>

      {showInfo && node.description && (
        <div
          style={{
            marginLeft: '34px',
            padding: '8px 12px',
            fontSize: '0.8rem',
            color: '#8b949e',
            background: '#161b22',
            borderRadius: '6px',
            borderLeft: '2px solid #7c3aed',
            marginBottom: '4px',
            lineHeight: 1.5,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {node.description}
        </div>
      )}

      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTreeExplorer() {
  return (
    <div
      style={{
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '16px',
        background: '#0d1117',
        margin: '24px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '0.8rem',
          color: '#6e7681',
          marginBottom: '12px',
          fontWeight: 500,
        }}
      >
        Click any file or folder to learn its purpose
      </div>
      {projectTree.map((node, i) => (
        <TreeItem key={i} node={node} />
      ))}
    </div>
  );
}

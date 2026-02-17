# Astro for React Developers

An interactive course that teaches experienced React developers the [Astro](https://astro.build) framework — **built with Astro itself**.

Read the lessons in your browser. Then explore the source code to see every concept in action.

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Open [http://localhost:4321](http://localhost:4321) to start the course.

## Course Structure

**15 lessons across 5 chapters**, progressing from fundamentals to advanced topics.

| Chapter | Topic | Lessons |
|---------|-------|---------|
| 1. Foundations | What Astro is, project structure, components, layouts | 4 |
| 2. Styling | Scoped CSS, `class:list`, Tailwind integration | 2 |
| 3. Content & Data | Content collections, querying, MDX | 3 |
| 4. Islands Architecture | Partial hydration, React integration, client directives | 3 |
| 5. Advanced Features | View Transitions, API endpoints, SSR, deployment | 3 |

## Project Structure

```
src/
├── components/
│   ├── interactive/          # React islands (Counter, ComparisonWidget, etc.)
│   ├── Header.astro          # Site header
│   ├── Sidebar.astro         # Course navigation
│   ├── Callout.astro         # Tip/warning boxes used in lessons
│   └── ...
├── content/
│   └── lessons/              # MDX lesson files organized by chapter
│       ├── 1-foundations/
│       ├── 2-styling/
│       ├── 3-content/
│       ├── 4-islands/
│       └── 5-advanced/
├── layouts/
│   ├── BaseLayout.astro      # HTML shell, View Transitions, header/footer
│   └── LessonLayout.astro    # Sidebar + content + TOC + navigation
├── pages/
│   ├── index.astro           # Course homepage
│   ├── lessons/
│   │   ├── index.astro       # All lessons listing
│   │   └── [...slug].astro   # Dynamic lesson route
│   └── api/
│       └── subscribe.ts      # Example API endpoint
├── styles/
│   └── global.css            # CSS reset, design tokens, typography
└── utils/
    └── lessons.ts            # Helpers for sorting, grouping, navigation
```

## Key Technologies

- **[Astro v5](https://astro.build)** — Static site generator with islands architecture
- **[React](https://react.dev)** — Interactive components hydrated as islands
- **[@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)** — MDX support for embedding components in lessons
- **[View Transitions](https://docs.astro.build/en/guides/view-transitions/)** — Smooth SPA-like navigation
- **TypeScript** — Type-safe components and content schemas

## Learning from the Source Code

The source code is extensively commented with educational notes. After completing the first few chapters, explore:

- `content.config.ts` — Content collection schema with Zod validation
- `src/layouts/BaseLayout.astro` — How layouts and View Transitions work
- `src/pages/lessons/[...slug].astro` — Dynamic routing with `getStaticPaths`
- `src/components/Sidebar.astro` — Querying collections at build time
- `src/components/interactive/` — React islands with different client directives

## License

MIT

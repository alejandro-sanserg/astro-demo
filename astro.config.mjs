// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

/**
 * Astro Configuration
 * ──────────────────
 * This is the central config file for the Astro project. It tells Astro
 * which integrations to load, how to handle markdown, and other build options.
 *
 * Key integrations used in this course:
 * - @astrojs/mdx:   Enables .mdx files so we can embed React components inside markdown lessons.
 * - @astrojs/react:  Lets us write React components and hydrate them as "islands" on the page.
 *
 * @see Lesson 1.2 (Project Structure) for an overview of how this file fits into the project.
 * @see Lesson 3.3 (MDX) and Lesson 4.2 (React Integration) for how these integrations are used.
 */
export default defineConfig({
  // The site URL — update this when deploying to production.
  site: 'https://astro-for-react-devs.example.com',

  // Integrations extend Astro's capabilities.
  // Order matters: mdx() must come before framework integrations in some setups.
  integrations: [
    mdx(),
    react(),
  ],

  // Markdown configuration — applies to both .md and .mdx files.
  markdown: {
    // Shiki provides syntax highlighting for code blocks in lessons.
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});

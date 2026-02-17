/**
 * Content Collections Configuration
 * ──────────────────────────────────
 * This file defines the schema for all content collections in the project.
 * Astro uses Zod (a TypeScript-first validation library) to enforce the shape
 * of frontmatter in our lesson files. If a lesson's frontmatter doesn't match
 * the schema, Astro will throw a helpful error at build time.
 *
 * In Astro v5, this file lives at the project root (not inside src/content/).
 * The `glob` loader tells Astro where to find the content files on disk.
 *
 * @see Lesson 3.1 (Content Collections) for a detailed walkthrough of this file.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Lessons Collection
 * ──────────────────
 * Each lesson is an .mdx file inside src/content/lessons/<chapter-folder>/.
 * The `glob` loader recursively finds all .mdx files in that directory tree.
 *
 * The schema enforces that every lesson has:
 * - title, description: for display and SEO
 * - chapter, order: for sorting and grouping (chapter 1-5, order within chapter)
 * - difficulty: helps learners know what to expect
 * - objectives: learning goals shown at the top of each lesson
 * - duration: estimated reading/working time
 * - tags: for filtering and cross-referencing
 */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    chapter: z.number().int().min(1).max(5),
    order: z.number().int().min(1),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    objectives: z.array(z.string()),
    duration: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { lessons };

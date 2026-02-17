/**
 * Lesson Helpers
 * ──────────────
 * Utility functions for working with the lessons content collection.
 * These handle sorting, grouping by chapter, and finding prev/next lessons.
 *
 * In Astro, utility functions live in src/utils/ and are imported into
 * components and pages. Since Astro components run at build time (server-side),
 * these functions execute during the build — no client-side JavaScript needed.
 *
 * @see Lesson 3.2 (Querying & Rendering Content) for how these are used.
 */
import { getCollection } from 'astro:content';

/** The shape of a single lesson entry from the collection. */
export type Lesson = Awaited<ReturnType<typeof getCollection<'lessons'>>>[number];

/**
 * Strip the .mdx extension from a lesson ID to produce a clean URL slug.
 * The glob loader includes the file extension in the ID, but we want
 * clean URLs like /lessons/1-foundations/1-welcome/ instead of
 * /lessons/1-foundations/1-welcome.mdx/
 */
export function getLessonSlug(lesson: Lesson): string {
  return lesson.id.replace(/\.mdx$/, '');
}

/** Chapter metadata for display purposes. */
export const CHAPTERS: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Foundations',
    description: 'Understand what Astro is, how it differs from React, and learn the core project structure.',
  },
  2: {
    title: 'Styling',
    description: 'Master Astro\'s scoped styles, CSS architecture, and Tailwind CSS integration.',
  },
  3: {
    title: 'Content & Data',
    description: 'Work with content collections, type-safe schemas, and MDX for rich interactive content.',
  },
  4: {
    title: 'Islands Architecture',
    description: 'Learn partial hydration, integrate React components, and control when JavaScript loads.',
  },
  5: {
    title: 'Advanced Features',
    description: 'Add view transitions, build API endpoints, and prepare for production deployment.',
  },
};

/**
 * Get all lessons sorted by chapter and order.
 * This is the primary way to fetch the full lesson list.
 */
export async function getSortedLessons(): Promise<Lesson[]> {
  const lessons = await getCollection('lessons');
  return lessons.sort((a, b) => {
    // Primary sort: by chapter number
    if (a.data.chapter !== b.data.chapter) return a.data.chapter - b.data.chapter;
    // Secondary sort: by order within chapter
    return a.data.order - b.data.order;
  });
}

/**
 * Group lessons by chapter number.
 * Returns a Map where keys are chapter numbers and values are sorted lesson arrays.
 */
export async function getLessonsByChapter(): Promise<Map<number, Lesson[]>> {
  const sorted = await getSortedLessons();
  const grouped = new Map<number, Lesson[]>();

  for (const lesson of sorted) {
    const chapter = lesson.data.chapter;
    if (!grouped.has(chapter)) grouped.set(chapter, []);
    grouped.get(chapter)!.push(lesson);
  }

  return grouped;
}

/**
 * Find the previous and next lessons relative to a given lesson.
 * Used by LessonNav to render "Previous" and "Next" links.
 */
export async function getPrevNext(currentId: string): Promise<{
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}> {
  const sorted = await getSortedLessons();
  const currentIndex = sorted.findIndex((l) => l.id === currentId);

  return {
    prev: currentIndex > 0
      ? { slug: getLessonSlug(sorted[currentIndex - 1]), title: sorted[currentIndex - 1].data.title }
      : null,
    next: currentIndex < sorted.length - 1
      ? { slug: getLessonSlug(sorted[currentIndex + 1]), title: sorted[currentIndex + 1].data.title }
      : null,
  };
}

/**
 * Calculate how many lessons are in a chapter.
 * Useful for progress indicators and chapter cards.
 */
export async function getChapterLessonCount(chapter: number): Promise<number> {
  const lessons = await getCollection('lessons');
  return lessons.filter((l) => l.data.chapter === chapter).length;
}

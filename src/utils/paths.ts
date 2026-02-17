/**
 * Path Helpers
 * ────────────
 * When deploying to a subdirectory (e.g. GitHub Pages at /astro-demo/),
 * all internal links need the base path prefix. Astro's `base` config
 * handles asset URLs automatically, but hardcoded href strings in
 * components need to be prefixed manually.
 *
 * This utility reads the base path from Astro's config (via import.meta.env.BASE_URL)
 * and provides a helper to prefix any internal path.
 */

/** The base path from astro.config.mjs, with trailing slash removed. */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Prefix an internal path with the base URL.
 * Handles both "/" and "/lessons/..." style paths.
 *
 * Examples (with base="/astro-demo"):
 *   url("/")                → "/astro-demo/"
 *   url("/lessons")         → "/astro-demo/lessons"
 *   url("/lessons/1-welcome/") → "/astro-demo/lessons/1-welcome/"
 */
export function url(path: string): string {
  return `${base}${path}`;
}

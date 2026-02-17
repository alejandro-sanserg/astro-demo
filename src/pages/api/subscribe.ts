/**
 * API Endpoint — /api/subscribe
 * ──────────────────────────────
 * A demonstration API endpoint for the course. In Astro, any file inside
 * src/pages/ that exports HTTP method handlers (GET, POST, PUT, DELETE)
 * becomes an API route instead of an HTML page.
 *
 * This endpoint simulates a newsletter subscription. In a real project,
 * you'd connect this to a database or email service like Mailchimp, Resend, etc.
 *
 * Key concepts:
 * - API routes use standard Web Request/Response objects (no Express, no custom APIs)
 * - Static builds (output: 'static') prerender API routes at build time as JSON files
 * - For dynamic API routes, use output: 'server' or set `export const prerender = false`
 *
 * @see Lesson 5.2 (API Endpoints & SSR) for a full walkthrough of this pattern.
 */
import type { APIRoute } from 'astro';

/**
 * GET /api/subscribe
 * Returns a simple status message. Useful for health checks.
 */
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: 'Newsletter subscription endpoint. Send a POST request to subscribe.',
      status: 'ok',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * POST /api/subscribe
 * Accepts a JSON body with { email, name } and "subscribes" the user.
 *
 * In a real app, you would:
 * 1. Validate the input (Zod is great for this)
 * 2. Save to a database or send to an email service
 * 3. Return appropriate success/error responses
 *
 * Note: This endpoint only works at runtime (SSR mode).
 * In static mode, POST handlers are not available since there's no server.
 * To use this in production, set `export const prerender = false` or
 * use `output: 'server'` in astro.config.mjs.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Basic validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'A valid email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // In a real app, save to database or send to email service here.
    // For this demo, we just log and return success.
    console.log(`[Subscribe] New subscriber: ${name || 'Anonymous'} <${email}>`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Thanks for subscribing${name ? `, ${name}` : ''}!`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body. Expected JSON with { email, name }.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

import type { APIRoute } from 'astro';

import { buildLlmsText } from '../utilities/llms-text/index.ts';

/** Returns the curated LLM-readable index for the public portfolio. */
export const GET: APIRoute = () =>
  new Response(buildLlmsText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });

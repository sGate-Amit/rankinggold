import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();

  return new Response(JSON.stringify({
    success: true,
    received: body,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();

  const { name, email, subject, message } = data;

  console.log("📥 Form Submitted:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  return new Response(
    JSON.stringify({ success: true, message: 'Message received' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

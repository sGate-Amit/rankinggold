import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // You can't use console.log in live CF Workers, but it's fine locally
  console.log({ name, email, subject, message });

  return new Response(JSON.stringify({
    success: true,
    message: "Data received!",
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

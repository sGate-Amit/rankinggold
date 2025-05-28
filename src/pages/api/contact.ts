
// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject") || "New Contact Form Submission";
  const message = formData.get("message");
  // Set up your SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.zeptomail.in",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "arti.sharma@sgate.in",
      subject: subject.toString(),
      text: message?.toString(),
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
};

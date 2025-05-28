
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
      user: "emailapikey",
      pass: "PHtE6r0OSuG/gzMqoxQF46XtQsOiPIJ8+79kLlRBs4pHAvUDGU0A+d95kGLlqRgpBPRHRqSTzo1v4OiUt76MI2i4M2YfXWqyqK3sx/VYSPOZsbq6x00bt1kffkffU4TmcN9t0ifSud/dNA==",
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

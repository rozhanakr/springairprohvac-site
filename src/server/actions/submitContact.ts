"use server";

import { ContactSchema } from "@/lib/schema";
import { verifyTurnstile } from "@/server/turnstile";
import { Resend } from "resend";

export async function submitContact(formData: FormData): Promise<void> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("INVALID_INPUT", parsed.error.flatten());
    return;
  }

  const okCaptcha = await verifyTurnstile(parsed.data.turnstileToken);
  if (!okCaptcha) {
    console.error("FAILED_CAPTCHA");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "HVAC Website <noreply@yourdomain.com>",
      to: ["you@yourdomain.com"],
      subject: `New HVAC lead from ${parsed.data.name}`,
      html: `<pre>${JSON.stringify(parsed.data, null, 2)}</pre>`,
    });
  } catch (err) {
    console.error("Email send failed", err);
  }
}

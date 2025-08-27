"use server";

import { ContactSchema } from "@/lib/schema";
import { verifyTurnstile } from "@/server/turnstile";
import { Resend } from "resend";

export async function submitContact(formData: FormData) {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "INVALID_INPUT" };

  const okCaptcha = await verifyTurnstile(parsed.data.turnstileToken);
  if (!okCaptcha) return { ok: false, error: "FAILED_CAPTCHA" };

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "HVAC Website <noreply@yourdomain.com>",
    to: ["you@yourdomain.com"],
    subject: `New HVAC lead from ${parsed.data.name}`,
    html: `<pre>${JSON.stringify(parsed.data, null, 2)}</pre>`,
  });

  return { ok: true };
}

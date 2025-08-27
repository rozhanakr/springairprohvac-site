// src/server/turnstile.ts
export async function verifyTurnstile(token: string): Promise<boolean> {
  // In dev/preview, if no secret is set, skip verification
  if (!process.env.TURNSTILE_SECRET_KEY) return true;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token || "",
        }),
        cache: "no-store",
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return !!data?.success;
  } catch (err) {
    console.error("Turnstile verification failed", err);
    return false;
  }
}

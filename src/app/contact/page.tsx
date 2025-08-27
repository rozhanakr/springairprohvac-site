import { submitContact } from "@/server/actions/submitContact";

export default function ContactPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Contact</h1>
      <form action={submitContact} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" placeholder="you@email.com" type="email" required />
        <input name="phone" placeholder="Phone" required />
        <textarea name="message" placeholder="How can we help?" required rows={5} />
        <input type="hidden" name="turnstileToken" value="dev-token-123" />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

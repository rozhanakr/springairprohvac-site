import { z } from "zod";

const TurnstileToken =
  process.env.NODE_ENV === "production"
    ? z.string().min(10, "Captcha token too short")
    : z.string().min(1); // allow short tokens in dev/test

export const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required").max(20),
  message: z.string().min(10).max(2000),
  turnstileToken: TurnstileToken,
});

export type ContactInput = z.infer<typeof ContactSchema>;
export default ContactSchema;

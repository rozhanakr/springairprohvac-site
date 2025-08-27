import { describe, it, expect } from "vitest";
import { ContactSchema } from "@/lib/schema";

describe("ContactSchema", () => {
  it("validates a correct contact input", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "123456789",
      message: "Need AC service",
      turnstileToken: "dev-token",
    });
    expect(result.success).toBe(true);
  });

  it("fails when email is invalid", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Doe",
      email: "not-an-email",
      phone: "123456789",
      message: "Need AC service",
      turnstileToken: "dev-token",
    });
    expect(result.success).toBe(false);
  });
});

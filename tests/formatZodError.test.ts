import { describe, expect, it } from "vitest";
import { ZodError, z } from "zod";
import { formatZodError } from "../src/formatZodError";

const testSchema = z.object({
  email: z.string().email({
    message: "should be valid",
  }),
});

describe("formatZodError", () => {
  it("should format zod error", async () => {
    try {
      await testSchema.parseAsync({ email: "invalid email" });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(formatZodError(error)).toBe("email should be valid");
      }
    }
  });
});

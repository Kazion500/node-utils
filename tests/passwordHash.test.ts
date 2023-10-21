import { describe, expect, it } from "vitest";
import { comparePassword, hashPassword } from "../src/passwordHash";

describe("passwordHash", () => {
  it("should hash password", async () => {
    const password = "test-password";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
  });

  it("should compare password", async () => {
    const password = "test-password";
    const hashedPassword = await hashPassword(password);
    const isValid = await comparePassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it("should return false when password is invalid", async () => {
    const password = "test-password";
    const hashedPassword = await hashPassword(password);
    const isValid = await comparePassword("invalid-password", hashedPassword);
    expect(isValid).toBe(false);
  });
});

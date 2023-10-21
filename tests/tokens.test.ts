import { describe, expect, it } from "vitest";
import { createJWT, decodeJWT, verifyJWT } from "../src/tokens";

const testPayload = {
  id: "test-id",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("tokens", () => {
  it("should create", async () => {
    const token = await createJWT(testPayload.id, { secret: "test-secret" });
    expect(token).toBeDefined();
  });

  it("should decode", async () => {
    const token = await createJWT(testPayload.id, {
      secret: "test-secret",
    });
    const decoded = await decodeJWT(token);
    expect(decoded.uid).toBe(testPayload.id);
  });

  it("should verify", async () => {
    const token = await createJWT(testPayload.id, {
      secret: "test-secret",
      exp: "1s",
    });

    const payload = await verifyJWT(token, {
      secret: "test-secret",
    });

    expect(payload.uid).toBe(testPayload.id);
  });

  it("should throw error when secret is not provided", async () => {
    try {
      await createJWT(testPayload.id, { secret: "" });
    } catch (error) {
      expect(error.message).toBe("secret must be provided");
    }
  });

  it("should throw error when token is invalid", async () => {
    try {
      await decodeJWT("invalid-token");
    } catch (error) {
      expect(error.message).toBe("Invalid JWT");
    }
  });

  it("should throw error when token is expired", async () => {
    const token = await createJWT(testPayload.id, {
      secret: "test-secret",
      exp: "1s",
    });

    try {
      await sleep(1200);
      await verifyJWT(token, {
        secret: "test-secret",
      });
    } catch (error) {
      expect(error.message).toBe("JWT has expired");
    }
  });
});

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
    expect(() => createJWT(testPayload.id, { secret: "" })).rejects.toThrow(
      "secret must be provided"
    );
  });

  it("should throw error when token is invalid", async () => {
    expect(() => decodeJWT("invalid-token")).rejects.toThrowError();
  });

  it("should throw error when token is expired", async () => {
    const token = await createJWT(testPayload.id, {
      secret: "test-secret",
      exp: "1s",
    });

    await sleep(1200);
    expect(() =>
      verifyJWT(token, {
        secret: "test-secret",
      })
    ).rejects.toThrow("JWT has expired");
  });
});

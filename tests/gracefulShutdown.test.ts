import { describe, expect, it, vi } from "vitest";
import { gracefulShutdown } from "../src/gracefulShutdown";

const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];

const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
  return undefined as never;
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("gracefulShutdown", () => {
  it("should exit with code 0", async () => {
    gracefulShutdown(signalTraps, {
      development: false,
      services: [],
    });

    process.emit("SIGTERM", "SIGTERM");

    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should close all services", async () => {
    gracefulShutdown(signalTraps, {
      development: false,
      services: [
        {
          name: "test-service",
          stop: async () => Promise.resolve(),
        },
      ],
    });

    process.emit("SIGTERM", "SIGTERM");

    expect(mockExit).toHaveBeenCalledWith(0);
  });
});

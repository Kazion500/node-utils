import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  esbuild: {
    tsconfigRaw: "{}",
  },
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: [],
  },
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "src") }],
  },
});

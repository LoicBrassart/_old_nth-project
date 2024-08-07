import type { UserConfig } from "vitest/config";

import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};
export default defineConfig(config);

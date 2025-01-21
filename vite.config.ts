import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts", // 설정 파일 경로
  },
});

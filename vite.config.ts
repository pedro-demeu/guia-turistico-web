/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-expect-error
  test: {
    environment: 'happy-dom'
  },
});

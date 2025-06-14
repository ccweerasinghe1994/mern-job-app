/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@/types": resolve(__dirname, "./src/types"),
        "@/components": resolve(__dirname, "./src/components"),
        "@/pages": resolve(__dirname, "./src/pages"),
        "@/hooks": resolve(__dirname, "./src/hooks"),
        "@/utils": resolve(__dirname, "./src/utils"),
        "@/api": resolve(__dirname, "./src/api"),
        "@/assets": resolve(__dirname, "./src/assets"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

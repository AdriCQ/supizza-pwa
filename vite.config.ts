import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    viteCompression(),
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  // ts-paths
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});

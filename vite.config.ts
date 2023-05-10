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
      injectRegister: "auto",
      includeAssets: ["img/*.png", "img/*.svg", "icons/*.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "SuPizza",
        short_name: "SuPizza",
        description: "Pedidos de Pizza a domicilio",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  // ts-paths
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});

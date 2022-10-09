import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  //base: process.env.NODE_ENV === "production" ? "/dllas-explorer/" : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@data": fileURLToPath(new URL("./biastest/assets/data", import.meta.url)),
      "@result": fileURLToPath(new URL("./biastest/assets/result", import.meta.url)),
    },
  },
});

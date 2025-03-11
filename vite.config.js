import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL("src", import.meta.url)),
      components: fileURLToPath(new URL("src/components", import.meta.url)),
      store: fileURLToPath(new URL("src/store", import.meta.url)),
      utils: fileURLToPath(new URL("src/utils", import.meta.url)),
      data: fileURLToPath(new URL("src/data", import.meta.url)),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  server: {
    port: 8081,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});

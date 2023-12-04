import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies || {}),
    },
  },
  resolve: { alias: { src: resolve("src/") } },
  plugins: [dts()],
});

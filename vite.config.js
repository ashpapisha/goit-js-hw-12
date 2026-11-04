import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/goit-js-hw-12/",
  define: {
    global: "globalThis",
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
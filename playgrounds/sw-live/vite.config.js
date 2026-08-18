import { defineConfig } from "vite";

export default defineConfig({
  base: "/sw-live/",
  build: {
    outDir: "../../static/sw-live",
    emptyOutDir: true,
  },
});

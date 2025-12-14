import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "_redirects") {
            return "_redirects";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  closeBundle: () => {
    try {
      copyFileSync(
        resolve(__dirname, "public/_redirects"),
        resolve(__dirname, "build/client/_redirects")
      );
      console.log("✓ _redirects copied to build/client");
    } catch (err) {
      console.log("Info: _redirects copy skipped");
    }
  },
});

import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
    // omit
    server: {
        host: true,
        open: './example/example.html'
    },
    build: {
        lib: {
          entry: path.resolve(__dirname, "./index.js"),
          name: "D3CanvasNetworkgraph",
          formats: ["es","cjs"],
          fileName: (format) => `d3canvas-networkgraph.${format}.js`,
        },
        outDir: "./dist/",
        emptyOutDir: true,
      },
})
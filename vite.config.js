import reactRefresh from "@vitejs/plugin-react-refresh"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import reactJsx from "vite-react-jsx"
import { rollupPluginBundleStats } from "./src/rollup-plugin-bundle-stats"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactJsx(),
    rollupPluginBundleStats({ limit: 5 }),
    visualizer({ filename: "stats/index.html" }),
  ],
})

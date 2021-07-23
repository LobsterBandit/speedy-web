import reactRefresh from "@vitejs/plugin-react-refresh"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import reactJsx from "vite-react-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactJsx(),
    visualizer({ filename: "stats/index.html" }),
  ],
})

import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import image from "@astrojs/image"
import macrosPlugin from "vite-plugin-babel-macros"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), image()],
  vite: {
    plugins: [macrosPlugin()],
  },
})

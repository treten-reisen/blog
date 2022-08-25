import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import image from "@astrojs/image"
import macrosPlugin from "vite-plugin-babel-macros"
import { VitePWA } from "vite-plugin-pwa"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), image()],
  vite: {
    plugins: [
      macrosPlugin(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          scope: "https://treten.reisen/",
          name: `treten.reisen`,
          short_name: `treten.reisen`,
          start_url: `/`,
          theme_color: `#84CC16`,
          background_color: `#F4F4F5`,
          display: `minimal-ui`,
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  },
})

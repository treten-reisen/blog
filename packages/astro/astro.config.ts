import image from "@astrojs/image"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import AstroPWA from "@vite-pwa/astro"
import { defineConfig } from "astro/config"
import robots from "astro-robots-txt"
import sitemap, { EnumChangefreq } from "astro-sitemap"
import macrosPlugin from "vite-plugin-babel-macros"

console.log(process.env.NODE_ENV)

// https://astro.build/config
export default defineConfig({
  site: "https://treten.reisen/",
  integrations: [
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap({
      lastmod: new Date(),
      changefreq: EnumChangefreq.DAILY,
    }),
    robots(),
    AstroPWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: process.env.NODE_ENV === "development" ? "dist" : "src/service-worker",
      filename: process.env.NODE_ENV === "development" ? "service-worker.js" : "service-worker.ts",
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
        type: "module",
      },
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
  vite: {
    plugins: [macrosPlugin()],
  },
})

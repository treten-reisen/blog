import react from "@astrojs/react"
import { defineConfig } from "astro/config"
import tailwindcss from '@tailwindcss/vite'
import robots from "astro-robots-txt"
import sitemap, { EnumChangefreq } from "astro-sitemap"
import macrosPlugin from "vite-plugin-babel-macros"
import { VitePWA } from "vite-plugin-pwa"

// https://astro.build/config
export default defineConfig({
  site: "https://www.treten.reisen/",
  integrations: [
    react(),
    sitemap({
      lastmod: new Date(),
      changefreq: EnumChangefreq.DAILY,
    }),
    robots(),
  ],
  image: {
    domains: ["strapi.treten.reisen"],
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "https://strapi.treten.reisen",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      macrosPlugin(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          scope: "https://www.treten.reisen/",
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

/// <reference types="@astrojs/image/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly STRAPI_TOKEN: string
  readonly PUBLIC_MAPTILER_API_KEY: string
  readonly STRAPI_PUBLICATION_STATE: string
  readonly PUBLIC_STRAPI_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

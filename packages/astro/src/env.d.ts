/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly STRAPI_TOKEN: string
  readonly STRAPI_API_URL: string
  readonly MAPTILER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

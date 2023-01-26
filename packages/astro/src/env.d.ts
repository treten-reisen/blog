/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly STRAPI_TOKEN: string
  readonly STRAPI_API_URL: string
  readonly MAPTILER_API_KEY: string
  readonly STRAPI_PUBLICATION_STATE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

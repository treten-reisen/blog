/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly STRAPI_TOKEN: string
  readonly STRAPI_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

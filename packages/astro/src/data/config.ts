export const setAuthHeaders = (init: RequestInit = {}): RequestInit => {
  return import.meta.env.SSR
    ? {
        ...init,
        headers: { ...init.headers, Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
      }
    : init
}

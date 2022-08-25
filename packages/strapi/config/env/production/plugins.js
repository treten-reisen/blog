module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        bucketName: env("ASSET_BUCKET_NAME"),
        publicFiles: false,
        uniform: false,
        basePath: "",
      },
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
});

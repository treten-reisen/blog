module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        serviceAccount: env.json("GCS_SERVICE_ACCOUNT"),
        bucketName: env("ASSET_BUCKET_NAME"),
        publicFiles: true,
        uniform: true,
        basePath: "",
      },
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
})

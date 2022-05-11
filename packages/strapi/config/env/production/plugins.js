module.exports = {
  upload: {
    config: {
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        bucketName: "treten-reisen-strapi-provider",
        publicFiles: false,
        uniform: false,
        basePath: "",
      },
    },
  },
};

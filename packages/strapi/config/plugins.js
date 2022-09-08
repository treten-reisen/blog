module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  comments: {
    enabled: true,
    config: {
      enabledCollections: ["api::article.article"],
      moderatorRoles: ["Authenticated"],
      approvalFlow: [],
      entryLabel: {
        "api::article.article": ["Title"],
      },
    },
  },
});

module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  transfer: {
    token: {
      salt: env("API_TOKEN_SALT"),
    },
  },
})

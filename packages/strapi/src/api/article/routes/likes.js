module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/articles/:id/likes",
      handler: "article.like",
    },
    {
      method: "GET",
      path: "/articles/:id/likes",
      handler: "article.getLikes",
    },
  ],
}

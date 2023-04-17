module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/live-location",
      handler: "live-location.create",
    },
    {
      method: "GET",
      path: "/live-location/latest",
      handler: "live-location.latest",
    },
    {
      method: "GET",
      path: "/live-location/history",
      handler: "live-location.history",
    },
    {
      method: "GET",
      path: "/live-location/nights",
      handler: "live-location.nights",
    },
  ],
}

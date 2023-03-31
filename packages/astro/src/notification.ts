export const notifyMe = () => {
  if (!("Notification" in window)) {
    console.warn("Notifications not supported!")
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!", {
      //icon: "/android-chrome-192x192.png",
      image: "/android-chrome-192x192.png",
    })
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then(permission => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!", { icon: "/android-chrome-192x192.png" })
        // …
      }
    })
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

// eslint-disable-next-line import/no-unresolved
import { registerSW } from "virtual:pwa-register"

import { notifyMe } from "./notification"

console.log("start register")
registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl, registration) {
    console.log("SW registered: ", swScriptUrl)
    if (!registration) {
      console.warn("SW registration not available")
      return
    }
    periodic(registration)
  },
  onOfflineReady() {
    console.log("PWA application ready to work offline")
  },
})

notifyMe()

const periodic = async (registration: ServiceWorkerRegistration) => {
  console.log("doing periodic")
  if ("periodicSync" in registration) {
    const status = await navigator.permissions.query({
      // @ts-expect-error periodicsync is not included in the default SW interface.
      name: "periodic-background-sync",
    })

    if (status.state === "granted") {
      // @ts-expect-error periodicsync is not included in the default SW interface.
      await registration.periodicSync.register(UPDATE_CHECK, {
        minInterval: 24 * 60 * 60 * 1000,
      })
      console.log("periodic sync activated")
    }
  } else {
    console.warn("SW registration periodic sync not available")
  }
}

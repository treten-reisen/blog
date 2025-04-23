import { registerSW } from "virtual:pwa-register"

const updateSW = registerSW({
  onOfflineReady() {
    console.log("Offline ready")
  },
})

updateSW()

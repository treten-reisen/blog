import type { Locale } from "date-fns"
import de from "date-fns/locale/de/index.js"

const formatRelativeLocale = {
  lastWeek: "EEEE",
  yesterday: "'gestern'",
  today: "'heute'",
  tomorrow: "'morgen'",
  nextWeek: "'nächsten' EEEE",
  other: "dd'.' LLLL y",
}

export const dateFnsLocale: Locale = {
  ...de,
  formatRelative: (token: keyof typeof formatRelativeLocale) => formatRelativeLocale[token],
}

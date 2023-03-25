import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HeroMapOverlay = () => (
  <a className="absolute top-0 left-0 h-full w-full" href="/location">
    <div className="flex h-full items-center justify-end px-6 md:container sm:px-responsive">
      <div className="flex items-center gap-2 rounded-full bg-gray-700 bg-opacity-80 px-4 py-1 text-gray-100">
        <span className="hidden sm:inline">Aktueller Standort</span>
        <FontAwesomeIcon icon={solid("chevron-right")} />
      </div>
    </div>
  </a>
)

export default HeroMapOverlay

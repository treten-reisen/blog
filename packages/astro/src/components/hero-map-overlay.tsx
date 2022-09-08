import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HeroMapOverlay = () => (
  <a className="absolute w-full h-full top-0 left-0" href="/location">
    <div className="md:container px-6 sm:px-responsive flex h-full items-center justify-end">
      <div className="bg-gray-700 bg-opacity-80 rounded-full px-4 py-1 text-gray-100 flex items-center gap-2">
        <span className="hidden sm:inline">Aktueller Standort</span>
        <FontAwesomeIcon icon={solid("chevron-right")} />
      </div>
    </div>
  </a>
)

export default HeroMapOverlay

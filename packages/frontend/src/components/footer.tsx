import "twin.macro"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {
  return (
    <footer tw="bg-gray-700 text-gray-100">
      <div tw="md:container px-responsive py-4">
        <div tw="flex justify-between">
          <a href="/imprint">Impressum</a>
          <div>
            <FontAwesomeIcon icon={brands("instagram")} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

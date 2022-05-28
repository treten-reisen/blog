import "twin.macro"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGlobal } from "../hooks/use-global"

const Footer = () => {
  const { instagramLink } = useGlobal()

  return (
    <footer tw="bg-gray-700 text-gray-100">
      <div tw="md:container px-responsive py-4">
        <div tw="flex justify-between">
          <a href="/imprint">Impressum</a>
          <div tw="text-2xl">
            <a
              href={instagramLink}
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={brands("instagram")} />
              <span tw="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

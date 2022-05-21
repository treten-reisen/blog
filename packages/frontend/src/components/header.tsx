import { useHero } from "../hooks/use-hero"
import "twin.macro"

const Header = () => {
  const { logo } = useHero()

  return (
    <header tw="bg-gray-600">
      <div tw="px-responsive py-4 md:container">
        <a href="/">
          <img tw="h-6 self-start" src={logo.localFile.url} alt="Logo" />
        </a>
      </div>
    </header>
  )
}

export default Header

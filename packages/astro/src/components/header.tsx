export type HeaderProps = {
  logoUrl: string
}

const Header = ({ logoUrl }: HeaderProps) => {
  return (
    <header className="bg-gray-600">
      <div className="px-responsive py-4 md:container">
        <a href="/">
          <img className="h-6 self-start" src={logoUrl} alt="Logo" />
        </a>
      </div>
    </header>
  )
}

export default Header

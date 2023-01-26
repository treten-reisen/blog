import type { StrapiHero } from "../data/schema/hero.schema"
import "./hero.css"

export type HeroProps = {
  hero: StrapiHero
}

const Hero = ({ hero }: HeroProps) => {
  const { title, logo, image } = hero.attributes

  return (
    <header className="w-full bg-cover relative shadow-lg h-hero">
      <div className="w-full h-full absolute z-0">
        <img className="h-full w-full object-cover" src={image.src || undefined} alt={image.alt || undefined} />
      </div>
      <div className="w-full h-full absolute z-10 hero-shade" />
      <div className="w-full h-full absolute z-20">
        <div className="md:container px-responsive py-4 h-full flex flex-col items-stretch">
          <a href="/">
            <img className="h-6 self-start" src={logo.data.attributes.url} alt="Logo" />
          </a>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-gray-50 text-3xl font-bold font-sans tracking-tighter text-center">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero

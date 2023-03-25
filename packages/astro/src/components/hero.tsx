import type { StrapiHero } from "../data/schema/hero.schema"
import "./hero.css"

export type HeroProps = {
  hero: StrapiHero
}

const Hero = ({ hero }: HeroProps) => {
  const { title, logo, image } = hero.attributes

  return (
    <header className="relative h-hero w-full bg-cover shadow-lg">
      <div className="absolute z-0 h-full w-full">
        <img className="h-full w-full object-cover" src={image.src || undefined} alt={image.alt || undefined} />
      </div>
      <div className="hero-shade absolute z-10 h-full w-full" />
      <div className="absolute z-20 h-full w-full">
        <div className="flex h-full flex-col items-stretch px-responsive py-4 md:container">
          <a href="/">
            <img className="h-6 self-start" src={logo.data.attributes.url} alt="Logo" />
          </a>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-center font-sans text-3xl font-bold tracking-tighter text-gray-50">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero

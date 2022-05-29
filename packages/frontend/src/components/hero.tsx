import { GatsbyImage } from "gatsby-plugin-image"
import { styled } from "twin.macro"

import { useHero } from "../hooks/use-hero"

const Shade = styled.div`
  background: linear-gradient(
    180deg,
    rgba(75, 85, 99, 0.5) 0%,
    rgba(227, 227, 227, 0) 50.31%,
    rgba(75, 85, 99, 0.5) 100%
  );
`

const Hero = () => {
  const { title, logo, image } = useHero()

  return (
    <div tw="w-full bg-cover relative shadow-lg h-[clamp(15rem, 50vw, 40rem)]">
      <div tw="w-full h-full absolute z-0">
        <GatsbyImage
          objectFit="cover"
          image={image.localFile.childImageSharp.gatsbyImageData}
          alt={image.alternativeText}
          loading="eager"
          tw="h-full"
        />
      </div>
      <Shade tw="w-full h-full absolute z-10" />
      <div tw="w-full h-full absolute z-20">
        <div tw="md:container px-responsive py-4 h-full flex flex-col items-stretch">
          <a href="/">
            <img tw="h-6 self-start" src={logo.localFile.url} alt="Logo" />
          </a>
          <div tw="flex flex-1 items-center justify-center">
            <h1 tw="text-gray-50 text-3xl font-bold font-sans tracking-tighter text-center">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

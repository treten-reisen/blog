import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import tw, { styled } from "twin.macro"

export type HeroProps = {
  strapiHero: StrapiHero
}

const Container = styled.div<{ src: string }>`
  background: url(${props => props.src}) center center;
  height: clamp(200px, 25vw, 600px);
`

const Shade = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(227, 227, 227, 0) 50.31%,
    rgba(0, 0, 0, 0.5) 100%
  );
`

export const Hero = ({ strapiHero: { title, logo, image } }: HeroProps) => {
  return (
    <Container
      tw="w-full bg-cover relative shadow-lg"
      src={image.localFile.url}
    >
      <Shade tw="w-full h-full absolute z-0" />
      <div tw="w-full h-full absolute z-10 p-4">
        <div tw="container h-full mx-auto flex flex-col items-stretch">
          <img
            tw="h-6 self-start shadow-2xl"
            src={logo.localFile.url}
            alt="Logo"
          />
          <div tw="flex flex-1 items-center justify-center">
            <h1 tw="text-white text-3xl font-bold font-sans tracking-tighter shadow-2xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </Container>
  )
}

export type StrapiHero = {
  title: string
  logo: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: any
      }
      url: string
    }
    ext: string
  }
  image: {
    localFile: {
      url: string
    }
  }
}

export const query = graphql`
  fragment Hero on STRAPI_HERO {
    title
    logo {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
        url
      }
      ext
    }
    image {
      localFile {
        url
      }
    }
  }
`

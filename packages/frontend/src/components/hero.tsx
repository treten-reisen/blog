import { styled } from "twin.macro"
import { useHero } from "../hooks/use-hero"

const Container = styled.div<{ src: string }>`
  background: url(${props => props.src}) center center;
  height: clamp(200px, 50vw, 700px);
`

const Shade = styled.div`
  background: linear-gradient(
    180deg,
    rgba(75, 85, 99, 0.5) 0%,
    rgba(227, 227, 227, 0) 50.31%,
    rgba(75, 85, 99, 0.5) 100%
  );
`

export const Hero = () => {
  const { title, logo, image } = useHero()

  return (
    <Container
      tw="w-full bg-cover relative shadow-lg"
      src={image.localFile.url}
    >
      <Shade tw="w-full h-full absolute z-0" />
      <div tw="w-full h-full absolute z-10 p-4">
        <div tw="md:container h-full flex flex-col items-stretch">
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
    </Container>
  )
}

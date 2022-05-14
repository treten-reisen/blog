import { graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import "twin.macro"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div tw="flex justify-center py-8 md:py-responsive">
    <GatsbyImage
      image={data.file.localFile.childImageSharp.gatsbyImageData}
      alt={"test"}
    />
  </div>
)

export type StrapiBlockMedia = {
  file: {
    mime: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

export const query = graphql`
  fragment BlockMedia on STRAPI__COMPONENT_SHARED_MEDIA {
    file {
      mime
      localFile {
        childImageSharp {
          gatsbyImageData(width: 700)
        }
      }
    }
  }
`

export default StrapiMediaRenderer

import type { StrapiBlockEmbeddedMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockEmbeddedMedia
}

const StrapiEmbeddedMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div
    className="my-8 flex w-full max-w-prose justify-center md:my-responsive"
    dangerouslySetInnerHTML={{ __html: data.html }}
  ></div>
)

export default StrapiEmbeddedMediaRenderer

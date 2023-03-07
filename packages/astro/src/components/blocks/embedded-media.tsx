import type { StrapiBlockEmbeddedMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockEmbeddedMedia
}

const StrapiEmbeddedMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div
    className="flex justify-center my-8 md:my-responsive w-full max-w-prose font-serif"
    dangerouslySetInnerHTML={{ __html: data.html }}
  ></div>
)

export default StrapiEmbeddedMediaRenderer

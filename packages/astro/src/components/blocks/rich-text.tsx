import type { StrapiBlockRichText } from "../../data/schema/blocks.schema"

export type StrapiRichTextRendererProps = {
  data: StrapiBlockRichText
}

const StrapiRichTextRenderer = ({ data }: StrapiRichTextRendererProps) => (
  <div
    className="prose"
    dangerouslySetInnerHTML={{
      __html: data.html,
    }}
  />
)

export default StrapiRichTextRenderer

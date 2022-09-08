import type { StrapiBlockRichText } from "../../data/schema/blocks.schema"
import Article from "../article"

export type StrapiRichTextRendererProps = {
  data: StrapiBlockRichText
}

const StrapiRichTextRenderer = ({ data }: StrapiRichTextRendererProps) => <Article html={String(data.html)} />

export default StrapiRichTextRenderer

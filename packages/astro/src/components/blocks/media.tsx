import type { StrapiBlockMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div className="flex justify-center py-8 md:py-responsive w-full max-w-prose font-serif">
    <a className="cursor-zoom-in" href={data.file.src || undefined}>
      <img className="max-h-96" src={data.file.src || undefined} alt={data.file.alt || undefined} />
    </a>
  </div>
)

export default StrapiMediaRenderer

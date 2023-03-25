import type { StrapiBlockMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div className="my-8 flex w-full max-w-prose justify-center md:my-responsive">
    <a className="cursor-zoom-in" href={data.file.src || undefined}>
      <img className="max-h-96" src={data.file.src || undefined} alt={data.file.alt || undefined} />
    </a>
  </div>
)

export default StrapiMediaRenderer

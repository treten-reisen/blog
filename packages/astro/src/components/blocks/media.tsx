import type { StrapiBlockMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div className="flex justify-center py-8 md:py-responsive">
    <img src={data.file.data.attributes.url} alt={"test"} />
  </div>
)

export default StrapiMediaRenderer

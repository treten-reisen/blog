import type { StrapiBlockMediaGallery } from "../../data/schema/blocks.schema"
import MediaGallery from "../media-gallery/media-gallery"

export type StrapiMediaGalleryRendererProps = {
  data: StrapiBlockMediaGallery
}

const StrapiMediaGalleryRenderer = ({ data }: StrapiMediaGalleryRendererProps) => {
  return (
    <div className="my-8 h-96 w-full max-w-prose">
      <MediaGallery files={data.files} />
    </div>
  )
}

export default StrapiMediaGalleryRenderer

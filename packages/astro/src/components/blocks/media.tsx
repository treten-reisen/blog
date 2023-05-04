import type { StrapiBlockMedia } from "../../data/schema/blocks.schema"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => (
  <div className="my-8 flex w-full max-w-prose justify-center md:my-responsive">
    <a aria-label="Bild öffnen" className="cursor-zoom-in" href={data.file.htmlImage.src || undefined}>
      <figure className="flex flex-col items-center">
        <img
          className="max-h-96"
          src={data.file.htmlImage.src || undefined}
          alt={data.file.htmlImage.alt || undefined}
        />
        <figcaption className="mx-2 pt-2 font-sans italic text-gray-700">{data.file.attributes.caption}</figcaption>
      </figure>
    </a>
  </div>
)

export default StrapiMediaRenderer

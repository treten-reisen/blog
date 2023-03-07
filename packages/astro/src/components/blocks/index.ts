import type { StrapiBlockComponentName, StrapiBlockOfType } from "../../data/schema/blocks.schema"

import StrapiEmbeddedMediaRenderer from "./embedded-media"
import StrapiMediaRenderer from "./media"
import StrapiRichTextRenderer from "./rich-text"

export const componentsMap: {
  [key in StrapiBlockComponentName]: React.ComponentType<{
    data: StrapiBlockOfType<key>
  }>
} = {
  "shared.media": StrapiMediaRenderer,
  "shared.rich-text": StrapiRichTextRenderer,
  "shared.embedded-media": StrapiEmbeddedMediaRenderer,
}

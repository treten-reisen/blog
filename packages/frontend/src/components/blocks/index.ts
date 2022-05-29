import { graphql } from "gatsby"

import StrapiMediaRenderer, { StrapiBlockMedia } from "./media"
import StrapiRichTextRenderer, { StrapiBlockRichText } from "./rich-text"

export const componentsMap: {
  [key in StrapiBlockTypename]: React.ComponentType<{
    data: StrapiBlockOfType<key>
  }>
} = {
  STRAPI__COMPONENT_SHARED_RICH_TEXT: StrapiRichTextRenderer,
  STRAPI__COMPONENT_SHARED_MEDIA: StrapiMediaRenderer,
}

export type StrapiBlockUnion =
  | StrapiBlock<"STRAPI__COMPONENT_SHARED_RICH_TEXT", StrapiBlockRichText>
  | StrapiBlock<"STRAPI__COMPONENT_SHARED_MEDIA", StrapiBlockMedia>

export const StrapiBlocksFragment = graphql`
  fragment Blocks on STRAPI__COMPONENT_SHARED_MEDIASTRAPI__COMPONENT_SHARED_RICH_TEXTUnion {
    __typename
    ...BlockRichText
    ...BlockMedia
  }
`

export type StrapiBlock<N extends string, T> = {
  __typename: N
} & T

export type StrapiBlockTypename = StrapiBlockUnion["__typename"]

export type StrapiBlockOfType<N extends StrapiBlockTypename> =
  StrapiBlockUnion extends infer T
    ? T extends { __typename: N }
      ? T
      : never
    : never

export type StrapiBlocks = StrapiBlockUnion[]

export type { StrapiBlockMedia } from "./media"
export type { StrapiBlockRichText } from "./rich-text"

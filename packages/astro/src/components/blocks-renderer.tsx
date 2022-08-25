import type {
  StrapiBlock,
  StrapiBlockComponentName,
  StrapiBlockOfType,
} from "../data/schema/blocks.schema"
import { componentsMap } from "./blocks"

type BlockProps<T extends StrapiBlockComponentName> = {
  block: StrapiBlockOfType<T>
}

const Block = <T extends StrapiBlockComponentName>({
  block,
}: BlockProps<T>) => {
  const Component = componentsMap[block.__component] as React.ComponentType<{
    data: StrapiBlockOfType<T>
  }>

  if (!Component) {
    return null
  }

  return <Component data={block} />
}

export type BlocksRendererProps = {
  blocks: StrapiBlock[]
}

const BlocksRenderer = ({ blocks }: BlocksRendererProps) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${index}${block.__component}`} block={block} />
      ))}
    </div>
  )
}

export default BlocksRenderer

import {
  StrapiBlockOfType,
  StrapiBlockTypename,
  StrapiBlocks,
  componentsMap,
} from "./blocks"

type BlockProps<T extends StrapiBlockTypename> = {
  block: StrapiBlockOfType<T>
}

const Block = <T extends StrapiBlockTypename>({ block }: BlockProps<T>) => {
  const Component = componentsMap[block.__typename] as React.ComponentType<{
    data: StrapiBlockOfType<T>
  }>

  if (!Component) {
    return null
  }

  return <Component data={block} />
}

export type BlocksRendererProps = {
  blocks: StrapiBlocks
}

const BlocksRenderer = ({ blocks }: BlocksRendererProps) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${index}${block.__typename}`} block={block} />
      ))}
    </div>
  )
}

export default BlocksRenderer

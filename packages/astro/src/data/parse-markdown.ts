import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

const richTextProcessor = unified().use(remarkParse).use(remarkRehype).use(rehypeSlug).use(rehypeStringify)

export const markdownToHtml = (markdown: string) => richTextProcessor.process(markdown)

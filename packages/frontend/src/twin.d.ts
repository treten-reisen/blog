import "twin.macro"
import { css as cssImport } from "@emotion/react"
import styledImport from "@emotion/styled"

declare module "twin.macro" {
  // The styled and css imports
  export const styled: typeof styledImport
  export const css: typeof cssImport
}

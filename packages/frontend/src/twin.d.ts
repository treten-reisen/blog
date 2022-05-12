import "twin.macro"
import styledImport from "@emotion/styled"
import { css as cssImport } from "@emotion/react"

declare module "twin.macro" {
  // The styled and css imports
  export const styled: typeof styledImport
  export const css: typeof cssImport
}

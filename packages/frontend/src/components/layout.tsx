import { PropsWithChildren } from "react"
import { GlobalStyles, css } from "twin.macro"
import { Global } from "@emotion/react"

export type LayoutProps = PropsWithChildren<{}>

const Layout = ({ children }: LayoutProps) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <Global styles={css``} />
      <div>{children}</div>
    </div>
  )
}

export default Layout

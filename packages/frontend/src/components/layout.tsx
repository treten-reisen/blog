import { Global } from "@emotion/react"
import React, { PropsWithChildren } from "react"
import { GlobalStyles, css } from "twin.macro"

import Footer from "./footer"
import Header from "./header"

export type LayoutProps = PropsWithChildren<{
  header?: React.ReactNode
}>

const Layout = ({ children, header }: LayoutProps) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <Global styles={css``} />
      {header ? header : <Header />}
      <main tw="md:container p-6 sm:p-responsive flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

import React, { PropsWithChildren } from "react"
import { GlobalStyles, css } from "twin.macro"
import { Global } from "@emotion/react"
import Header from "./header"
import Footer from "./footer"

export type LayoutProps = PropsWithChildren<{
  header?: React.ReactNode
}>

const Layout = ({ children, header }: LayoutProps) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <Global styles={css``} />
      {header ? header : <Header />}
      <main tw="md:container py-6 sm:py-responsive px-responsive flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

import React from "react"
import { GlobalStyles } from "twin.macro"

const Layout = ({ children }) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <div>{children}</div>
    </div>
  )
}

export default Layout

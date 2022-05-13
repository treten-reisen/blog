import React from "react"
import { GlobalStyles, css } from "twin.macro"
import { Global } from "@emotion/react"

const Layout = ({ children }) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <Global
        styles={css`
          :root {
            font-size: 4.2vw;
          }
        `}
      />
      <div>{children}</div>
    </div>
  )
}

export default Layout

import React from "react"
import Footer from "./footer"
import Navbar from "./navbar"
import { GlobalStyles } from "twin.macro"

const Layout = ({ children }) => {
  return (
    <div tw="flex min-h-screen flex-col justify-between bg-gray-50 text-gray-900">
      <GlobalStyles />
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout

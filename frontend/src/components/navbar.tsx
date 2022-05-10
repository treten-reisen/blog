import { Link } from "gatsby"
import React from "react"
import "twin.macro"

const Navbar = () => {
  return (
    <header tw="bg-blue-200">
      <nav tw="container flex flex-row items-baseline justify-between py-6">
        <Link to="/" tw="text-xl font-medium">
          Blog
        </Link>
        <div tw="flex flex-row items-baseline justify-end">
          <Link tw="font-medium" to="/about">
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

import React from "react"
import "twin.macro"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer tw="mt-16 bg-gray-100 py-8 text-gray-700">
      <div tw="container">
        <p>Copyright {currentYear}</p>
      </div>
    </footer>
  )
}

export default Footer

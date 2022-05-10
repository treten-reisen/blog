import React from "react"
import "twin.macro"

const Headings = ({ title, description }) => {
  return (
    <header tw="container mt-8">
      <h1 tw="text-6xl font-bold text-gray-700">{title}</h1>
      {description && <p tw="mt-4 text-2xl text-gray-500">{description}</p>}
    </header>
  )
}

export default Headings

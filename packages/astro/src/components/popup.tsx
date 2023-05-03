import { useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"

export type PopupProps = React.PropsWithChildren<{
  x: number
  y: number
}>

const Popup = ({ children, x, y }: PopupProps) => {
  const anchor = useRef(document.createElement("div"))

  useEffect(() => {
    const anchorElement = anchor.current
    document.body.prepend(anchorElement)
    return () => {
      document.body.removeChild(anchorElement)
    }
  }, [])

  useLayoutEffect(() => {
    anchor.current.classList.add("text-gray-900")
    anchor.current.classList.add("font-sans")
    anchor.current.classList.add("text-sm")
    anchor.current.style.position = "absolute"
    anchor.current.style.zIndex = "99999"
    anchor.current.style.left = `${x}px`
    anchor.current.style.top = `${y}px`
    anchor.current.style.width = "0px"
    anchor.current.style.height = "0px"
    anchor.current.style.overflow = "visible"
    anchor.current.style.pointerEvents = "none"
  }, [x, y])

  return createPortal(children, anchor.current)
}

export default Popup

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import { useRef, useState } from "react"

import { useSizeListener } from "../../hooks/use-size-listener"

export type NavigationProps = {
  logoUrl: string
  currentUrl: string
  items: NavMenuItem[]
}

const Navigation = ({ logoUrl, currentUrl, items }: NavigationProps) => {
  const [isOpen, setOpen] = useState(false)

  const elRef = useRef<HTMLDivElement>(null)

  const widthRef = useRef(0)

  useSizeListener(elRef, ({ width }) => {
    if (widthRef.current != width) {
      widthRef.current = width
      setOpen(false)
    }
  })

  return (
    <div ref={elRef} className={classnames("fixed top-0 z-20 flex w-full flex-col", { "h-full": isOpen })}>
      <div
        className={classnames("h-14 bg-gray-700 bg-opacity-80 shadow-lg backdrop-blur-md", {
          "transition-colors duration-500": !isOpen,
        })}
      >
        <div
          role="img"
          aria-label="treten.reisen Logo"
          className="flex h-full items-center justify-between px-6 md:container md:px-8"
        >
          <a href="/" tabIndex={0} title="Zur Startseite">
            <img aria-label="treten.reisen Logo" className="h-6 self-start" src={logoUrl} alt="treten.reisen Logo" />
          </a>
          <button
            className="text-xl text-gray-200 hover:text-gray-50 md:hidden"
            title="Menü"
            onClick={() => {
              setOpen(open => !open)
            }}
          >
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
          </button>
          <div className="hidden md:block">
            <NavMenu orientation="horizontal" items={items} currentUrl={currentUrl} color="bright" />
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className={classnames("flex justify-end bg-gray-50 px-responsive py-6 text-right shadow-2xl md:container", {
              "text-lg": isOpen,
            })}
          >
            <NavMenu orientation="vertical" items={items} currentUrl={currentUrl} color="dark" />
          </div>
          <div className="z-50 flex-1 bg-gray-900 bg-opacity-20 backdrop-blur-lg"></div>
        </>
      )}
    </div>
  )
}

type NavMenuItem = {
  url: string
  label: string
  exact?: boolean
}

type NavMenuProps = {
  items: NavMenuItem[]
  currentUrl: string
  orientation: "vertical" | "horizontal"
  color: "dark" | "bright"
}

const NavMenu = ({ items, currentUrl, orientation, color }: NavMenuProps) => {
  return (
    <nav
      aria-label="Seitennavigation"
      className={classnames("font-sans tracking-tight", {
        "text-gray-200": color === "bright",
        "text-gray-600": color === "dark",
      })}
    >
      <ul
        className={classnames("flex gap-responsive-1/2", {
          "flex-col": orientation === "vertical",
          "flex-row": orientation === "horizontal",
        })}
      >
        {items.map(({ url, label, exact }) => (
          <li key={url}>
            <a
              className={classnames({
                "font-semibold": exact ? currentUrl === url : currentUrl.startsWith(url),
                "text-gray-50": color === "bright" && (exact ? currentUrl === url : currentUrl.startsWith(url)),
                "text-gray-900": color === "dark" && (exact ? currentUrl === url : currentUrl.startsWith(url)),
                "hover:text-gray-50": color === "bright",
                "hover:text-gray-900": color === "dark",
              })}
              href={url}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

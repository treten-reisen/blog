import { useState } from "react"

export type UseTransitionClassOptions = {
  onExit?: () => void
  onFinished?: () => void
}
export const useTransitionClass = (className: string, options?: UseTransitionClassOptions) => {
  const [animating, setAnimating] = useState<"enter" | "enter-active" | "exit" | "exit-active" | null>(null)

  const start = () => {
    setAnimating("enter")
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating("enter-active")
      })
    })
  }

  const end = () => {
    if (animating === "enter-active") {
      setAnimating("exit")
      requestAnimationFrame(() => {
        options?.onExit?.()
        requestAnimationFrame(() => {
          setAnimating("exit-active")
        })
      })
    }
    if (animating === "exit-active") {
      requestAnimationFrame(() => {
        setAnimating(null)
        setTimeout(() => options?.onFinished?.(), 0)
      })
    }
  }

  return {
    className: animating && `${className}__${animating}`,
    start,
    end,
  }
}

import { useCallback, useEffect, useMemo, useRef } from "react"

export const useSizeListener = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  cb: (size: { width: number; height: number }) => void
) => {
  const lastSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })

  const updateSize = useCallback(() => {
    const width = ref.current?.clientWidth || 0
    const height = ref.current?.clientHeight || 0
    if (width === lastSizeRef.current.width && height === lastSizeRef.current.height) return
    const size = { width, height }
    lastSizeRef.current = size
    cb(size)
  }, [cb, ref])

  const observer = useMemo(() => new ResizeObserver(updateSize), [updateSize])

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    observer.observe(el)
    return () => observer.unobserve(el)
  })
}

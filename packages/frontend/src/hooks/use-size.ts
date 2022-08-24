import React, { useCallback, useEffect, useMemo, useState } from "react"

export const useSize = <T extends HTMLElement>(ref: React.RefObject<T>) => {
  const [size, setSize] = useState<[number, number]>([0, 0])

  const updateSize = useCallback(() => {
    const width = ref.current?.clientWidth || 0
    const height = ref.current?.clientHeight || 0
    if (width !== size[0] || height !== size[1]) setSize([width, height])
  }, [ref, size])

  const observer = useMemo(() => new ResizeObserver(updateSize), [updateSize])

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    observer.observe(el)
    return () => observer.unobserve(el)
  })

  return size
}

"use client"

import { useEffect } from "react"

export function useGlobalStyles(css, id) {
  const injected = useRef(false)

  useEffect(() => {
    if (injected.current) return
    injected.current = true

    const style = document.createElement("style")
    style.id = id
    style.textContent = css
    document.head.appendChild(style)

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [css, id])
}
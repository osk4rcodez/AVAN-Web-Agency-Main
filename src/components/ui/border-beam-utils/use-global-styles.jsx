"use client"

import { useEffect } from "react"

export function useGlobalStyles(css, id) {
  useEffect(() => {
    if (typeof document === "undefined") return
    if (document.getElementById(id)) return

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
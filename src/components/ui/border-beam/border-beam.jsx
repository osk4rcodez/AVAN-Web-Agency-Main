"use client"

import { useEffect, useState } from "react"
import { useGlobalStyles } from "../border-beam-utils/use-global-styles"

const id = "border-beam"

const css = `
  @keyframes border-beam {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
  .border-beam {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 1.5rem;
    overflow: hidden;
  }
  .border-beam::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--border-beam-color),
      transparent
    );
    animation: border-beam var(--border-beam-duration) ease-in-out infinite;
    will-change: transform;
  }
  @media (prefers-reduced-motion: reduce) {
    .border-beam::before {
      animation: none;
      opacity: 0.3;
    }
  }
`

/**
 * @param {Object} props
 * @param {string} [props.color="#8B5CF6"]
 * @param {number} [props.duration=15]
 * @param {string} [props.className=""]
 * @param {number} [props.radius=24]
 */
export function BorderBeam({
  color = "#8B5CF6",
  duration = 15,
  className = "",
  radius = 24,
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useGlobalStyles(css, id)

  if (!mounted) return null

  return (
    <div
      className={`border-beam ${className}`}
      style={{
        borderRadius: `${radius}px`,
        "--border-beam-color": color,
        "--border-beam-duration": `${duration}s`,
      }}
    />
  )
}
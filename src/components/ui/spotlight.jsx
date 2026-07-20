import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '../../lib/motion-preference.jsx'

export function Spotlight({ className, size = 200, fill = '#8B5CF6', springOptions = { bounce: 0 } }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [parentElement, setParentElement] = useState(null)
  const { reduceMotion } = useMotionPreference()

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`)
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`)

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement
      if (parent) {
        parent.style.position = 'relative'
        parent.style.overflow = 'hidden'
        setParentElement(parent)
      }
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (!parentElement) return
    const { left, top } = parentElement.getBoundingClientRect()
    mouseX.set(event.clientX - left)
    mouseY.set(event.clientY - top)
  }, [mouseX, mouseY, parentElement])

  useEffect(() => {
    if (!parentElement) return
    if (reduceMotion) return

    const onEnter = () => setIsHovered(true)
    const onLeave = () => setIsHovered(false)

    parentElement.addEventListener('mousemove', handleMouseMove)
    parentElement.addEventListener('mouseenter', onEnter)
    parentElement.addEventListener('mouseleave', onLeave)

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove)
      parentElement.removeEventListener('mouseenter', onEnter)
      parentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [parentElement, handleMouseMove, reduceMotion])

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center, ${fill} 0%, ${fill}00 70%)`,
      }}
    />
  )
}
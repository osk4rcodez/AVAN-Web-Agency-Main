import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutGrid, Workflow, Users, Mail } from 'lucide-react'
import Logo from './Logo.jsx'
import { EASE, fadeDown } from './SectionReveal.jsx'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'

const links = [
  { label: 'Leistungen', href: '#leistungen', icon: LayoutGrid },
  { label: 'Ablauf', href: '#ablauf', icon: Workflow },
  { label: 'Über uns', href: '#ueber-uns', icon: Users },
  { label: 'Kontakt', href: '#kontakt', icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeDown}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-navy/5 bg-white/85 shadow-nav backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between lg:h-20">
        <a href="#top" className="shrink-0" aria-label="AVAN Web Agency — Startseite">
          <Logo />
        </a>

        <div className="hidden items-center md:flex">
          <nav className="menu-bar">
            {links.map((l) => {
              const Icon = l.icon
              return (
                <a key={l.href} href={l.href} className="menu-item group" aria-label={l.label}>
                  <Icon size={22} strokeWidth={2} />
                  <span className="menu-label">{l.label}</span>
                </a>
              )
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="#login"
            className="text-xs font-medium tracking-wide text-silver transition-colors hover:text-navy"
          >
            Login / Kundenbereich
          </a>
          <a href="#kontakt" className="inline-flex">
            <LiquidMetalButton label="Projekt starten" width={170} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-accent/10 md:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 bg-mist px-6 md:hidden"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              {links.map((l, i) => {
                const Icon = l.icon
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.05, ease: EASE }}
                    className="menu-item group"
                  >
                    <Icon size={22} strokeWidth={2} />
                    <span className="menu-label">{l.label}</span>
                  </motion.a>
                )
              })}
            </div>
            <a
              href="#login"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-silver"
            >
              Login / Kundenbereich
            </a>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-neon mt-2 text-base"
            >
              Projekt starten <ArrowUpRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

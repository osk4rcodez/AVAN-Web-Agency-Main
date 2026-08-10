import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, LayoutGrid, GalleryHorizontalEnd, Workflow, ListChecks, Users, Mail } from 'lucide-react'
import Logo from './Logo.jsx'
import { EASE, fadeDown } from '../lib/motion-variants.js'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import MotionToggle from './MotionToggle.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

const links = [
  { label: { de: 'Leistungen', en: 'Services', pl: 'Usługi' }, href: '#leistungen', icon: LayoutGrid },
  { label: { de: 'Showcase', en: 'Showcase', pl: 'Realizacje' }, href: '#showcase', icon: GalleryHorizontalEnd },
  { label: { de: 'Ablauf', en: 'Process', pl: 'Proces' }, href: '#ablauf', icon: Workflow },
  { label: { de: 'FAQ', en: 'FAQ', pl: 'FAQ' }, href: '#faq', icon: ListChecks },
  { label: { de: 'Über uns', en: 'About us', pl: 'O nas' }, href: '#ueber-uns', icon: Users },
  { label: { de: 'Kontakt', en: 'Contact', pl: 'Kontakt' }, href: '#kontakt', icon: Mail },
]

export default function Navbar({ pushedDown = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useTranslate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [open])

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeDown}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${pushedDown ? 'md:top-[47px]' : 'md:top-0'} ${
        open
          ? 'border-b border-transparent bg-white'
          : scrolled
            ? 'border-b border-navy/5 bg-white/85 shadow-nav backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px relative flex h-16 items-center justify-between lg:h-20">
        <a
          href="#top"
          className={`shrink-0 mx-auto translate-y-2 md:mx-0 md:translate-y-0 ${open ? 'invisible md:visible' : ''}`}
          aria-label="AVAN Web Agency — Startseite"
        >
          <div className="scale-110 md:scale-100">
            <Logo />
          </div>
        </a>

        <div className="hidden items-center md:flex">
          <nav className="menu-bar">
            {links.map((l) => {
              const Icon = l.icon
              return (
                <a key={l.href} href={l.href} className="menu-item group" aria-label={t(l.label)}>
                  <Icon size={22} strokeWidth={2} />
                  <span className="menu-label">{t(l.label)}</span>
                </a>
              )
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex xl:gap-5">
          <span
            className="hidden shrink-0 cursor-default whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent 2xl:inline-flex"
            title={t({ de: 'Login / Kundenbereich — bald verfügbar', en: 'Login / Client area — coming soon', pl: 'Logowanie / Panel klienta — wkrótce' })}
          >
            {t({ de: 'Login bald', en: 'Login soon', pl: 'Wkrótce' })}
          </span>
          <LanguageToggle />
          <div className="shrink-0">
            <MotionToggle />
          </div>
          <a href="#kontakt" className="inline-flex shrink-0" data-open-project-modal>
            <LiquidMetalButton label={t({ de: 'Projekt starten', en: 'Start Project', pl: 'Rozpocznij projekt' })} width={170} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-accent/10 md:hidden"
          aria-label={open ? t({ de: 'Menü schließen', en: 'Close menu', pl: 'Zamknij menu' }) : t({ de: 'Menü öffnen', en: 'Open menu', pl: 'Otwórz menu' })}
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
            className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 bg-white px-6 md:hidden"
          >
            <a href="#top" onClick={() => setOpen(false)} aria-label="AVAN Web Agency — Startseite">
              <Logo size={56} />
            </a>
            <div className="flex flex-col items-center gap-3">
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
                    <span className="menu-label">{t(l.label)}</span>
                  </motion.a>
                )
              })}
            </div>
            <a
              href="#kontakt"
              data-open-project-modal
              onClick={() => setOpen(false)}
              className="btn-neon mt-2 text-base"
            >
              {t({ de: 'Projekt starten', en: 'Start Project', pl: 'Rozpocznij projekt' })} <ArrowUpRight size={18} />
            </a>
            <MotionToggle />
            <LanguageToggle />
            <span className="inline-flex items-center gap-2 text-sm font-medium text-silver">
              {t({ de: 'Login / Kundenbereich', en: 'Login / Client area', pl: 'Logowanie / Panel klienta' })}
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
                {t({ de: 'Bald', en: 'Soon', pl: 'Wkrótce' })}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

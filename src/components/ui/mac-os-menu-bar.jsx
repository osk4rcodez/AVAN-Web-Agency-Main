import { useState, useEffect, useRef, useCallback } from 'react'
import { useMotionPreference } from '../../lib/motion-preference.jsx'
import { useTranslate } from '../../lib/language-preference.jsx'

// Jeder Menuepunkt bildet eine echte Aktion auf der Seite ab statt nur
// macOS-Optik nachzuahmen — Punkte ohne sinnvolle Entsprechung (Undo/Redo/
// Cut/Paste u.ae.) lassen wir komplett weg, statt totes UI vorzutaeuschen.
// Die Top-Level-Kategorien (File/View/Window/Help) bleiben bewusst englisch
// — das ist die macOS-Konvention, die diese Leiste nachahmt.
const DEFAULT_MENUS = [
  {
    label: 'File',
    items: [
      { label: { de: 'Projekt starten', en: 'Start project', pl: 'Rozpocznij projekt' }, action: 'open-project-modal' },
      { label: { de: 'Termin vereinbaren', en: 'Schedule appointment', pl: 'Umów termin' }, action: 'open-appointment-modal' },
      { type: 'separator' },
      { label: { de: 'Seite drucken', en: 'Print page', pl: 'Drukuj stronę' }, action: 'print', shortcut: '⌘P' },
    ],
  },
  {
    label: 'View',
    items: [
      { label: { de: 'Zu Leistungen', en: 'To services', pl: 'Do usług' }, action: 'scroll-leistungen' },
      { label: { de: 'Zu Showcase', en: 'To showcase', pl: 'Do realizacji' }, action: 'scroll-showcase' },
      { type: 'separator' },
      { label: { de: 'Vollbild', en: 'Full screen', pl: 'Pełny ekran' }, action: 'fullscreen', shortcut: '⌃⌘F' },
    ],
  },
  {
    label: 'Window',
    items: [{ label: { de: 'Nach oben scrollen', en: 'Scroll to top', pl: 'Przewiń do góry' }, action: 'scroll-top', shortcut: '⌘M' }],
  },
  {
    label: 'Help',
    items: [{ label: { de: 'App-Hilfe', en: 'App help', pl: 'Pomoc aplikacji' }, action: 'app-help' }],
  },
]

function buildAvanMenuItems(reduceMotion) {
  return [
    { label: { de: 'Über AVAN', en: 'About AVAN', pl: 'O AVAN' }, action: 'scroll-about' },
    { type: 'separator' },
    { label: { de: 'Kontakt aufnehmen', en: 'Get in touch', pl: 'Skontaktuj się' }, action: 'open-project-modal' },
    { type: 'separator' },
    {
      label: reduceMotion
        ? { de: 'Animationen einschalten', en: 'Turn animations on', pl: 'Włącz animacje' }
        : { de: 'Animationen ausschalten', en: 'Turn animations off', pl: 'Wyłącz animacje' },
      action: 'toggle-motion',
    },
  ]
}

function scrollToId(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.()
  else document.documentElement.requestFullscreen?.()
}

function MenuDropdown({ isOpen, onClose, items, position, onAction, t }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) onClose()
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute backdrop-blur-md z-[60]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'rgba(40, 40, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        minWidth: '220px',
        animation: 'menuFadeIn 0.15s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      }}
    >
      <div className="py-1">
        {items.map((item, index) =>
          item.type === 'separator' ? (
            <div key={index} className="h-px bg-white/15 mx-2 my-1" />
          ) : (
            <div
              key={index}
              className="px-4 py-1 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors duration-100 flex justify-between items-center"
              onClick={() => {
                if (item.action) onAction?.(item.action)
                onClose()
              }}
            >
              <span>{t(item.label)}</span>
              {item.shortcut && <span className="text-xs text-white/60 ml-4">{item.shortcut}</span>}
            </div>
          )
        )}
      </div>
    </div>
  )
}

// macOS-artige Menuleiste: transparent, Live-Uhr, AVAN-Menue +
// File/View/Window/Help-Dropdowns. Jeder Punkt loest eine echte Aktion aus.
export default function MacOSMenuBar({ appName = 'Finder', menus = DEFAULT_MENUS, onMenuAction, className = '' }) {
  const [currentTime, setCurrentTime] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
  const { reduceMotion, toggleMotion } = useMotionPreference()
  const t = useTranslate()

  const avanLogoRef = useRef(null)
  const menuRefs = useRef({})

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }))
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleAvanMenuClick = useCallback(() => {
    if (activeMenu === 'avan') {
      setActiveMenu(null)
    } else {
      if (avanLogoRef.current) {
        const rect = avanLogoRef.current.getBoundingClientRect()
        const parentRect = avanLogoRef.current.offsetParent?.getBoundingClientRect() || { left: 0 }
        setDropdownPosition({ x: rect.left - parentRect.left, y: 34 })
      }
      setActiveMenu('avan')
    }
  }, [activeMenu])

  const handleMenuItemClick = useCallback(
    (menuLabel) => {
      if (activeMenu === menuLabel) {
        setActiveMenu(null)
      } else {
        const menuRef = menuRefs.current[menuLabel]
        if (menuRef) {
          const rect = menuRef.getBoundingClientRect()
          const parentRect = menuRef.offsetParent?.getBoundingClientRect() || { left: 0 }
          setDropdownPosition({ x: rect.left - parentRect.left, y: 34 })
          setActiveMenu(menuLabel)
        }
      }
    },
    [activeMenu]
  )

  const closeDropdown = useCallback(() => setActiveMenu(null), [])

  const handleMenuAction = useCallback(
    (action) => {
      switch (action) {
        case 'open-project-modal':
          window.dispatchEvent(new CustomEvent('open-project-modal'))
          break
        case 'open-appointment-modal':
          window.dispatchEvent(new CustomEvent('open-appointment-modal'))
          break
        case 'app-help':
          window.dispatchEvent(new CustomEvent('open-project-modal'))
          break
        case 'scroll-about':
          scrollToId('#ueber-uns')
          break
        case 'scroll-leistungen':
          scrollToId('#leistungen')
          break
        case 'scroll-showcase':
          scrollToId('#showcase')
          break
        case 'scroll-top':
          window.scrollTo({ top: 0, behavior: 'smooth' })
          break
        case 'fullscreen':
          toggleFullscreen()
          break
        case 'print':
          window.print()
          break
        case 'toggle-motion':
          toggleMotion()
          break
        default:
          break
      }
      onMenuAction?.(action)
    },
    [onMenuAction, toggleMotion]
  )

  return (
    <div style={{ position: 'relative' }}>
      <div className={`backdrop-blur-md ${className}`} style={{ height: '32px', background: 'transparent' }}>
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-4">
            <div ref={avanLogoRef} onClick={handleAvanMenuClick} className="cursor-pointer hover:opacity-80 transition-opacity duration-150">
              <img src="/avan-logo-mark.png" alt="AVAN" style={{ height: 17, width: 'auto', display: 'block' }} />
            </div>
            <span className="text-white text-sm font-semibold">{appName}</span>
            <div className="flex items-center space-x-6">
              {menus.map((menu) => (
                <span
                  key={menu.label}
                  ref={(el) => { menuRefs.current[menu.label] = el }}
                  className="text-white text-sm cursor-pointer hover:opacity-80 transition-opacity duration-150 select-none"
                  onClick={() => handleMenuItemClick(menu.label)}
                >
                  {menu.label}
                </span>
              ))}
            </div>
          </div>
          <span className="text-white text-sm font-medium select-none ml-1 cursor-pointer hover:opacity-80 transition-opacity duration-150">
            {currentTime}
          </span>
        </div>
      </div>

      <MenuDropdown isOpen={activeMenu === 'avan'} onClose={closeDropdown} items={buildAvanMenuItems(reduceMotion)} position={dropdownPosition} onAction={handleMenuAction} t={t} />
      {menus.map((menu) => (
        <MenuDropdown key={menu.label} isOpen={activeMenu === menu.label} onClose={closeDropdown} items={menu.items} position={dropdownPosition} onAction={handleMenuAction} t={t} />
      ))}
    </div>
  )
}

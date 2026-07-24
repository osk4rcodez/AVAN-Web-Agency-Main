import { useState, useEffect, useRef, useCallback } from 'react'

const DEFAULT_MENUS = [
  {
    label: 'File',
    items: [
      { label: 'New Tab', action: 'new-tab', shortcut: '⌘T' },
      { label: 'New Window', action: 'new-window', shortcut: '⌘N' },
      { type: 'separator' },
      { label: 'Open File...', action: 'open-file', shortcut: '⌘O' },
      { type: 'separator' },
      { label: 'Print...', action: 'print', shortcut: '⌘P' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', action: 'undo', shortcut: '⌘Z' },
      { label: 'Redo', action: 'redo', shortcut: '⇧⌘Z' },
      { type: 'separator' },
      { label: 'Cut', action: 'cut', shortcut: '⌘X' },
      { label: 'Copy', action: 'copy', shortcut: '⌘C' },
      { label: 'Paste', action: 'paste', shortcut: '⌘V' },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'as Icons', action: 'view-icons', shortcut: '⌘1' },
      { label: 'as List', action: 'view-list', shortcut: '⌘2' },
      { type: 'separator' },
      { label: 'Enter Full Screen', action: 'fullscreen', shortcut: '⌃⌘F' },
    ],
  },
  {
    label: 'Window',
    items: [
      { label: 'Minimize', action: 'minimize', shortcut: '⌘M' },
      { label: 'Zoom', action: 'zoom' },
    ],
  },
  {
    label: 'Help',
    items: [{ label: 'App Help', action: 'app-help' }],
  },
]

const APPLE_MENU_ITEMS = [
  { label: 'About This Mac', action: 'about' },
  { type: 'separator' },
  { label: 'System Preferences...', action: 'preferences' },
  { type: 'separator' },
  { label: 'Sleep', action: 'sleep' },
  { label: 'Restart...', action: 'restart' },
  { label: 'Shut Down...', action: 'shutdown' },
]

function MenuDropdown({ isOpen, onClose, items, position, onAction }) {
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
              <span>{item.label}</span>
              {item.shortcut && <span className="text-xs text-white/60 ml-4">{item.shortcut}</span>}
            </div>
          )
        )}
      </div>
    </div>
  )
}

// macOS-artige Menuleiste: transparent, Live-Uhr, Apple-Menue +
// Datei/Edit/View/Window/Help-Dropdowns. Rein dekorativ.
export default function MacOSMenuBar({ appName = 'Finder', menus = DEFAULT_MENUS, onMenuAction, className = '' }) {
  const [currentTime, setCurrentTime] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })

  const appleLogoRef = useRef(null)
  const menuRefs = useRef({})

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleAppleMenuClick = useCallback(() => {
    if (activeMenu === 'apple') {
      setActiveMenu(null)
    } else {
      if (appleLogoRef.current) {
        const rect = appleLogoRef.current.getBoundingClientRect()
        const parentRect = appleLogoRef.current.offsetParent?.getBoundingClientRect() || { left: 0 }
        setDropdownPosition({ x: rect.left - parentRect.left, y: 34 })
      }
      setActiveMenu('apple')
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
  const handleMenuAction = useCallback((action) => onMenuAction?.(action), [onMenuAction])

  return (
    <div style={{ position: 'relative' }}>
      <div className={`backdrop-blur-md ${className}`} style={{ height: '32px', background: 'transparent' }}>
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-4">
            <div ref={appleLogoRef} onClick={handleAppleMenuClick} className="cursor-pointer hover:opacity-80 transition-opacity duration-150">
              <svg width="15" height="19" viewBox="0 0 110 140" fill="white" style={{ display: 'block' }}>
                <path d="M0 0 C5.58236403 2.09904125 9.60467483 0.88914551 14.97265625 -1.09375 C24.52115711 -4.439908 34.11309717 -4.54862597 43.35546875 -0.23046875 C48.12396107 2.4076135 50.86575425 5.08527779 53.41015625 9.90625 C52.35828125 10.69 51.30640625 11.47375 50.22265625 12.28125 C44.71078889 17.03285979 41.56508326 23.28635633 40.47265625 30.46875 C40.03168138 38.29605399 41.87292643 44.10920342 46.82421875 50.18359375 C49.69950343 53.3067478 52.89615914 55.56358526 56.41015625 57.90625 C53.62981681 69.36905295 47.16852412 82.51930379 37.16015625 89.40625 C32.57853571 91.90531575 28.55304343 92.53884155 23.41015625 91.90625 C21.37403354 91.28785199 19.35323208 90.61750058 17.34765625 89.90625 C8.57237805 86.84256185 3.23794872 88.20952158 -5.43359375 91.00390625 C-10.61364364 92.48483636 -14.47478385 92.64004629 -19.65234375 90.84375 C-33.68747534 81.58653555 -41.78781841 64.33028781 -45.19067383 48.33569336 C-47.46721739 34.48010623 -46.65131557 19.75938694 -38.46484375 8.03125 C-28.23499655 -4.14713952 -14.17528672 -5.71090688 0 0 Z" transform="translate(45.58984375,33.09375)" />
                <path d="M0 0 C0.57231958 7.72631433 -0.96546021 14.10973315 -5.80078125 20.30859375 C-10.93255592 25.73930675 -15.29387058 28.82351765 -22.9375 29.1875 C-23.948125 29.125625 -24.95875 29.06375 -26 29 C-26.59493662 20.81962143 -24.35167303 14.76774508 -19.375 8.25 C-14.46051828 2.89895264 -7.38077314 -0.97115436 0 0 Z" transform="translate(76,0)" />
              </svg>
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

      <MenuDropdown isOpen={activeMenu === 'apple'} onClose={closeDropdown} items={APPLE_MENU_ITEMS} position={dropdownPosition} onAction={handleMenuAction} />
      {menus.map((menu) => (
        <MenuDropdown key={menu.label} isOpen={activeMenu === menu.label} onClose={closeDropdown} items={menu.items} position={dropdownPosition} onAction={handleMenuAction} />
      ))}
    </div>
  )
}

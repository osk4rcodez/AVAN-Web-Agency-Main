import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'avan-language'
export const LANGUAGES = ['de', 'en', 'pl']

const LanguageContext = createContext(null)

// Beim allerersten Besuch (kein gespeicherter Wert) aus der Browser-Sprache
// raten: Polnisch -> pl, Deutsch -> de, alles andere -> en. Sobald der
// Nutzer manuell umschaltet, wird das per setLanguage() dauerhaft gespeichert
// und diese Erkennung nie wieder aufgerufen.
function detectLanguageFromBrowser() {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of candidates) {
    const primary = raw?.slice(0, 2).toLowerCase()
    if (primary === 'pl') return 'pl'
    if (primary === 'de') return 'de'
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'de'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(stored)) return stored
    return detectLanguageFromBrowser()
  })

  function setLanguage(next) {
    if (!LANGUAGES.includes(next)) return
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  // Behalten fuer bestehende Aufrufer: springt zur naechsten Sprache im Zyklus.
  function toggleLanguage() {
    const next = LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length]
    setLanguage(next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return { language: 'de', setLanguage: () => {}, toggleLanguage: () => {} }
  }
  return ctx
}

export function useTranslate() {
  const { language } = useLanguage()
  return (strings) => strings[language] ?? strings.de
}

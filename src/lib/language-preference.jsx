import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'avan-language'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'de'
    return window.localStorage.getItem(STORAGE_KEY) || 'de'
  })

  function toggleLanguage() {
    const next = language === 'de' ? 'en' : 'de'
    setLanguage(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return { language: 'de', toggleLanguage: () => {} }
  }
  return ctx
}

export function useTranslate() {
  const { language } = useLanguage()
  return (strings) => strings[language] ?? strings.de
}

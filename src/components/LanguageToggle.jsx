import { useLanguage } from '../lib/language-preference.jsx'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="relative inline-flex h-9 rounded-lg bg-navy/5 p-0.5">
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
        className="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:z-[5] after:w-1/2 after:rounded-md after:bg-white after:shadow-[0_0_6px_rgba(46,26,71,0.05),0_2px_6px_rgba(46,26,71,0.1)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=de]:after:translate-x-0 data-[state=en]:after:translate-x-full"
        data-state={language}
      >
        <span className={`relative z-10 inline-flex h-full min-w-8 items-center justify-center whitespace-nowrap px-4 transition-colors ${language === 'de' ? 'text-navy' : 'text-ink/50'}`}>DE</span>
        <span className={`relative z-10 inline-flex h-full min-w-8 items-center justify-center whitespace-nowrap px-4 transition-colors ${language === 'en' ? 'text-navy' : 'text-ink/50'}`}>EN</span>
      </button>
    </div>
  )
}

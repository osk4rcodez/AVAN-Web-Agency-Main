import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx'
import { useLanguage } from '../lib/language-preference.jsx'

const OPTIONS = [
  { value: 'de', label: 'DE' },
  { value: 'en', label: 'EN' },
  { value: 'pl', label: 'PL' },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative inline-flex h-9 rounded-lg bg-navy/5 p-0.5">
      <RadioGroup
        value={language}
        onValueChange={(next) => {
          if (next !== language) setLanguage(next)
        }}
        className="group relative inline-grid grid-cols-[1fr_1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:z-[5] after:w-1/3 after:rounded-md after:bg-white after:shadow-[0_0_6px_rgba(46,26,71,0.05),0_2px_6px_rgba(46,26,71,0.1)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=de]:after:translate-x-0 data-[state=en]:after:translate-x-full data-[state=pl]:after:translate-x-[200%]"
        data-state={language}
      >
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3 transition-colors ${
              language === opt.value ? 'text-navy' : 'text-ink/50'
            }`}
          >
            {opt.label}
            <RadioGroupItem id={`lang-${opt.value}`} value={opt.value} className="sr-only" />
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}

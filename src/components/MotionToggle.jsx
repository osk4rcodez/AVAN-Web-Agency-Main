import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx'
import { useMotionPreference } from '../lib/motion-preference.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

export default function MotionToggle({ large = false }) {
  const { reduceMotion, toggleMotion } = useMotionPreference()
  const t = useTranslate()
  const state = reduceMotion ? 'off' : 'on'

  return (
    <div className={`relative inline-flex rounded-lg bg-navy/5 p-0.5 ${large ? 'h-9 sm:h-11' : 'h-9'}`}>
      <RadioGroup
        value={state}
        onValueChange={(next) => {
          if (next !== state) toggleMotion()
        }}
        className={`group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 font-medium after:absolute after:inset-y-0 after:z-[5] after:w-1/2 after:rounded-md after:bg-white after:shadow-[0_0_6px_rgba(46,26,71,0.05),0_2px_6px_rgba(46,26,71,0.1)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-accent/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full ${
          large ? 'text-sm sm:text-base sm:font-bold' : 'text-sm'
        }`}
        data-state={state}
      >
        <label
          className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap transition-colors text-ink/50 group-data-[state=on]:text-ink/50 group-data-[state=off]:text-navy ${
            large ? 'px-4 sm:px-6' : 'px-4'
          }`}
        >
          {t({ de: 'Aus', en: 'Off', pl: 'Wył' })}
          <RadioGroupItem id="motion-off" value="off" className="sr-only" />
        </label>
        <label
          className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap transition-colors text-ink/50 group-data-[state=off]:text-ink/50 group-data-[state=on]:text-navy ${
            large ? 'px-4 sm:px-6' : 'px-4'
          }`}
        >
          {t({ de: 'An', en: 'On', pl: 'Wł' })}
          <RadioGroupItem id="motion-on" value="on" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  )
}

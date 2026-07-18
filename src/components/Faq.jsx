import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { EASE, fadeUp, stagger } from './SectionReveal.jsx'

const faqs = [
  {
    q: 'Was genau macht AVAN für mich?',
    a: 'Wir konzipieren, bauen und betreiben Ihre Website — von der ersten Idee über Design und Entwicklung bis zu Hosting, Pflege und Support. Sie bekommen alles aus einer Hand und sprechen dabei direkt mit den Gründern, nicht mit einer anonymen Hotline.',
  },
  {
    q: 'Wie läuft der Ablauf ab?',
    a: 'In vier Schritten: Erstgespräch, Konzept & Design, Entwicklung & Launch, danach laufende Betreuung. Sie sehen das Konzept, bevor wir entwickeln, und bleiben auch nach dem Live-Gang an Bord.',
  },
  {
    q: 'Wie schnell ist meine Website online?',
    a: 'Das hängt vom Umfang ab. Eine schlanke Website ist oft innerhalb weniger Wochen live; umfangreichere Projekte planen wir gemeinsam im Erstgespräch terminlich ein.',
  },
  {
    q: 'Was kostet eine Website bei euch?',
    a: 'Wir arbeiten mit klaren, Festpreis-Angeboten — keine versteckten Kosten. Die genaue Summe stimmen wir im persönlichen Gespräch ab, passend zu Ihrem Vorhaben.',
  },
  {
    q: 'Was ist nach dem Launch enthalten?',
    a: 'Hosting, Updates, Sicherheits-Checks und Support. Wir kümmern uns laufend um den Betrieb, damit Sie sich auf Ihr Geschäft konzentrieren können.',
  },
  {
    q: 'Kann ich meine Inhalte später selbst ändern?',
    a: 'Ja. Wir übergeben Ihnen eine leicht bedienbare Lösung und erklären Ihnen das Nötigste — und wenn Sie lieber wollen, dass wir die Pflege übernehmen, machen wir das.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mist/40"
      >
        <span className="text-base font-semibold text-navy">{item.q}</span>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent transition-colors ${
            isOpen ? 'bg-accent text-white' : 'bg-white'
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section id="faq" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Häufige Fragen.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            Das Wichtigste zu Ablauf, Kosten und Betreuung — kurz zusammengefasst.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.06)}
          className="mt-12 grid gap-4 lg:grid-cols-2"
        >
          {faqs.map((item, i) => (
            <motion.div key={item.q} variants={fadeUp}>
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

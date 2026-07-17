import { motion } from 'framer-motion'
import { EASE } from './SectionReveal.jsx'

function Section({ n, title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-navy">
        {n}. {title}
      </h2>
      <div className="mt-3 leading-relaxed text-ink/80">{children}</div>
    </section>
  )
}

export default function Barrierefreiheit() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="container-px mx-auto max-w-3xl py-28"
    >
      <h1 className="font-display text-3xl font-extrabold tracking-tightest text-navy sm:text-4xl">
        Erklärung zur Barrierefreiheit
      </h1>

      <p className="mt-4 text-ink/80">
        AVAN Web Agency verpflichtet sich, ihre Website im Einklang mit dem
        Barrierefreiheitsstärkungsgesetz (BFSG) und den Web Content Accessibility Guidelines (WCAG)
        2.1, Konformitätsstufe AA, barrierefrei zugänglich zu machen.
      </p>

      <Section n={1} title="Stand der Umsetzung">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Kontraste von Fließtext und Hintergrund entsprechen mindestens 4.5:1.</li>
          <li>Alle Funktionen sind vollständig mit der Tastatur bedienbar.</li>
          <li>Bilder erhalten Alternativtexte (Alt-Attribute); Überschriften sind hierarchisch (h1–h6) strukturiert.</li>
          <li>Formulare verwenden zugeordnete Labels und von Screenreadern erkannte Fehlermeldungen.</li>
          <li>Die Seite ist responsiv und bis 200% Zoom ohne Verlust der Funktion nutzbar.</li>
        </ul>
      </Section>

      <Section n={2} title="Nicht vollständig barrierefreie Inhalte">
        <p>
          [Beschreiben Sie hier bekannte Einschränkungen, z. B. ältere Dokumente oder Drittanbieter-
          Inhalte, sofern vorhanden.]
        </p>
      </Section>

      <Section n={3} title="Feedback und Kontakt">
        <p>
          Ihnen ist eine Barriere aufgefallen? Kontaktieren Sie uns:
          <br />
          E-Mail: avanwebagency@gmail.com
          <br />
          [ANSCHRIFT EINFÜGEN]
        </p>
        <p className="mt-3">
          Sie können sich zudem an die für die Durchsetzung des BFSG zuständige Stelle wenden, wenn
          Ihre Rückmeldung nicht befriedigend beantwortet wurde.
        </p>
      </Section>

      <p className="mt-8 text-sm text-ink/60">
        Diese Erklärung wurde am [DATUM EINFÜGEN] erstellt. Sie ist speicher- und druckbar und
        wird bei Änderungen der Website regelmäßig überprüft und aktualisiert.
      </p>

      <a href="#top" className="mt-8 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück zur Startseite
      </a>
    </motion.main>
  )
}

import { motion } from 'framer-motion'
import { EASE } from '../lib/motion-variants.js'
import { Printer } from 'lucide-react'

function AddressPlaceholder() {
  return (
    <span className="rounded bg-yellow-200 px-1.5 py-0.5 font-medium italic text-yellow-900">
      [ANSCHRIFT EINFÜGEN]
    </span>
  )
}

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

export default function AGB() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="container-px mx-auto max-w-3xl py-28"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold tracking-tightest text-navy sm:text-4xl">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
        >
          <Printer size={16} /> Als PDF speichern / drucken
        </button>
      </div>

      <p className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        Hinweis: Dieser Text ist eine strukturelle Vorlage, kein Rechtsrat. Die finalen AGB müssen
        vor dem Live-Gang anwaltlich geprüft werden (insbesondere Widerrufsbelehrung und
        Muster-Widerrufsformular bei B2C).
      </p>

      <Section n={1} title="Vertragsschluss">
        <p>
          Die Darstellung der Leistungen auf der Website stellt noch kein rechtlich bindendes
          Angebot dar. Ein Vertrag kommt erst durch unsere ausdrückliche Auftragsbestätigung
          zustande. AVAN Web Agency (<AddressPlaceholder />) erbringt Dienstleistungen im Bereich
          Webdesign, Webentwicklung, Hosting und Betreuung.
        </p>
      </Section>

      <Section n={2} title="Zahlungsbedingungen">
        <p>
          Es gelten die im Angebot vereinbarten Zahlungsziele. Rechnungen sind innerhalb von 14
          Tagen ohne Abzug zur Zahlung fällig, sofern nicht abweichend schriftlich vereinbart.
        </p>
      </Section>

      <Section n={3} title="Leistungsumfang & Lieferung">
        <p>
          Art, Umfang und Zeitpunkt der Leistungen ergeben sich aus dem jeweiligen Angebot bzw.
          der Auftragsbestätigung. Termine sind unverbindlich, sofern nicht ausdrücklich als
          Fixtermin schriftlich zugesagt.
        </p>
      </Section>

      <Section n={4} title="Widerrufsrecht (Verbraucher)">
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
          widerrufen. Die Widerrufsfrist beginnt mit Vertragsschluss. Bei Dienstleistungen, mit
          deren Ausführung Sie ausdrücklich vor Ablauf der Widerrufsfrist zugestimmt haben, erlischt
          das Widerrufsrecht bei vollständiger Vertragserfüllung.
        </p>
        <p className="mt-3 rounded-lg border border-navy/10 bg-mist/60 p-4">
          <span className="font-semibold text-navy">Muster-Widerrufsformular:</span>
          <br />„Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
          die Erbringung der folgenden Dienstleistung (*). Unterschrift (bei Mitteilung auf Papier),
          Datum."
        </p>
      </Section>

      <Section n={5} title="Gewährleistung">
        <p>
          Es gelten die gesetzlichen Gewährleistungsrechte. Mängel sind unverzüglich nach
          Feststellung schriftlich anzugeben.
        </p>
      </Section>

      <Section n={6} title="Haftungsbeschränkung">
        <p>
          Die Haftung für leichte Fahrlässigkeit ist — soweit gesetzlich zulässig — ausgeschlossen.
          Für das Fehlen zugesicherter Eigenschaften gelten die gesetzlichen Bestimmungen.
        </p>
      </Section>

      <Section n={7} title="Anwendbares Recht / Gerichtsstand">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Sofern Sie Kaufmann sind, ist
          Erfüllungsort und Gerichtsstand unser Sitz.
        </p>
      </Section>

      <p className="mt-8 text-sm text-ink/60">
        Diese AGB sind über den Button oben als PDF speicher- und druckbar (Stand: [
        DATUM EINFÜGEN]). Die gedruckte Fassung entspricht dieser Online-Version.
      </p>

      <a href="#top" className="mt-8 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück zur Startseite
      </a>
    </motion.main>
  )
}

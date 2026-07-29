import { motion } from 'framer-motion'
import { EASE } from '../lib/motion-variants.js'

function AddressField() {
  return (
    <span>
      {/* TODO: Straße und Hausnummer ergänzen, sobald bekannt */}
      [STRASSE UND HAUSNUMMER], 62-080 Lusówko, Polen
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

export default function Datenschutz() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="container-px mx-auto max-w-3xl py-28"
    >
      <h1 className="font-display text-3xl font-extrabold tracking-tightest text-navy sm:text-4xl">
        Datenschutzerklärung
      </h1>

      <Section n={1} title="Verantwortlicher">
        <p>
          Grzegorz Kiełek
          <br />
          <AddressField />
          <br />
          E-Mail: avanwebagency@gmail.com
        </p>
      </Section>

      <Section n={2} title="Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
          erforderlich ist.
        </p>
      </Section>

      <Section n={3} title="Kontaktformular">
        <p>
          Wenn Sie uns über das Kontakt-/Anfrageformular auf dieser Website kontaktieren, werden
          die von Ihnen angegebenen Daten (Name, E-Mail, Telefonnummer, Nachricht) zum Zweck der
          Bearbeitung Ihrer Anfrage gespeichert und verarbeitet. Die Verarbeitung erfolgt auf
          Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p className="mt-3">
          Die über das Formular übermittelten Daten werden über den Formular-Dienstleister
          Netlify Forms verarbeitet und an unsere oben genannte E-Mail-Adresse weitergeleitet.
        </p>
      </Section>

      <Section n={4} title="Hosting">
        <p>
          Diese Website wird bei Netlify gehostet. Der Anbieter verarbeitet dabei automatisch
          technische Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, um die Website
          zuverlässig auszuliefern.
        </p>
      </Section>

      <Section n={5} title="Eingebettete Inhalte (3D-Elemente)">
        <p>
          Diese Website bindet interaktive 3D-Inhalte über den Dienst Spline ein. Beim Laden
          dieser Inhalte kann eine Verbindung zu Servern des Anbieters hergestellt werden.
        </p>
      </Section>

      <Section n={6} title="Ihre Rechte">
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
          Verarbeitung Ihrer bei uns gespeicherten personenbezogenen Daten sowie ein Recht auf
          Datenübertragbarkeit und Beschwerde bei einer Aufsichtsbehörde.
        </p>
      </Section>

      <Section n={7} title="Kontakt bei Fragen zum Datenschutz">
        <p>
          Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten wenden
          Sie sich bitte an: avanwebagency@gmail.com
        </p>
      </Section>

      <p className="mt-10 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        Hinweis: Diese Texte sind eine strukturelle Vorlage, kein Rechtsrat — vor dem Live-Gang
        von einem Generator wie eRecht24 prüfen lassen, insbesondere sobald ein Gewerbe angemeldet
        ist (dann ändert sich der Impressum-Text von „Privatpersonen" zu Firmen-Angaben).
      </p>

      <a href="#top" className="mt-10 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück
      </a>
    </motion.main>
  )
}

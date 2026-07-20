import { motion } from 'framer-motion'
import { EASE } from '../lib/motion-variants.js'

function AddressField() {
  return (
    <span>
      86830 Schwabmünchen
      <span className="ml-1 rounded bg-yellow-200 px-1.5 py-0.5 font-medium italic text-yellow-900">
        [Straße &amp; Hausnr. ergänzen]
      </span>
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
          Kasum Caka &amp; Oskar Kielek, avanwebagency@gmail.com (<AddressField />)
        </p>
      </Section>

      <Section n={2} title="Hosting">
        <p>
          Diese Website wird über Netlify, Inc. gehostet. Netlify verarbeitet dabei automatisch
          erhobene Server-Logs (u.a. IP-Adresse, Zugriffszeit, aufgerufene Seite) zur technischen
          Bereitstellung der Website. Netlify kann Daten in die USA übertragen; es gelten die
          EU-Standardvertragsklauseln von Netlify als Grundlage für die Datenübertragung.
        </p>
      </Section>

      <Section n={3} title="Kontaktformular (Netlify Forms)">
        <p>
          Wenn Sie unser Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten (Name,
          E-Mail, Nachricht) über Netlify Forms verarbeitet und an unsere E-Mail-Adresse
          (avanwebagency@gmail.com) weitergeleitet, um Ihre Anfrage zu bearbeiten.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfrage). Die Daten werden
          gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind.
        </p>
      </Section>

      <Section n={4} title="Rechte der betroffenen Person">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Widerspruch, Datenübertragbarkeit sowie das Beschwerderecht bei einer
          Aufsichtsbehörde.
        </p>
      </Section>

      <Section n={5} title="Hinweis zu Tracking">
        <p>
          Aktuell werden keine Analyse- oder Tracking-Tools eingesetzt. Sollte sich das ändern,
          wird diese Erklärung entsprechend aktualisiert.
        </p>
      </Section>

      <p className="mt-10 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        Hinweis: Diese Texte sind eine strukturelle Vorlage, kein Rechtsrat — vor dem Live-Gang
        von einem Generator wie eRecht24 prüfen lassen, insbesondere sobald ein Gewerbe angemeldet
        ist (dann ändert sich der Impressum-Text von „Privatpersonen" zu Firmen-Angaben).
      </p>

      <a href="#top" className="mt-10 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück zur Startseite
      </a>
    </motion.main>
  )
}

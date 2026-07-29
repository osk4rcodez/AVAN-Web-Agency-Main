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

export default function Impressum() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="container-px mx-auto max-w-3xl py-28"
    >
      <h1 className="font-display text-3xl font-extrabold tracking-tightest text-navy sm:text-4xl">
        Impressum
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-ink/80">
        <p className="font-semibold text-navy">Angaben gemäß § 5 TMG</p>

        <p>
          AVAN Web Agency
          <br />
          Grzegorz Kiełek
        </p>

        <p>
          <AddressField />
        </p>

        <p>
          <span className="font-semibold text-navy">Kontakt:</span>
          <br />
          E-Mail: avanwebagency@gmail.com
        </p>

        <p>
          <span className="font-semibold text-navy">Vertreten durch:</span>
          <br />
          Grzegorz Kiełek
        </p>

        <p>
          <span className="font-semibold text-navy">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
          </span>
          <br />
          Grzegorz Kiełek (Anschrift wie oben)
        </p>

        <p>
          <span className="font-semibold text-navy">Team / Ansprechpartner:</span>
          <br />
          Kasum Caka, Oskar Kielek
        </p>
      </div>

      <a href="#top" className="mt-10 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück zur Startseite
      </a>
    </motion.main>
  )
}

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
          (Zusammenschluss von Kasum Caka und Oskar Kielek — derzeit als Privatpersonen,
          Gewerbeanmeldung in Vorbereitung)
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
          Kasum Caka, Oskar Kielek
        </p>

        <p>
          <span className="font-semibold text-navy">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
          </span>
          <br />
          Kasum Caka, Oskar Kielek (Anschrift wie oben)
        </p>

        <p className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
          Hinweis: Es fehlt noch die Straße &amp; Hausnummer (gelb markiert), damit die
          Anschrift vor dem Go-Live ladungsfähig nach § 5 TMG ist.
        </p>
      </div>

      <a href="#top" className="mt-10 inline-flex text-sm font-semibold text-accent hover:text-navy">
        ← Zurück zur Startseite
      </a>
    </motion.main>
  )
}

import { useEffect, useRef, useState } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import TopoBackground from './components/ui/topo-background.jsx'
import MacOSMenuBar from './components/ui/mac-os-menu-bar.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WebsiteComparison from './components/WebsiteComparison.jsx'
import CinematicHeroDemo from './components/CinematicHeroDemo.jsx'
import TrustBar from './components/TrustBar.jsx'
import Services from './components/Services.jsx'
import Showcase from './components/Showcase.jsx'
import { SplineSceneBasic } from './components/ui/demo.jsx'
import Faq from './components/Faq.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Stats from './components/Stats.jsx'
import Testimonials from './components/Testimonials.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import StickyCTA from './components/StickyCTA.jsx'
import Impressum from './components/Impressum.jsx'
import Datenschutz from './components/Datenschutz.jsx'
import AGB from './components/AGB.jsx'
import Barrierefreiheit from './components/Barrierefreiheit.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import ProjektModal from './components/ProjektModal.jsx'
import FounderModal from './components/FounderModal.jsx'

function Landing() {
  return (
    <>
      <main>
        <Hero />
        <WebsiteComparison />
        {/* Extra Abstand, damit der Uebergang (Fade, sitzt in
            CinematicHeroDemo.jsx) etwas weiter unten beginnt. */}
        <div className="h-[210px] w-full sm:h-[225px] lg:h-[240px]" aria-hidden="true" />
        <CinematicHeroDemo />
        {/* Fade am Rand weiss (CinematicHero) / mist (TrustBar). */}
        <div className="h-32 w-full bg-gradient-to-b from-white to-mist/60" aria-hidden="true" />
        <TrustBar />
        {/* Fade am Rand mist (TrustBar) / grau (site-backdrop hinter Services). */}
        <div className="h-32 w-full bg-gradient-to-b from-mist/60 to-transparent" aria-hidden="true" />
        <Services />
        <Showcase />
        <section className="container-px py-16 lg:py-24">
          <SplineSceneBasic />
        </section>
        <Faq />
        <Process />
        <About />
        <Stats />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}

const LEGAL = {
  '#impressum': Impressum,
  '#datenschutz': Datenschutz,
  '#agb': AGB,
  '#barrierefreiheit': Barrierefreiheit,
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const prevHashRef = useRef(hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const wasLegal = !!LEGAL[prevHashRef.current]
    const isLegal = !!LEGAL[hash]
    if (wasLegal && !isLegal) {
      // Von einer Rechtsseite zurueck zur Landingpage: dort landen, wo man
      // war (ganz unten, beim Footer), statt auf die viel laengere Seite
      // hochgespuelt zu werden und beim Hero zu landen.
      requestAnimationFrame(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: 'instant' })
      })
    }
    prevHashRef.current = hash
  }, [hash])

  // Die dekorative macOS-Menuleiste soll nur ganz oben sichtbar sein —
  // sobald man ueberhaupt zu scrollen anfaengt (oder auf einer Rechtsseite
  // landet), verschwindet sie sofort und die echte Navbar rutscht zurueck
  // an ihre urspruengliche Position (top-0).
  const [heroInView, setHeroInView] = useState(!LEGAL[hash] && window.scrollY <= 1)

  useEffect(() => {
    if (LEGAL[hash]) {
      setHeroInView(false)
      return
    }
    const onScroll = () => setHeroInView(window.scrollY <= 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hash])

  // Statisches, unsichtbares Markup damit Netlify das Formular "projekt-starten"
  // beim Build erkennt (das echte Formular im Modal ist zur Build-Zeit nicht im DOM).
  const NetlifyFormProxy = (
    <form
      name="projekt-starten"
      data-netlify="true"
      hidden
      aria-hidden="true"
    >
      <input type="hidden" name="form-name" value="projekt-starten" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="telefon" />
      <input type="text" name="unternehmen" />
      <input type="text" name="bedarf" />
      <input type="text" name="zeitrahmen" />
      <input type="text" name="budget" />
      <textarea name="nachricht" />
      <input type="text" name="termin" />
    </form>
  )

  // Gleiches Prinzip fuer das kleine Support-Formular (siehe SupportForm.jsx).
  const NetlifySupportFormProxy = (
    <form
      name="support-anfrage"
      data-netlify="true"
      hidden
      aria-hidden="true"
    >
      <input type="hidden" name="form-name" value="support-anfrage" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="anliegen" />
    </form>
  )

  const LegalPage = LEGAL[hash]

  return (
    <>
      {NetlifyFormProxy}
      {NetlifySupportFormProxy}
      <LoadingScreen>
        <TopoBackground fixed />
        <ScrollProgressBar />
        {/* Rein dekorative macOS-Menuleiste — fix ganz oben, nur PC. Die
            echte Navbar rutscht mit top-* darunter (siehe Navbar.jsx). */}
        {heroInView && (
          <div className="fixed inset-x-0 top-[3px] z-[55] hidden px-4 pt-2 md:block">
            <MacOSMenuBar appName="AVAN" />
          </div>
        )}
        <Navbar pushedDown={heroInView} />
        {LegalPage ? (
          <>
            <LegalPage />
            <Footer />
          </>
        ) : (
          <Landing />
        )}
        <ProjektModal />
        <CookieConsent />
        <FounderModal />
      </LoadingScreen>
    </>
  )
}

import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CinematicHeroDemo from './components/CinematicHeroDemo.jsx'
import TrustBar from './components/TrustBar.jsx'
import Services from './components/Services.jsx'
import Showcase from './components/Showcase.jsx'
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
        <CinematicHeroDemo />
        <TrustBar />
        <Services />
        <Showcase />
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

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

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

  const LegalPage = LEGAL[hash]

  return (
    <>
      {NetlifyFormProxy}
      {LegalPage ? (
        <>
          <Navbar />
          <LegalPage />
          <Footer />
          <ProjektModal />
          <CookieConsent />
          <FounderModal />
        </>
      ) : (
        <>
          <Navbar />
          <Landing />
          <ProjektModal />
          <CookieConsent />
          <FounderModal />
        </>
      )}
    </>
  )
}

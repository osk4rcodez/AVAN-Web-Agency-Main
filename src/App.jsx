import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CinematicHeroDemo from './components/CinematicHeroDemo.jsx'
import TrustBar from './components/TrustBar.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Stats from './components/Stats.jsx'
import Testimonials from './components/Testimonials.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import StickyCTA from './components/StickyCTA.jsx'
import Impressum from './components/Impressum.jsx'
import Datenschutz from './components/Datenschutz.jsx'

function Landing() {
  return (
    <>
      <main>
        <Hero />
        <CinematicHeroDemo />
        <TrustBar />
        <Services />
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
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const LegalPage = LEGAL[hash]

  if (LegalPage) {
    return (
      <>
        <Navbar />
        <LegalPage />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
}

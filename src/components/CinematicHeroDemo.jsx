import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { useTranslate } from "../lib/language-preference.jsx";

export default function CinematicHeroDemo() {
  const t = useTranslate();

  return (
    // CinematicHero hat eine eigene GSAP-ScrollTrigger-Pin-Animation
    // (once:true, end:"+=120"). Der dafuer eingefuegte "pin-spacer" ist etwas
    // hoeher als der sichtbare Inhalt, wodurch nach dem ersten Durchlauf beim
    // Zurueckscrollen kurz eine Luecke zum grauen site-backdrop aufklaffen
    // kann, GENAU an der oberen Kante (Uebergang von WebsiteComparison).
    // Fix: der weisse Hintergrund "blutet" hier nach oben — per Padding +
    // exakt kompensierender negativer Margin, damit sich am Dokumentenfluss/
    // an der Seitenhoehe nichts aendert.
    <div className="relative z-10 -mt-32 overflow-x-hidden w-[100%] min-h-screen pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-32 bottom-0 bg-white" aria-hidden="true" />
      <CinematicHero
        tagline1={t({ de: 'Ihre Website.', en: 'Your website.' })}
        tagline2={t({ de: 'Unsere Verantwortung.', en: 'Our responsibility.' })}
        cardHeading={t({ de: 'Von der Idee bis zum Server.', en: 'From idea to server.' })}
        cardDescription={
          <>
            <span className="text-white font-semibold">AVAN</span>{' '}
            {t({
              de: 'entwickelt, betreibt und betreut professionelle Websites für Unternehmen — Hosting, Pflege und Support aus einer Hand.',
              en: 'develops, runs and maintains professional websites for businesses — hosting, care and support from a single source.',
            })}
          </>
        }
        metricLabel={t({ de: 'Betreut', en: 'Managed' })}
        ctaHeading={t({ de: 'Bereit für Ihre neue Website?', en: 'Ready for your new website?' })}
        ctaDescription={t({
          de: 'Lassen Sie uns in einem kurzen, unverbindlichen Gespräch besprechen, wie wir Ihnen helfen können.',
          en: 'Let’s discuss in a short, no-obligation call how we can help you.',
        })}
      />
    </div>
  );
}

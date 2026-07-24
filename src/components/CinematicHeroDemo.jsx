import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function CinematicHeroDemo() {
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
      <CinematicHero />
    </div>
  );
}

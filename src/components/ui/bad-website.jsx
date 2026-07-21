// Bewusst "durchschnittliche" Vorher-Website: weiss, funktional, aber
// generisch und ohne jedes Markendesign — Kontrastfolie fuer den modernen
// "Nachher"-Zustand (SpadeHero). Kein Comic Sans/Neon mehr, nur betont
// unauffaellig-mittelmaessig. Nur im "Animationen an"-Zweig aktiv (siehe
// WebsiteComparison.jsx), die statische Aus-Variante bleibt unveraendert.
export function BadWebsite() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white font-serif text-neutral-800">
      <div className="border-b border-neutral-300 bg-neutral-100 px-3 py-1.5 text-center text-[11px] text-neutral-500 sm:text-xs">
        Seite im Aufbau — besuchen Sie uns bald wieder
      </div>

      <div className="flex items-center justify-between border-b border-neutral-300 px-4 py-3 sm:px-6">
        <span className="text-base font-bold text-neutral-700 sm:text-lg">AVAN Web Agency</span>
        <nav className="hidden gap-4 text-sm text-blue-800 underline sm:flex">
          <a href="#">Startseite</a>
          <a href="#">Über uns</a>
          <a href="#">Kontakt</a>
        </nav>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 px-4 py-8 sm:px-8">
        <h1 className="text-xl font-bold text-neutral-700 sm:text-2xl">Willkommen auf unserer Webseite</h1>
        <p className="max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
          Wir sind eine Web Agentur mit langjähriger Erfahrung. Auf dieser Seite finden Sie
          Informationen zu unseren Leistungen und wie Sie uns erreichen können.
        </p>
        <a href="#" className="mt-2 w-fit text-sm text-blue-800 underline sm:text-base">
          Mehr erfahren
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-neutral-300 bg-neutral-50 px-2 py-2 text-[10px] text-neutral-400 sm:text-xs">
        <span>&copy; AVAN Web Agency</span>
        <span>·</span>
        <span>Impressum</span>
        <span>·</span>
        <span>Kontakt</span>
      </div>
    </div>
  )
}

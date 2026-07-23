export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-abyss/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Navegación principal"
      >
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal/15 ring-1 ring-teal/40">
            {/* Onda que se aplana: del ruido a la señal */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M1 9 L4 4 L7 13 L10 9 L17 9"
                stroke="var(--color-teal-bright)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-snow">
            Bolsa <span className="text-teal-bright">Sin Ruido</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#manifiesto" className="transition-colors hover:text-snow">Manifiesto</a>
          <a href="#metodo" className="transition-colors hover:text-snow">Método</a>
          <a href="#ecosistema" className="transition-colors hover:text-snow">Ecosistema</a>
          <a href="#faq" className="transition-colors hover:text-snow">FAQ</a>
        </div>

        <a
          href="#dashboard-semanal"
          className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-abyss transition-colors hover:bg-teal-bright"
        >
          Dashboard Semanal gratis
        </a>
      </nav>
    </header>
  );
}

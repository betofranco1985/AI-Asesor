const indices = [
  { name: 'S&P 500', value: '6,412.08', change: '+0.84%', up: true },
  { name: 'Nasdaq 100', value: '23,118.44', change: '+1.21%', up: true },
  { name: 'VIX', value: '14.20', change: '-5.02%', up: false },
];

const sectores = [
  { name: 'Tec', up: true },
  { name: 'Salud', up: true },
  { name: 'Fin', up: true },
  { name: 'Ind', up: false },
  { name: 'Ener', up: false },
  { name: 'Cons', up: true },
  { name: 'Mat', up: false },
  { name: 'Util', up: true },
];

export default function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        {/* Copy */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-teal-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-bright" aria-hidden="true" />
            Inversión activa en bolsa de valores
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-snow sm:text-5xl lg:text-[3.4rem]">
            Invertir en bolsa no necesita más ruido.{' '}
            <span className="text-teal-bright">Necesita un proceso.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Analizamos <strong className="font-semibold text-snow">acciones, ETFs e índices</strong> y
            seguimos una estrategia institucional: contexto de mercado, gestión de riesgo y reglas
            claras de entrada y salida. Revisa el mercado{' '}
            <strong className="font-semibold text-snow">40 minutos al día</strong> y decide con
            criterio, no con pánico.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#dashboard-semanal"
              className="rounded-lg bg-teal px-6 py-3.5 text-[15px] font-semibold text-abyss transition-colors hover:bg-teal-bright"
            >
              Recibe gratis el Dashboard Semanal
            </a>
            <a
              href="#metodo"
              className="rounded-lg border border-white/15 px-6 py-3.5 text-[15px] font-semibold text-snow transition-colors hover:border-teal/50 hover:text-teal-bright"
            >
              Conoce el método
            </a>
          </div>

          <p className="mt-5 text-sm text-mist/70">
            Sin señales de compra. Sin promesas de riqueza rápida. Solo proceso.
          </p>
        </div>

        {/* Mockup del Dashboard Semanal */}
        <div className="glow-frame" aria-hidden="true">
          <div className="rounded-[calc(1rem-1px)] bg-deep p-5">
            {/* Encabezado del panel */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-mist/60">
                  Dashboard Semanal
                </p>
                <p className="text-sm font-semibold text-snow">Régimen del mercado</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-up/10 px-3 py-1 text-xs font-semibold text-up ring-1 ring-up/30">
                <span className="h-1.5 w-1.5 rounded-full bg-up" />
                Semáforo: Verde
              </span>
            </div>

            {/* Gráfica del índice */}
            <div className="rounded-xl bg-panel p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-snow">S&P 500 · Semanal</span>
                <span className="text-xs font-semibold text-up">+0.84%</span>
              </div>
              <svg viewBox="0 0 320 96" className="h-24 w-full" role="img">
                <defs>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-teal-bright)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--color-teal-bright)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 78 L22 72 L44 76 L66 62 L88 66 L110 52 L132 58 L154 44 L176 50 L198 36 L220 42 L242 28 L264 33 L286 18 L308 24 L320 14 L320 96 L0 96 Z"
                  fill="url(#spark-fill)"
                />
                <path
                  d="M0 78 L22 72 L44 76 L66 62 L88 66 L110 52 L132 58 L154 44 L176 50 L198 36 L220 42 L242 28 L264 33 L286 18 L308 24 L320 14"
                  fill="none"
                  stroke="var(--color-teal-bright)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Índices */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {indices.map((idx) => (
                <div key={idx.name} className="rounded-xl bg-panel px-3.5 py-3">
                  <p className="truncate text-[11px] font-medium text-mist/60">{idx.name}</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-snow">{idx.value}</p>
                  <p className={`text-xs font-semibold tabular-nums ${idx.up ? 'text-up' : 'text-down'}`}>
                    {idx.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Mapa sectorial */}
            <div className="mt-3 rounded-xl bg-panel p-4">
              <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-mist/60">
                Mapa sectorial
              </p>
              <div className="grid grid-cols-8 gap-1.5">
                {sectores.map((s) => (
                  <div
                    key={s.name}
                    className={`grid h-9 place-items-center rounded-md text-[10px] font-semibold ${
                      s.up ? 'bg-up/15 text-up' : 'bg-down/15 text-down'
                    }`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-mist/50">
                Amplitud: 62% sobre MA50 · Volatilidad contenida · Tendencia primaria alcista
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

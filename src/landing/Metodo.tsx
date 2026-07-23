const pasos = [
  {
    n: '01',
    titulo: 'Contexto',
    desc: 'Antes de mirar una sola acción, leemos el régimen del mercado: tendencia de los índices, amplitud, volatilidad y mapa sectorial. El semáforo macro decide si hay permiso para operar.',
  },
  {
    n: '02',
    titulo: 'Concentración',
    desc: 'Filtramos miles de acciones y ETFs hasta un universo corto de activos líderes con estructura sólida. Descartamos la basura estructural, como en una inspección inmobiliaria.',
  },
  {
    n: '03',
    titulo: 'Configuración',
    desc: 'Cada activo se evalúa contra criterios objetivos: setup, zona de entrada y punto exacto de invalidación. Si no cumple el proceso, no existe. Sin excepciones.',
  },
  {
    n: '04',
    titulo: 'Control',
    desc: 'El riesgo se define antes de entrar: stop loss, tamaño de posición y pérdida máxima aceptada. El stop loss es el seguro del auto y los frenos: se contrata antes de arrancar.',
  },
];

export default function Metodo() {
  return (
    <section id="metodo" className="border-y border-white/5 bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">
            El método · 4C
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
            Una estrategia de inversión con reglas, no opiniones
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Así analizamos el mercado de valores cada semana. Cuatro pasos en orden estricto:
            primero el entorno, después el activo, siempre el riesgo.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p) => (
            <li key={p.n} className="rounded-2xl border border-white/8 bg-panel p-7">
              <span className="text-sm font-bold tabular-nums text-teal-bright">{p.n}</span>
              <h3 className="mt-3 text-xl font-bold text-snow">{p.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-warn/20 bg-warn/5 px-7 py-6">
          <p className="leading-relaxed">
            <strong className="font-semibold text-warn">Regla inquebrantable:</strong>{' '}
            <span className="text-snow">proceso sobre resultado.</span> Aplaudimos más al
            inversionista que ejecutó su stop loss perdiendo 1% respetando sus reglas, que al que
            ganó 20% operando por suerte. La suerte no se repite; el proceso, sí.
          </p>
        </div>
      </div>
    </section>
  );
}

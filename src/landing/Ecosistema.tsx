const niveles = [
  {
    nivel: 'Nivel 1',
    nombre: 'Dashboard Semanal',
    modelo: 'Gratuito',
    pregunta: '¿Qué está pasando en el mercado?',
    desc: 'Entiende en menos de 10 minutos el régimen del mercado: semáforo, tendencia, amplitud, volatilidad y mapa sectorial. Cero señales, puro contexto.',
    cta: 'Suscribirme gratis',
    href: '#dashboard-semanal',
    destacado: false,
  },
  {
    nivel: 'Nivel 2',
    nombre: 'Starter Kit',
    modelo: 'Pago único',
    pregunta: '¿Cómo puedo analizarlo?',
    desc: 'Tu escritorio esencial de análisis: guía paso a paso, dashboard editable, mapa sectorial y checklist del proceso para tus primeras decisiones estructuradas.',
    cta: 'Conocer el kit',
    href: '#dashboard-semanal',
    destacado: false,
  },
  {
    nivel: 'Nivel 3',
    nombre: 'Sala Sin Ruido',
    modelo: 'Suscripción mensual',
    pregunta: '¿Cómo se aplica al mercado real?',
    desc: 'Criterio aplicado semana a semana: reporte profundo, fichas de setup con invalidación, autopsias de operaciones y la bóveda histórica de audios del fundador.',
    cta: 'Unirme a la Sala',
    href: '#dashboard-semanal',
    destacado: true,
  },
  {
    nivel: 'Nivel 4',
    nombre: 'Trend Edge 4C',
    modelo: 'Programa premium',
    pregunta: '¿Cómo domino el sistema completo?',
    desc: 'La metodología propietaria completa — Contexto, Concentración, Configuración y Control — con auditorías en vivo para construir y dominar tu propio sistema.',
    cta: 'Solicitar acceso',
    href: '#dashboard-semanal',
    destacado: false,
  },
];

export default function Ecosistema() {
  return (
    <section id="ecosistema" className="border-y border-white/5 bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">
            El ecosistema
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
            Una escalera de capacidad, no de contenido
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Cada nivel responde una pregunta y aumenta tu capacidad para tomar decisiones de
            inversión. Te damos el mapa, te enseñamos a leerlo, te mostramos cómo lo usamos y te
            entregamos la maquinaria completa.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {niveles.map((n) => (
            <article
              key={n.nombre}
              className={`flex flex-col rounded-2xl p-7 ${
                n.destacado
                  ? 'border border-teal/40 bg-gradient-to-b from-teal/12 to-panel ring-1 ring-teal/20'
                  : 'border border-white/8 bg-panel'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-mist/60">
                  {n.nivel}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    n.destacado ? 'bg-teal/20 text-teal-bright' : 'bg-white/5 text-mist'
                  }`}
                >
                  {n.modelo}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-snow">{n.nombre}</h3>
              <p className="mt-1.5 text-sm font-medium italic text-teal-bright">{n.pregunta}</p>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed">{n.desc}</p>
              <a
                href={n.href}
                className={`mt-6 rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                  n.destacado
                    ? 'bg-teal text-abyss hover:bg-teal-bright'
                    : 'border border-white/15 text-snow hover:border-teal/50 hover:text-teal-bright'
                }`}
              >
                {n.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-mist/60">
          Nivel 5 · <span className="font-semibold text-mist">Sesiones de Capital</span>: encuentros
          presenciales para perfeccionar el criterio con una red de pares. Solo por invitación.
        </p>
      </div>
    </section>
  );
}

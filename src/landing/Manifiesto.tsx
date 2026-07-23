const ruido = [
  'Noticieros que venden pánico o euforia para monetizar tu atención.',
  'Gurús de redes sociales que venden FOMO y riqueza rápida.',
  'Alertas, chats frenéticos y sobreoperar por impulso.',
  'Comprar "la acción de moda" sin contexto ni plan de salida.',
];

const senal = [
  'Un proceso institucional repetible: contexto, análisis y ejecución.',
  'El riesgo definido antes que el rendimiento: stop loss y tamaño de posición.',
  'Probabilidades y reglas, no intuición ni titulares.',
  'Efectivo como posición activa cuando el mercado está en rojo.',
];

export default function Manifiesto() {
  return (
    <section id="manifiesto" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">
          El manifiesto
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
          El mercado de valores no es tu enemigo. El ruido, sí.
        </h2>
        <p className="mt-5 text-lg leading-relaxed">
          No somos un canal de trading ni "otro newsletter financiero". Somos un{' '}
          <strong className="font-semibold text-snow">
            sistema operativo para inversionistas particulares
          </strong>
          : una forma de pensar, una rutina y un proceso matemático para invertir en bolsa
          eliminando la improvisación.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* El Ruido */}
        <div className="rounded-2xl border border-down/20 bg-panel p-8">
          <h3 className="flex items-center gap-2.5 text-lg font-bold text-snow">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-down/15 text-down" aria-hidden="true">
              ✕
            </span>
            El Ruido
          </h3>
          <ul className="mt-6 space-y-4">
            {ruido.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-down/50" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* La Señal */}
        <div className="rounded-2xl border border-teal/25 bg-panel p-8">
          <h3 className="flex items-center gap-2.5 text-lg font-bold text-snow">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal/15 text-teal-bright" aria-hidden="true">
              ✓
            </span>
            La Señal
          </h3>
          <ul className="mt-6 space-y-4">
            {senal.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote className="mx-auto mt-14 max-w-3xl border-l-2 border-teal pl-6 text-xl font-medium italic leading-relaxed text-snow">
        "Nadie sabe qué hará el mercado. Nuestro trabajo es que, haga lo que haga, tu proceso ya
        tenga una respuesta."
      </blockquote>
    </section>
  );
}

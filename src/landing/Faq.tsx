const faqs = [
  {
    q: '¿Qué es Bolsa Sin Ruido?',
    a: 'Un sistema operativo para inversionistas particulares. Hacemos inversión activa en bolsa de valores: analizamos acciones, ETFs e índices y seguimos una estrategia con reglas claras de entrada, salida y gestión de riesgo. No vendemos señales ni promesas de riqueza rápida: enseñamos un proceso institucional y repetible.',
  },
  {
    q: '¿Dan señales o recomendaciones de compra de acciones?',
    a: 'No. Todo nuestro contenido es educativo. Mostramos cómo los activos cumplen o no los criterios de nuestro proceso, pero nunca emitimos alertas ni recomendaciones de compra o venta de valores. Cada inversionista ejecuta sus propias decisiones con su propio criterio.',
  },
  {
    q: '¿En qué mercados y activos se enfoca el análisis?',
    a: 'En la bolsa de valores de Estados Unidos: acciones líderes, ETFs e índices como el S&P 500 y el Nasdaq. Analizamos el régimen del mercado, la amplitud, la volatilidad y el mapa sectorial para definir el contexto antes de mirar cualquier acción individual.',
  },
  {
    q: '¿Cuánto tiempo necesito para seguir la estrategia?',
    a: 'Alrededor de 40 minutos al día, fuera del horario de mercado. El proceso está diseñado para profesionales y empresarios que valoran su tiempo: rutina nocturna, revisión estructurada y cero pantallas durante el día.',
  },
  {
    q: '¿Cómo gestionan el riesgo al invertir en bolsa?',
    a: 'El riesgo es primero. Antes de cualquier entrada definimos el stop loss, el tamaño de posición y el punto de invalidación. Si el semáforo de mercado está en rojo, el efectivo se considera una posición activa. Protegemos el capital antes de buscar rendimiento.',
  },
  {
    q: '¿Qué necesito para empezar a invertir en bolsa con este método?',
    a: 'Una cuenta con un bróker regulado, capital que puedas permitirte arriesgar y disposición para seguir reglas. Puedes comenzar gratis con el Dashboard Semanal, que explica en menos de 10 minutos el régimen del mercado, y avanzar por el ecosistema a tu ritmo.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">FAQ</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
          Preguntas frecuentes sobre invertir en bolsa con nosotros
        </h2>
      </div>

      <div className="mt-12 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="faq group rounded-xl border border-white/8 bg-panel">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-snow [&::marker]:hidden">
              {f.q}
            </summary>
            <p className="px-6 pb-6 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

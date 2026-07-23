const antes = [
  'Persigue noticias y opera por impulso: avaricia, FOMO o terror.',
  'Ve gráficas complejas sin entender el contexto macroeconómico.',
  'Pierde el sueño por posiciones abiertas que no sabe gestionar.',
];

const despues = [
  'Toma decisiones con reglas inquebrantables, dejando la emoción fuera.',
  'Revisa el mercado solo 40 minutos al día, en la noche, sin pantallas durante el día.',
  'Duerme tranquilo: su sistema de defensa protege el capital.',
];

export default function Transformacion() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">
          La transformación
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
          De la ansiedad a la confianza matemática
        </h2>
        <p className="mt-5 text-lg leading-relaxed">
          Diseñado para profesionales, directivos y empresarios que quieren tomar el control de su
          patrimonio invirtiendo en bolsa, sin sacrificar su vida personal.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-panel p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-down">Antes · con ruido</p>
          <ul className="mt-6 space-y-4">
            {antes.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-down/60" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-teal/25 bg-gradient-to-b from-teal/10 to-panel p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-bright">
            Después · sin ruido
          </p>
          <ul className="mt-6 space-y-4">
            {despues.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-snow">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-bright" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

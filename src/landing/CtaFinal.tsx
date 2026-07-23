import { useState } from 'react';

export default function CtaFinal() {
  const [enviado, setEnviado] = useState(false);

  return (
    <section id="dashboard-semanal" className="grid-bg border-t border-white/5">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-bright">
          Empieza gratis
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-snow sm:text-4xl">
          Recibe el Dashboard Semanal Sin Ruido
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed">
          Cada semana, el régimen del mercado explicado en menos de 10 minutos: semáforo, tendencia,
          amplitud, volatilidad y mapa sectorial. Sin señales. Sin spam. Solo contexto para decidir
          mejor.
        </p>

        {enviado ? (
          <p className="mx-auto mt-9 max-w-md rounded-xl border border-teal/30 bg-teal/10 px-6 py-5 font-semibold text-teal-bright">
            Listo. Revisa tu correo para confirmar tu suscripción.
          </p>
        ) : (
          <form
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setEnviado(true);
            }}
          >
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@correo.com"
              className="flex-1 rounded-lg border border-white/15 bg-panel px-5 py-3.5 text-[15px] text-snow placeholder:text-mist/40 focus:border-teal focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-teal px-6 py-3.5 text-[15px] font-semibold text-abyss transition-colors hover:bg-teal-bright"
            >
              Suscribirme gratis
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-mist/60">
          Un correo a la semana. Cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}

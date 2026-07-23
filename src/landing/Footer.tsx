export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="text-[15px] font-bold text-snow">
              Bolsa <span className="text-teal-bright">Sin Ruido</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist/70">
              Inversión activa en bolsa de valores con proceso institucional. Criterio, proceso,
              humildad y repetición.
            </p>
          </div>

          <nav className="flex gap-12 text-sm" aria-label="Enlaces del sitio">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-snow">Sitio</p>
              <a href="#manifiesto" className="text-mist/70 transition-colors hover:text-snow">Manifiesto</a>
              <a href="#metodo" className="text-mist/70 transition-colors hover:text-snow">Método</a>
              <a href="#ecosistema" className="text-mist/70 transition-colors hover:text-snow">Ecosistema</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-snow">Recursos</p>
              <a href="#dashboard-semanal" className="text-mist/70 transition-colors hover:text-snow">Dashboard Semanal</a>
              <a href="#faq" className="text-mist/70 transition-colors hover:text-snow">Preguntas frecuentes</a>
            </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs leading-relaxed text-mist/50">
            <strong className="text-mist/70">Aviso importante:</strong> Bolsa Sin Ruido es una
            plataforma estrictamente educativa. No somos asesores de inversión registrados y nada
            de lo publicado en este sitio constituye una recomendación, alerta o señal de compra o
            venta de valores. Invertir en bolsa implica riesgo de pérdida parcial o total del
            capital; el rendimiento pasado no garantiza resultados futuros. Cada persona es
            responsable de sus propias decisiones de inversión y debe consultar a un asesor
            autorizado cuando lo requiera.
          </p>
          <p className="mt-6 text-xs text-mist/40">
            © {new Date().getFullYear()} Bolsa Sin Ruido. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

# Bolsa Sin Ruido — Sitio web

Landing page de **Bolsa Sin Ruido**: inversión activa en bolsa de valores (acciones, ETFs e índices)
con un proceso institucional. Interfaz minimalista oscura inspirada en terminales de mercado, con la
paleta oficial del Documento Maestro (azul profundo `#0B1D2D`, teal `#1CA6A6`, gris técnico `#B7C1CC`)
y tipografía Inter.

## Secciones

- **Hero** — propuesta de valor directa + mockup del Dashboard Semanal (semáforo de mercado, S&P 500, mapa sectorial)
- **Manifiesto** — El Ruido vs. La Señal
- **Método 4C** — Contexto, Concentración, Configuración, Control
- **Transformación** — antes / después del cliente
- **Ecosistema** — los niveles del funnel (Dashboard Semanal, Starter Kit, Sala Sin Ruido, Trend Edge 4C, Sesiones de Capital)
- **FAQ** — preguntas frecuentes (con datos estructurados `FAQPage`)
- **CTA** — captación de correo para el Dashboard Semanal
- **Footer** — aviso de compliance: contenido educativo, cero señales de compra/venta

## SEO

- `index.html` con título, meta description, keywords, Open Graph, Twitter Cards y canonical en español
- Datos estructurados JSON-LD: `Organization`, `WebSite` y `FAQPage`
- HTML semántico (`h1`–`h3`, `section`, `article`, `nav`, `footer`) con keywords de intención:
  *invertir en bolsa, acciones, ETFs, gestión de riesgo, análisis técnico, mercado de valores*

> Nota: el canonical apunta a `https://bolsasinruido.com/` como marcador; ajústalo al dominio real al publicar.

## Stack

React 19 + TypeScript + Vite 8 + Tailwind CSS 4.

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (dist/)
npm run preview  # servir el build
```

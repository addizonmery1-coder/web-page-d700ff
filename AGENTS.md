# AGENTS.md

Guía del proyecto para desarrolladores y agentes de IA.

## Qué es

Adolever: página única (one-page) en español para adolescentes sobre el ciclo menstrual y la prevención del embarazo adolescente, con un calendario menstrual que guarda los datos solo en `localStorage`. Instalable como PWA. Tono cercano, respetuoso y sin juicios; todo el contenido debe basarse en OMS, UNFPA o Minsa.

## Stack

TanStack Start (React 19, TypeScript estricto), Tailwind CSS 4, componentes shadcn/ui en `src/components/ui`, íconos lucide-react, despliegue en Netlify con `@netlify/vite-plugin-tanstack-start`.

## Estructura

```
public/
  img/                 # Ilustraciones 3D (servir siempre vía /.netlify/images, ver cdn() en brand.tsx)
  icons/               # Monograma A: 192, 512, apple-touch-icon, og-image y SVG fuente
  favicon.svg / .ico
  manifest.webmanifest # PWA (nombre, color de tema lila, íconos)
  sw.js                # Service worker: red primero para páginas, caché primero para estáticos
src/
  content/adolever.ts  # TODO el texto informativo: fases, métodos, mitos, FAQ, pasos, fuentes
  lib/cycle.ts         # Lógica pura del calendario (fechas en UTC "AAAA-MM-DD", predicciones, storage)
  lib/motion.ts        # Efectos: aparición al hacer scroll, parallax, barra de progreso, tilt 3D, ondas
  components/adolever/ # Una sección por archivo + brand.tsx (Logo, MonogramA, FxButton/FxLink, TiltCard, SectionHeading)
  routes/__root.tsx    # <html lang="es">, metadatos, fuentes de Google, manifest e íconos
  routes/index.tsx     # Compone las secciones en orden
  styles.css           # Paleta (--lila-*, --rosa-*, --tinta), tipografías y CSS de efectos
```

## Convenciones

- Textos de interfaz y comentarios en español.
- Contenido editable en `src/content/adolever.ts`, no dentro de los componentes.
- Colores con utilidades `lila-*`, `rosa-*`, `tinta`; usar `lila-600`/`rosa-600` para texto sobre blanco (contraste AA).
- Tipografías: `font-display` (Playfair Display), `font-sans` (Nunito), `font-script` (Dancing Script).
- Efectos: añadir `.reveal` (opcional `data-reveal="left|right"` y `--reveal-delay`) para aparición; `data-parallax data-speed="0.2"` para parallax; `TiltCard` para inclinación 3D; `FxButton`/`FxLink` para brillo y onda.
- Todo efecto debe respetar `prefers-reduced-motion` (ver `prefersReducedMotion()` y el bloque final de `styles.css`).
- Todas las imágenes llevan `alt` descriptivo y respetuoso.

## Decisiones no obvias

- **Privacidad:** el calendario nunca envía datos a un servidor. No agregar analítica ni persistencia remota a esos datos. Clave de almacenamiento: `adolever:calendario`.
- Las predicciones usan el promedio de los ciclos registrados (21–45 días) o la duración indicada; ovulación = 14 días antes del siguiente periodo; ventana fértil = 5 días antes de la ovulación + 1 día después. Siempre mostrar “El calendario no es un método anticonceptivo.”
- Los nombres de variables CSS de la raíz (`--sombra-*`, `--font-decorativa`) difieren de los del `@theme` a propósito, para evitar referencias circulares.
- El service worker solo se registra en producción (`import.meta.env.PROD`). Al cambiar recursos precacheados, sube la versión `CACHE` en `public/sw.js`.

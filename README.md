# Adolever

**Disfruta tu presente, protege tu mañana.**

Adolever es una página web informativa e interactiva, en español, para adolescentes. Explica el ciclo menstrual, ofrece información confiable para prevenir el embarazo adolescente e incluye un calendario menstrual privado que guarda los datos solo en el dispositivo. Se puede instalar en el celular como aplicación (PWA).

## Secciones

1. **Inicio** – eslogan, botón “Empieza aquí” que lleva al calendario e imagen 3D animada que rota con el cursor.
2. **¿Qué es el ciclo menstrual?** – las cuatro fases (menstrual, folicular, ovulación y lútea) con íconos y una línea de tiempo animada.
3. **Calendario menstrual** – registro de inicio y fin del periodo, duración del ciclo, estimación de próximos periodos y días fértiles, aviso de privacidad, botón para borrar todos los datos y el aviso “El calendario no es un método anticonceptivo.”
4. **Prevención del embarazo adolescente** – importancia de la consejería y tarjetas interactivas por método anticonceptivo.
5. **Mitos y realidades** – tarjetas que se voltean al hacer clic.
6. **Dónde buscar ayuda** – pasos para acudir a un establecimiento de salud, líneas 113 y 100, y preguntas frecuentes en acordeón.
7. **Fuentes confiables** – OMS, UNFPA y Minsa.
8. **Pie de página** – logo, eslogan, aviso de que el contenido no reemplaza la consulta médica y botón para instalar la app.

## Tecnologías

- TanStack Start + React 19 + TypeScript
- Tailwind CSS 4 (paleta lila, blanco y rosado en `src/styles.css`)
- Tipografías: Playfair Display (títulos), Nunito (texto) y Dancing Script (frases destacadas)
- Efectos con CSS 3D transforms e IntersectionObserver (sin librerías pesadas); se desactivan con “reducir movimiento”
- Netlify Image CDN para servir imágenes optimizadas en WebP
- PWA: `public/manifest.webmanifest`, `public/sw.js` e íconos en `public/icons/`
- `localStorage` para el calendario (sin cuentas ni servidor)

## Ejecutar en local

```bash
pnpm install
netlify dev       # o: pnpm dev
```

Abre la URL que aparece en la terminal. El service worker solo se registra en la versión publicada.

## Publicar

El proyecto ya está conectado a Netlify: cada cambio en la rama `main` se publica automáticamente. Para publicarlo en otra cuenta:

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. En Netlify, elige **Add new project → Import an existing project** y selecciona el repositorio.
3. Netlify detecta la configuración de `netlify.toml` (comando `vite build`, carpeta `dist/client`). Pulsa **Deploy**.
4. Abre la URL publicada en el celular y usa **Instalar** (Android) o **Compartir → Agregar a inicio** (iPhone).

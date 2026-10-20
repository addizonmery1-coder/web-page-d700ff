/** Fuentes confiables y pie de página. */
import { ExternalLink } from 'lucide-react'
import { sources } from '@/content/adolever'
import { Logo, SectionHeading, TiltCard } from './brand'
import { navItems } from './site-header'
import { InstallApp } from './install-app'

export function SourcesSection() {
  return (
    <section
      id="fuentes"
      aria-labelledby="titulo-fuentes"
      className="bg-lila-50 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          id="titulo-fuentes"
          eyebrow="Información verificada"
          title={
            <>
              Fuentes <em className="text-lila-600">confiables</em>
            </>
          }
          intro="El contenido de Adolever se basa en información pública de estas instituciones. Visítalas para conocer más."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {sources.map((s, i) => (
            <li
              key={s.url}
              className="reveal"
              style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
            >
              <TiltCard className="h-full rounded-[1.75rem] bg-white shadow-soft ring-1 ring-lila-100">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col rounded-[1.75rem] p-7 outline-none focus-visible:ring-4 focus-visible:ring-lila-300"
                >
                  <span className="pop font-display text-5xl font-semibold text-lila-600">
                    {s.short}
                  </span>
                  <span className="mt-3 text-lg font-extrabold text-tinta">
                    {s.name}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-muted-foreground">
                    {s.description}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rosa-600">
                    {s.url.replace('https://', '')}
                    <ExternalLink className="size-4" aria-hidden="true" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </span>
                </a>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white pt-20 pb-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lila-300 to-transparent"
      />
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Logo size="lg" />
            <p className="mt-4 font-script text-3xl text-rosa-600">
              Disfruta tu presente, protege tu mañana.
            </p>
            <div className="mt-6">
              <InstallApp />
            </div>
          </div>
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-tinta/75 md:justify-end">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-lila-700">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-12 rounded-[1.5rem] bg-lila-50 p-5 text-sm leading-relaxed text-tinta/80">
          <strong className="font-extrabold text-tinta">Aviso:</strong> el
          contenido de Adolever es solo informativo y no reemplaza la consulta
          con un profesional de salud. Ante cualquier duda o síntoma, acude a tu
          establecimiento de salud más cercano.
        </p>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Adolever · Hecho con cuidado para
          adolescentes.
        </p>
      </div>
    </footer>
  )
}

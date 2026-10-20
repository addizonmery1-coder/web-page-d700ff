/** Mitos y realidades: tarjetas que se voltean al hacer clic. */
import { useState } from 'react'
import { RotateCw } from 'lucide-react'
import { myths } from '@/content/adolever'
import { SectionHeading } from './brand'

export function MythsSection() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  return (
    <section
      id="mitos"
      aria-labelledby="titulo-mitos"
      className="relative overflow-hidden bg-gradient-to-b from-white via-rosa-100/40 to-white py-24 sm:py-32"
    >
      <div
        data-parallax
        data-speed="-0.15"
        aria-hidden="true"
        className="blob absolute -right-40 top-10 size-[26rem] bg-lila-100 blur-3xl"
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          id="titulo-mitos"
          align="center"
          eyebrow="Separa lo falso de lo cierto"
          title={
            <>
              Mitos <span className="font-script font-normal text-rosa-600">y</span>{' '}
              <em className="text-lila-600">realidades</em>
            </>
          }
          intro="Toca cada tarjeta para descubrir la verdad detrás de lo que se suele escuchar."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {myths.map((m, i) => {
            const isFlipped = !!flipped[i]
            return (
              <li
                key={m.myth}
                className="reveal"
                style={{ '--reveal-delay': `${(i % 4) * 90}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="flip block h-80 w-full rounded-[1.75rem] text-left outline-none focus-visible:ring-4 focus-visible:ring-lila-300"
                  data-flipped={isFlipped}
                  aria-pressed={isFlipped}
                  aria-label={
                    isFlipped
                      ? `Realidad: ${m.truth}`
                      : `Mito: ${m.myth}. Toca para ver la realidad.`
                  }
                  onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                >
                  <span className="flip-inner block">
                    {/* Frente: el mito */}
                    <span className="flip-face flex flex-col justify-between rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-lila-100">
                      <span className="self-start rounded-full bg-rosa-100 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-rosa-600">
                        Mito
                      </span>
                      <span className="font-display text-[1.45rem] leading-snug font-semibold text-tinta">
                        “{m.myth}”
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-lila-600">
                        <RotateCw className="size-4" aria-hidden="true" />
                        Toca para voltear
                      </span>
                    </span>
                    {/* Reverso: la realidad */}
                    <span className="flip-face flip-back flex flex-col justify-between rounded-[1.75rem] bg-gradient-to-br from-lila-600 to-lila-500 p-6 text-white shadow-lift">
                      <span className="self-start rounded-full bg-white/20 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.2em]">
                        Realidad
                      </span>
                      <span className="text-base leading-relaxed font-semibold">
                        {m.truth}
                      </span>
                      <span className="font-script text-xl text-rosa-100">
                        Fuente: {m.source}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

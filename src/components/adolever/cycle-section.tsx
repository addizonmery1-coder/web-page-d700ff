/** ¿Qué es el ciclo menstrual? Cuatro fases con íconos y línea de tiempo animada. */
import { useState } from 'react'
import { Droplet, Moon, Sprout, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { phases, type CyclePhase } from '@/content/adolever'
import { cdn, SectionHeading, TiltCard } from './brand'

const phaseIcon: Record<CyclePhase['id'], typeof Droplet> = {
  menstrual: Droplet,
  folicular: Sprout,
  ovulacion: Sun,
  lutea: Moon,
}

// Colores de cada fase en la línea de tiempo
export const phaseColor: Record<CyclePhase['id'], string> = {
  menstrual: 'bg-rosa-500',
  folicular: 'bg-lila-300',
  ovulacion: 'bg-lila-600',
  lutea: 'bg-rosa-200',
}

// Segmentos visibles de la línea de tiempo (sin solaparse) en un ciclo de 28 días
const segments: { id: CyclePhase['id']; from: number; to: number }[] = [
  { id: 'menstrual', from: 1, to: 5 },
  { id: 'folicular', from: 6, to: 12 },
  { id: 'ovulacion', from: 13, to: 15 },
  { id: 'lutea', from: 16, to: 28 },
]

export function CycleSection() {
  const [selected, setSelected] = useState<CyclePhase['id']>('menstrual')
  const current = phases.find((p) => p.id === selected) ?? phases[0]

  return (
    <section
      id="ciclo"
      aria-labelledby="titulo-ciclo"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading
            id="titulo-ciclo"
            eyebrow="Conoce tu cuerpo"
            title={
              <>
                ¿Qué es el ciclo <em className="text-lila-600">menstrual</em>?
              </>
            }
            script="Un ritmo natural, como las fases de la luna."
            intro="Es el proceso que el cuerpo repite cada mes, más o menos, para prepararse para un posible embarazo. Se cuenta desde el primer día del periodo hasta el día antes del siguiente. En promedio dura 28 días, pero entre 21 y 45 días también es normal en la adolescencia."
          />
          <figure
            className="reveal relative mx-auto w-full max-w-md"
            data-reveal="right"
          >
            <div data-parallax data-speed="0.12">
              <TiltCard max={10} className="overflow-hidden rounded-[2rem] bg-lila-50 shadow-soft">
                <img
                  src={cdn('/img/naturaleza.png', 640)}
                  srcSet={`${cdn('/img/naturaleza.png', 400)} 400w, ${cdn('/img/naturaleza.png', 640)} 640w`}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  width={1400}
                  height={764}
                  loading="lazy"
                  decoding="async"
                  alt="Ilustración 3D de una pequeña isla flotante con un árbol rosado y flores lilas, rodeada por las fases de la luna, como símbolo de los ciclos de la naturaleza"
                  className="aspect-[4/3] w-full scale-[1.35] object-cover mix-blend-multiply"
                />
              </TiltCard>
            </div>
          </figure>
        </div>

        {/* Línea de tiempo animada de un ciclo de 28 días */}
        <div className="reveal mt-20" aria-label="Línea de tiempo de un ciclo de 28 días">
          <div className="mb-3 flex justify-between text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span>Día 1</span>
            <span>Día 14</span>
            <span>Día 28</span>
          </div>
          <div className="relative h-5 overflow-hidden rounded-full bg-lila-50 ring-1 ring-lila-100">
            <div className="timeline-fill absolute inset-0 flex">
              {segments.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelected(s.id)}
                  aria-label={phases.find((p) => p.id === s.id)?.name}
                  className={cn(
                    'h-full transition-opacity outline-none focus-visible:ring-4 focus-visible:ring-lila-300',
                    phaseColor[s.id],
                    selected !== s.id && 'opacity-55 hover:opacity-80',
                  )}
                  style={{ width: `${((s.to - s.from + 1) / 28) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-28 gap-0" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'mx-auto h-1.5 w-px bg-lila-200',
                  (i === 0 || i === 13 || i === 27) && 'h-3 bg-lila-400',
                )}
              />
            ))}
          </div>
        </div>

        {/* Tarjetas de las fases */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => {
            const Icon = phaseIcon[phase.id]
            const isActive = selected === phase.id
            return (
              <li
                key={phase.id}
                className="reveal"
                style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
              >
                <TiltCard
                  className={cn(
                    'h-full rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 transition-colors',
                    isActive ? 'ring-2 ring-lila-400' : 'ring-lila-100',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(phase.id)}
                    aria-pressed={isActive}
                    className="flex h-full w-full flex-col text-left outline-none focus-visible:ring-4 focus-visible:ring-lila-200 rounded-2xl"
                  >
                    <span className="pop flex items-center justify-between">
                      <span
                        className={cn(
                          'inline-flex size-14 items-center justify-center rounded-2xl text-white shadow-soft',
                          phase.id === 'lutea' ? 'bg-rosa-500' : phaseColor[phase.id],
                          phase.id === 'folicular' && 'bg-lila-500',
                        )}
                      >
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span className="font-display text-5xl text-lila-100">
                        0{i + 1}
                      </span>
                    </span>
                    <span className="mt-6 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-rosa-600">
                      {phase.days}
                    </span>
                    <span className="mt-1 font-display text-2xl font-semibold text-tinta">
                      {phase.name}
                    </span>
                    <span className="mt-1 font-script text-xl text-lila-600">
                      {phase.summary}
                    </span>
                    <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {phase.body}
                    </span>
                  </button>
                </TiltCard>
              </li>
            )
          })}
        </ol>

        <div
          className="reveal mt-8 flex flex-col items-start gap-3 rounded-[1.75rem] bg-gradient-to-r from-lila-100 to-rosa-100 p-6 sm:flex-row sm:items-center sm:p-8"
          aria-live="polite"
        >
          <span className="font-script text-2xl text-lila-700">Consejo · {current.name}</span>
          <span className="text-base text-tinta/85">{current.tip}</span>
        </div>
      </div>
    </section>
  )
}

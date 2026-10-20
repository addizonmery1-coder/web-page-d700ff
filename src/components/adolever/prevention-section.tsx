/** Prevención del embarazo adolescente: métodos anticonceptivos y consejería. */
import { useState } from 'react'
import {
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  ShieldOff,
  UserRoundCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { methods } from '@/content/adolever'
import { cdn, SectionHeading, TiltCard } from './brand'

const counseling = [
  {
    icon: MessageCircleHeart,
    title: 'Te escuchan sin juzgarte',
    body: 'La consejería es un espacio seguro para preguntar lo que quieras sobre tu cuerpo, tus relaciones y tu salud.',
  },
  {
    icon: UserRoundCheck,
    title: 'Eliges con información',
    body: 'Un profesional te explica cada método según tu edad, tu salud y tus necesidades, para que decidas con libertad.',
  },
  {
    icon: HeartHandshake,
    title: 'Es tu derecho',
    body: 'Recibir información y servicios de salud sexual y reproductiva es parte de tu derecho a la salud.',
  },
]

export function PreventionSection() {
  const [selectedId, setSelectedId] = useState(methods[0].id)
  const selected = methods.find((m) => m.id === selectedId) ?? methods[0]

  return (
    <section
      id="prevencion"
      aria-labelledby="titulo-prevencion"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <figure className="reveal order-2 lg:order-1" data-reveal="left">
            <div data-parallax data-speed="0.1">
              <TiltCard className="overflow-hidden rounded-[2.25rem] bg-lila-50 shadow-soft">
                <img
                  src={cdn('/img/bienestar.png', 720)}
                  srcSet={`${cdn('/img/bienestar.png', 420)} 420w, ${cdn('/img/bienestar.png', 720)} 720w`}
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  width={1400}
                  height={764}
                  loading="lazy"
                  decoding="async"
                  alt="Ilustración 3D de un corazón rosado con estetoscopio, un escudo con un check, un cuaderno lila, una botella de agua y una planta, que representan el cuidado de la salud"
                  className="aspect-[5/4] w-full object-cover mix-blend-multiply"
                />
              </TiltCard>
            </div>
          </figure>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="titulo-prevencion"
              eyebrow="Cuidarte es decidir"
              title={
                <>
                  Prevención del embarazo{' '}
                  <em className="text-lila-600">adolescente</em>
                </>
              }
              script="Tu proyecto de vida es primero."
              intro="Un embarazo en la adolescencia puede afectar tu salud, tus estudios y tus planes. Postergar el inicio de las relaciones sexuales es una opción válida; y si decides tenerlas, existen métodos anticonceptivos seguros y gratuitos en los establecimientos de salud."
            />
          </div>
        </div>

        {/* Consejería */}
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {counseling.map((c, i) => (
            <li
              key={c.title}
              className="reveal rounded-[1.75rem] bg-gradient-to-br from-lila-50 to-white p-7 ring-1 ring-lila-100"
              style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
            >
              <c.icon className="size-8 text-lila-600" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-tinta">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Métodos: tarjetas interactivas */}
        <div className="mt-20">
          <div className="reveal flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h3 className="font-display text-4xl font-semibold text-tinta sm:text-5xl">
              Métodos anticonceptivos
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Toca una tarjeta para conocer cómo funciona. La eficacia indicada
              es con el uso habitual, según la OMS.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {methods.map((m, i) => {
                const active = m.id === selectedId
                return (
                  <li
                    key={m.id}
                    className="reveal"
                    style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
                  >
                    <TiltCard
                      max={12}
                      className={cn(
                        'h-full rounded-[1.5rem] shadow-soft transition-colors',
                        active
                          ? 'bg-lila-600 text-white'
                          : 'bg-white text-tinta ring-1 ring-lila-100 hover:ring-lila-300',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(m.id)}
                        aria-pressed={active}
                        aria-controls="detalle-metodo"
                        className="flex h-full min-h-36 w-full flex-col justify-between rounded-[1.5rem] p-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-rosa-300 sm:p-5"
                      >
                        <span
                          className={cn(
                            'pop self-start rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.15em]',
                            active ? 'bg-white/20 text-white' : 'bg-rosa-100 text-rosa-600',
                          )}
                        >
                          {m.kind}
                        </span>
                        <span className="pop mt-4 block font-display text-lg leading-tight font-semibold sm:text-xl">
                          {m.name}
                        </span>
                        <span
                          className={cn(
                            'mt-2 text-xs font-bold',
                            active ? 'text-lila-100' : 'text-lila-600',
                          )}
                        >
                          Eficacia {m.effectiveness}
                        </span>
                      </button>
                    </TiltCard>
                  </li>
                )
              })}
            </ul>

            <article
              id="detalle-metodo"
              aria-live="polite"
              className="reveal relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-lila-100 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-56 rounded-full bg-rosa-100 blur-2xl"
              />
              <div key={selected.id} className="relative animate-in fade-in slide-in-from-bottom-3 duration-500">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-rosa-600">
                  {selected.kind}
                </p>
                <h4 className="mt-2 font-display text-4xl leading-tight font-semibold text-tinta">
                  {selected.name}
                </h4>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Eficacia con uso habitual
                    </span>
                    <span className="font-display text-3xl font-semibold text-lila-600">
                      {selected.effectiveness}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-3 overflow-hidden rounded-full bg-lila-50"
                    role="img"
                    aria-label={`Eficacia aproximada: ${selected.effectiveness}`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lila-400 to-lila-600 transition-[width] duration-700"
                      style={{ width: `${selected.effectivenessValue}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-6 grid gap-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-extrabold text-tinta">¿Cómo funciona?</dt>
                    <dd className="text-muted-foreground">{selected.howItWorks}</dd>
                  </div>
                  <div>
                    <dt className="font-extrabold text-tinta">¿Cómo se usa?</dt>
                    <dd className="text-muted-foreground">{selected.howToUse}</dd>
                  </div>
                  <div>
                    <dt className="font-extrabold text-tinta">Bueno saber</dt>
                    <dd className="text-muted-foreground">{selected.goodToKnow}</dd>
                  </div>
                </dl>

                <p
                  className={cn(
                    'mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold',
                    selected.protectsSTI
                      ? 'bg-lila-100 text-lila-700'
                      : 'bg-rosa-100 text-rosa-600',
                  )}
                >
                  {selected.protectsSTI ? (
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  ) : (
                    <ShieldOff className="size-4" aria-hidden="true" />
                  )}
                  {selected.protectsSTI
                    ? 'También protege de infecciones de transmisión sexual'
                    : 'No protege de infecciones: combínalo con condón'}
                </p>
              </div>
            </article>
          </div>

          <p className="reveal mt-8 rounded-[1.5rem] bg-lila-50 p-5 text-sm text-tinta/80">
            <strong className="font-extrabold text-tinta">Doble protección:</strong>{' '}
            usar condón junto con otro método ayuda a prevenir el embarazo y las
            infecciones de transmisión sexual al mismo tiempo. Elige siempre tu
            método con la orientación de un profesional de salud.
          </p>
        </div>
      </div>
    </section>
  )
}

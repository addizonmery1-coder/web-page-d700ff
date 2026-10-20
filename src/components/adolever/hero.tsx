/** Portada: eslogan, llamada a la acción e imagen 3D que rota con el cursor. */
import { ArrowDown, CalendarHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { useTilt } from '@/lib/motion'
import { cdn, FxLink } from './brand'

export function Hero() {
  const tilt = useTilt<HTMLDivElement>(12)

  return (
    <section
      id="inicio"
      aria-labelledby="titulo-inicio"
      className="relative isolate overflow-hidden bg-gradient-to-b from-lila-50 via-white to-white pt-28 pb-20 sm:pt-32 lg:min-h-[100svh] lg:pb-28"
    >
      {/* Capas decorativas con parallax a distintas velocidades */}
      <div
        data-parallax
        data-speed="0.25"
        aria-hidden="true"
        className="blob absolute -top-24 -left-28 -z-10 size-[26rem] bg-lila-200/70 blur-3xl"
      />
      <div
        data-parallax
        data-speed="-0.18"
        aria-hidden="true"
        className="blob absolute top-1/3 -right-32 -z-10 size-[30rem] bg-rosa-200/60 blur-3xl"
      />
      <div
        data-parallax
        data-speed="0.4"
        aria-hidden="true"
        className="absolute bottom-10 left-[44%] -z-10 hidden size-40 rounded-full border border-lila-200 lg:block"
      />

      <div className="mx-auto grid max-w-content items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_1fr]">
        <div>
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-lila-700 shadow-soft ring-1 ring-lila-100">
            <Sparkles className="size-4 text-rosa-500" aria-hidden="true" />
            Información clara, sin juicios, para adolescentes
          </p>
          <h1
            id="titulo-inicio"
            className="reveal font-display text-[3.4rem] leading-[0.95] font-semibold tracking-tight text-tinta sm:text-7xl lg:text-[6.2rem]"
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          >
            Disfruta tu{' '}
            <em className="font-normal text-lila-600 italic">presente,</em>
          </h1>
          <p
            className="reveal mt-3 font-script text-[2.6rem] leading-none text-rosa-600 sm:text-6xl lg:text-7xl"
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            protege tu mañana.
          </p>
          <p
            className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
          >
            Conoce cómo funciona tu ciclo menstrual, registra tu periodo en un
            calendario privado y encuentra información confiable para cuidar tu
            salud y prevenir un embarazo no planificado.
          </p>
          <div
            className="reveal mt-10 flex flex-wrap items-center gap-4"
            style={{ '--reveal-delay': '340ms' } as React.CSSProperties}
          >
            <FxLink href="#calendario" className="px-8 py-4 text-base">
              Empieza aquí
              <ArrowDown className="size-4" aria-hidden="true" />
            </FxLink>
            <FxLink href="#ciclo" variant="ghost" className="px-7 py-4 text-base">
              ¿Qué es el ciclo?
            </FxLink>
          </div>
          <ul
            className="reveal mt-12 grid max-w-lg grid-cols-2 gap-4 text-sm"
            style={{ '--reveal-delay': '420ms' } as React.CSSProperties}
          >
            <li className="flex items-start gap-3">
              <CalendarHeart className="mt-0.5 size-5 shrink-0 text-lila-600" aria-hidden="true" />
              <span className="text-tinta/80">
                <strong className="block text-tinta">Sin cuenta ni registro</strong>
                Tus datos se quedan en tu celular.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-rosa-600" aria-hidden="true" />
              <span className="text-tinta/80">
                <strong className="block text-tinta">Fuentes oficiales</strong>
                OMS, UNFPA y Minsa.
              </span>
            </li>
          </ul>
        </div>

        {/* Escena 3D: la imagen rota con el cursor y flota; los anillos orbitan */}
        <div
          className="reveal relative mx-auto w-full max-w-[34rem] [perspective:1200px]"
          data-reveal="right"
        >
          <div data-parallax data-speed="-0.08">
            <div
              ref={tilt.ref}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              className="tilt relative aspect-[8/7] rounded-[2.5rem]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-[6%] -z-10 rounded-full bg-gradient-to-br from-lila-200 via-white to-rosa-200 shadow-lift"
                style={{ transform: 'translateZ(-60px)' }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-4%] [transform-style:preserve-3d]"
              >
                <div className="orbit absolute inset-0 rounded-full border-2 border-dashed border-lila-300/80" />
              </div>
              <div className="animate-float h-full w-full">
                <img
                  src={cdn('/img/hero.png', 760)}
                  srcSet={`${cdn('/img/hero.png', 420)} 420w, ${cdn('/img/hero.png', 760)} 760w`}
                  sizes="(min-width: 1024px) 34rem, 90vw"
                  width={800}
                  height={700}
                  alt="Ilustración 3D de una luna lila y una esfera rosada rodeadas de flores, perlas, un pequeño calendario y un corazón, que representan el ciclo menstrual y el autocuidado"
                  className="h-full w-full rounded-[2.5rem] object-cover mix-blend-multiply"
                  style={{ transform: 'translateZ(50px)' }}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <span className="tilt-glare" aria-hidden="true" />
              <div
                className="absolute -bottom-6 left-2 rounded-2xl bg-white/90 px-5 py-4 shadow-lift ring-1 ring-lila-100 backdrop-blur sm:left-[-1.5rem]"
                style={{ transform: 'translateZ(80px)' }}
              >
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-muted-foreground">
                  Un ciclo dura
                </p>
                <p className="font-display text-3xl font-semibold text-lila-600">
                  21–45 <span className="text-base font-sans font-bold text-tinta/70">días</span>
                </p>
              </div>
              <div
                className="absolute -top-4 right-2 rounded-full bg-rosa-300 px-4 py-2 text-xs font-extrabold text-tinta shadow-lift sm:right-[-1rem]"
                style={{ transform: 'translateZ(70px)' }}
              >
                Tu cuerpo, tu ritmo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

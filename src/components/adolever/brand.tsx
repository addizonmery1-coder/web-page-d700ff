/** Piezas compartidas de la marca Adolever: logo, botones con efecto, tarjetas 3D y títulos. */
import type * as React from 'react'
import { cn } from '@/lib/utils'
import { spawnRipple, useTilt } from '@/lib/motion'

/** "A" caligráfica de trazos finos (misma forma que el ícono de la app). */
export function MonogramA({ className }: { className?: string }) {
  return (
    <svg
      viewBox="90 60 330 360"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M262 112 L160 392 C150 420 120 428 104 410" strokeWidth="9" />
        <path d="M196 296 C240 288 290 288 336 294" strokeWidth="9" />
        <path d="M300 404 L402 404" strokeWidth="10" />
        <path d="M266 100 C248 78 214 76 190 96" strokeWidth="8" />
      </g>
      <path d="M256 104 L284 96 L384 400 L334 404 Z" fill="currentColor" />
    </svg>
  )
}

/** Logo principal: "Adolever" en lila con la A caligráfica. */
export function Logo({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'md' | 'lg'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-end font-display text-lila-600 leading-none',
        size === 'lg' ? 'text-5xl md:text-6xl' : 'text-[1.7rem]',
        className,
      )}
      role="img"
      aria-label="Adolever"
    >
      <MonogramA className="h-[1.18em] w-auto -mr-[0.06em] translate-y-[0.09em]" />
      <span aria-hidden="true" className="tracking-[0.01em]">
        dolever
      </span>
    </span>
  )
}

type FxVariant = 'primary' | 'secondary' | 'ghost'

const fxStyles: Record<FxVariant, string> = {
  primary:
    'bg-lila-600 text-white shadow-soft hover:bg-lila-700 focus-visible:ring-lila-300',
  secondary:
    'bg-rosa-300 text-tinta shadow-soft hover:bg-rosa-500 hover:text-white focus-visible:ring-rosa-200',
  ghost:
    'bg-white text-lila-700 ring-1 ring-lila-200 hover:bg-lila-50 focus-visible:ring-lila-300',
}

const fxBase =
  'btn-fx inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50'

/** Botón con brillo al pasar el cursor y onda al hacer clic. */
export function FxButton({
  variant = 'primary',
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: FxVariant }) {
  return (
    <button
      type="button"
      className={cn(fxBase, fxStyles[variant], className)}
      onClick={(e) => {
        spawnRipple(e)
        onClick?.(e)
      }}
      {...props}
    />
  )
}

/** Enlace con el mismo aspecto y efectos que FxButton. */
export function FxLink({
  variant = 'primary',
  className,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: FxVariant }) {
  return (
    <a
      className={cn(fxBase, fxStyles[variant], className)}
      onClick={(e) => {
        spawnRipple(e)
        onClick?.(e)
      }}
      {...props}
    />
  )
}

/** Contenedor que se inclina en 3D siguiendo el cursor, con reflejo de luz. */
export function TiltCard({
  className,
  children,
  max = 8,
  as: Tag = 'div',
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  max?: number
  as?: 'div' | 'article' | 'li' | 'figure'
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>(max)
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('tilt relative', className)}
      {...props}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </Tag>
  )
}

/** Encabezado de sección: etiqueta pequeña, título grande y frase en cursiva. */
export function SectionHeading({
  eyebrow,
  title,
  script,
  intro,
  align = 'left',
  id,
}: {
  eyebrow: string
  title: React.ReactNode
  script?: string
  intro?: React.ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <header
      className={cn(
        'reveal max-w-3xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      <p className="mb-4 inline-flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-lila-600">
        <span className="h-px w-8 bg-rosa-300" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-tinta sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {script && (
        <p className="mt-3 font-script text-2xl text-rosa-600 sm:text-3xl">
          {script}
        </p>
      )}
      {intro && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </header>
  )
}

/** URL optimizada por Netlify Image CDN. */
export function cdn(path: string, width: number) {
  return `/.netlify/images?url=${path}&w=${width}&fm=webp`
}

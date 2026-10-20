/** Navegación fija con barra de progreso de lectura y menú para celular. */
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollEffects } from '@/lib/motion'
import { FxLink, Logo } from './brand'

export const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'ciclo', label: 'El ciclo' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'prevencion', label: 'Prevención' },
  { id: 'mitos', label: 'Mitos' },
  { id: 'ayuda', label: 'Ayuda' },
  { id: 'fuentes', label: 'Fuentes' },
]

export function SiteHeader() {
  const progressRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)
  useScrollEffects(progressRef)

  // Resalta la sección visible en la navegación
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => io.observe(s))
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 shadow-[0_6px_30px_-18px_rgb(124_92_196/0.45)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-lila-100/60"
        aria-hidden="true"
      >
        <div ref={progressRef} className="reading-progress h-full w-full" />
      </div>

      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-18 max-w-content items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a
          href="#inicio"
          className="rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-lila-200"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-lila-200',
                  active === item.id
                    ? 'bg-lila-100 text-lila-700'
                    : 'text-tinta/75 hover:text-lila-700',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <FxLink
            href="#calendario"
            className="hidden px-5 py-2.5 sm:inline-flex"
          >
            Mi calendario
          </FxLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white text-lila-700 shadow-soft ring-1 ring-lila-100 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-lila-100 bg-white/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto grid max-w-content grid-cols-2 gap-2 px-5 py-5 sm:grid-cols-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-2xl px-4 py-3 text-sm font-bold',
                  active === item.id
                    ? 'bg-lila-100 text-lila-700'
                    : 'bg-lila-50 text-tinta/80',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

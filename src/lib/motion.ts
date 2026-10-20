/**
 * Efectos de movimiento de Adolever.
 * Todos respetan `prefers-reduced-motion`: si el sistema pide reducir
 * movimiento, no se aplica parallax, inclinación 3D ni ondas.
 */
import { useCallback, useEffect, useRef } from 'react'
import type * as React from 'react'

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Muestra con animación cada elemento `.reveal` cuando entra en pantalla. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/**
 * Parallax y barra de progreso con un único listener de scroll.
 * Cada `[data-parallax]` se desplaza según su `data-speed` (p. ej. 0.2 o -0.15).
 */
export function useScrollEffects(progressRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const layers = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty(
        '--progress',
        String(max > 0 ? Math.min(1, y / max) : 0),
      )
      for (const el of layers) {
        const speed = Number(el.dataset.speed ?? 0.2)
        const rect = el.parentElement?.getBoundingClientRect()
        // Desplazamiento relativo al centro de la pantalla para que cada capa
        // se mueva a su propio ritmo dentro de su sección.
        const offset = rect
          ? rect.top + rect.height / 2 - window.innerHeight / 2
          : y
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [progressRef])
}

/** Inclinación 3D que sigue al cursor. Devuelve handlers para el elemento. */
export function useTilt<T extends HTMLElement>(max = 10) {
  const ref = useRef<T>(null)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current
      if (!el || e.pointerType === 'touch' || prefersReducedMotion()) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`)
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
    },
    [max],
  )

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}

/** Crea una onda en el punto donde se hizo clic (para `.btn-fx`). */
export function spawnRipple(e: React.MouseEvent<HTMLElement>) {
  if (prefersReducedMotion()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const size = Math.max(r.width, r.height) * 2
  const span = document.createElement('span')
  span.className = 'ripple'
  span.style.width = span.style.height = `${size}px`
  span.style.left = `${e.clientX - r.left - size / 2}px`
  span.style.top = `${e.clientY - r.top - size / 2}px`
  el.appendChild(span)
  span.addEventListener('animationend', () => span.remove())
}

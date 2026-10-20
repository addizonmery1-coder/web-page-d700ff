import { createFileRoute } from '@tanstack/react-router'
import { useRevealOnScroll } from '@/lib/motion'
import { SiteHeader } from '@/components/adolever/site-header'
import { Hero } from '@/components/adolever/hero'
import { CycleSection } from '@/components/adolever/cycle-section'
import { CalendarSection } from '@/components/adolever/calendar-section'
import { PreventionSection } from '@/components/adolever/prevention-section'
import { MythsSection } from '@/components/adolever/myths-section'
import { HelpSection } from '@/components/adolever/help-section'
import {
  SiteFooter,
  SourcesSection,
} from '@/components/adolever/sources-footer'

export const Route = createFileRoute('/')({
  component: Home,
})

/** Página única de Adolever: cada sección tiene su propio id para la navegación fija. */
function Home() {
  useRevealOnScroll()

  return (
    <div className="grain min-h-screen overflow-x-clip bg-white text-tinta">
      <a
        href="#contenido"
        className="sr-only z-[70] rounded-full bg-lila-600 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <CycleSection />
        <CalendarSection />
        <PreventionSection />
        <MythsSection />
        <HelpSection />
        <SourcesSection />
      </main>
      <SiteFooter />
    </div>
  )
}

/** Dónde buscar ayuda: pasos para acudir a un establecimiento de salud y preguntas frecuentes. */
import { Phone } from 'lucide-react'
import { faqs, helpSteps } from '@/content/adolever'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading, TiltCard } from './brand'

export function HelpSection() {
  return (
    <section
      id="ayuda"
      aria-labelledby="titulo-ayuda"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          id="titulo-ayuda"
          eyebrow="No estás sola ni solo"
          title={
            <>
              Dónde buscar <em className="text-lila-600">ayuda</em>
            </>
          }
          script="Pedir ayuda también es cuidarte."
          intro="En el Perú, los puestos y centros de salud del Minsa brindan orientación y consejería en salud sexual y reproductiva para adolescentes. Así puedes acudir:"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {helpSteps.map((step, i) => (
            <li
              key={step.title}
              className="reveal"
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <TiltCard className="h-full rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-lila-100">
                <span className="pop block font-display text-6xl leading-none text-rosa-300">
                  {i + 1}
                </span>
                <h3 className="pop mt-4 font-display text-2xl font-semibold text-tinta">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </TiltCard>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal space-y-4" data-reveal="left">
            <h3 className="font-display text-4xl font-semibold text-tinta">
              Preguntas frecuentes
            </h3>
            <p className="text-muted-foreground">
              Si tienes otra duda, puedes llamar gratis a estas líneas en el Perú:
            </p>
            <a
              href="tel:113"
              className="flex items-center gap-4 rounded-[1.5rem] bg-lila-600 p-5 text-white shadow-soft transition-transform hover:-translate-y-1"
            >
              <Phone className="size-6" aria-hidden="true" />
              <span>
                <span className="block font-display text-3xl font-semibold">Línea 113</span>
                <span className="text-sm text-lila-100">Infosalud · Minsa · orientación en salud</span>
              </span>
            </a>
            <a
              href="tel:100"
              className="flex items-center gap-4 rounded-[1.5rem] bg-rosa-100 p-5 text-tinta shadow-soft ring-1 ring-rosa-200 transition-transform hover:-translate-y-1"
            >
              <Phone className="size-6 text-rosa-600" aria-hidden="true" />
              <span>
                <span className="block font-display text-3xl font-semibold">Línea 100</span>
                <span className="text-sm text-tinta/75">Ante situaciones de violencia · 24 horas</span>
              </span>
            </a>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="reveal rounded-[2rem] bg-white px-6 shadow-soft ring-1 ring-lila-100 sm:px-8"
          >
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-lila-100">
                <AccordionTrigger className="py-5 font-display text-lg font-semibold text-tinta hover:no-underline hover:text-lila-700 sm:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

/**
 * Calendario menstrual interactivo.
 * - Los datos se guardan únicamente en este dispositivo (localStorage).
 * - Antes de registrar se muestra un aviso de privacidad.
 * - Un solo botón borra todos los datos.
 */
import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Lock,
  Trash2,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  addDays,
  buildDayMap,
  clearData,
  currentCycleInfo,
  currentFertileWindow,
  DEFAULT_CYCLE,
  diffDays,
  effectiveCycleLength,
  emptyData,
  formatLong,
  formatShort,
  fromUTC,
  loadData,
  MAX_CYCLE,
  MIN_CYCLE,
  newId,
  predict,
  saveData,
  sortPeriods,
  todayISO,
  type CycleData,
  type DayKind,
} from '@/lib/cycle'
import { phases } from '@/content/adolever'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FxButton, SectionHeading } from './brand'

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

const dayStyles: Record<Exclude<DayKind, null>, string> = {
  period: 'bg-rosa-500 text-white font-bold shadow-soft',
  predicted: 'bg-rosa-100 text-rosa-600 font-bold ring-2 ring-rosa-300',
  fertile: 'bg-lila-100 text-lila-700 font-semibold',
  ovulation: 'bg-lila-600 text-white font-bold',
}

const dayLabels: Record<Exclude<DayKind, null>, string> = {
  period: 'periodo registrado',
  predicted: 'periodo estimado',
  fertile: 'días fértiles estimados',
  ovulation: 'ovulación estimada',
}

export function CalendarSection() {
  const [data, setData] = useState<CycleData>(emptyData)
  const [ready, setReady] = useState(false)
  const today = todayISO()

  // Cargar desde el dispositivo solo en el navegador
  useEffect(() => {
    setData(loadData())
    setReady(true)
  }, [])

  const update = (next: CycleData) => {
    setData(next)
    saveData(next)
  }

  const acceptPrivacy = () => update({ ...data, privacyAccepted: true })

  const deleteAll = () => {
    clearData()
    setData(emptyData)
    toast.success('Listo: borramos todos tus datos de este dispositivo.')
  }

  return (
    <section
      id="calendario"
      aria-labelledby="titulo-calendario"
      className="relative overflow-hidden bg-gradient-to-b from-white via-lila-50 to-white py-24 sm:py-32"
    >
      <div
        data-parallax
        data-speed="0.2"
        aria-hidden="true"
        className="blob absolute top-20 -left-40 size-[28rem] bg-rosa-100 blur-3xl"
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          id="titulo-calendario"
          eyebrow="Tu espacio privado"
          title={
            <>
              Calendario <em className="text-lila-600">menstrual</em>
            </>
          }
          script="Entiende tu ritmo, a tu manera."
          intro="Registra cuándo empieza y termina tu periodo. Calculamos una estimación de tus próximos periodos y de tus días fértiles. Mientras más ciclos registres, mejor será la estimación."
        />

        <div
          role="alert"
          className="reveal mt-10 flex items-start gap-4 rounded-[1.5rem] border-2 border-rosa-300 bg-white p-5 shadow-soft sm:items-center sm:p-6"
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rosa-100 text-rosa-600">
            <AlertTriangle className="size-6" aria-hidden="true" />
          </span>
          <p className="text-base text-tinta sm:text-lg">
            <strong className="font-extrabold">
              El calendario no es un método anticonceptivo.
            </strong>{' '}
            <span className="text-muted-foreground">
              Las fechas son solo estimaciones; los ciclos pueden variar, sobre
              todo en la adolescencia. Para prevenir un embarazo usa un método
              anticonceptivo con orientación de un profesional de salud.
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="relative">
            {/* Mientras no se acepte el aviso, el formulario queda inactivo */}
            <div className="h-full" inert={ready && !data.privacyAccepted}>
              <RegisterPanel data={data} onChange={update} today={today} />
            </div>
            {ready && !data.privacyAccepted && (
              <PrivacyGate onAccept={acceptPrivacy} />
            )}
          </div>
          <div className="grid gap-6">
            <SummaryPanel data={data} />
            <MonthCalendar data={data} today={today} />
          </div>
        </div>

        <div className="reveal mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] bg-white p-5 ring-1 ring-lila-100 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <Lock className="size-4 shrink-0 text-lila-600" aria-hidden="true" />
            Tus datos se guardan solo en este dispositivo. No los enviamos a
            ningún servidor.
          </p>
          <DeleteAllButton
            onConfirm={deleteAll}
            disabled={!data.periods.length && !data.privacyAccepted}
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Aviso de privacidad ---------- */

function PrivacyGate({ onAccept }: { onAccept: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="privacidad-titulo"
      className="absolute inset-0 z-10 flex flex-col justify-center rounded-[2rem] bg-white/95 p-7 shadow-lift ring-1 ring-lila-200 backdrop-blur-md"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-lila-100 text-lila-600">
        <Lock className="size-6" aria-hidden="true" />
      </span>
      <h3
        id="privacidad-titulo"
        className="mt-5 font-display text-3xl font-semibold text-tinta"
      >
        Aviso de privacidad
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-tinta/80">
        <li>• Tus fechas se guardan solo en este dispositivo y navegador.</li>
        <li>• No pedimos cuenta, nombre ni correo.</li>
        <li>• No enviamos tus datos a ningún servidor ni a terceros.</li>
        <li>
          • Si compartes este dispositivo, otras personas podrían ver tu
          calendario.
        </li>
        <li>• Puedes borrar todo cuando quieras con un solo botón.</li>
      </ul>
      <FxButton onClick={onAccept} className="mt-7 w-full py-3.5">
        Entendido, quiero empezar
      </FxButton>
    </div>
  )
}

/* ---------- Registro ---------- */

function RegisterPanel({
  data,
  onChange,
  today,
}: {
  data: CycleData
  onChange: (d: CycleData) => void
  today: string
}) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [error, setError] = useState('')
  const periods = sortPeriods(data.periods).reverse()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!start) return setError('Elige la fecha en que empezó tu periodo.')
    const finish = end || addDays(start, 4)
    if (diffDays(start, today) > 0)
      return setError('La fecha de inicio no puede ser en el futuro.')
    if (diffDays(finish, start) < 0)
      return setError('La fecha de fin debe ser igual o posterior al inicio.')
    if (diffDays(finish, start) > 14)
      return setError(
        'Un periodo de más de 15 días es poco común. Revisa las fechas y, si es así, consulta en un establecimiento de salud.',
      )
    const overlaps = data.periods.some(
      (p) => diffDays(finish, p.start) >= 0 && diffDays(p.end, start) >= 0,
    )
    if (overlaps) return setError('Esas fechas se cruzan con un periodo ya registrado.')
    setError('')
    onChange({
      ...data,
      periods: [...data.periods, { id: newId(), start, end: finish }],
    })
    setStart('')
    setEnd('')
    toast.success('Periodo registrado. ¡Bien hecho por conocer tu cuerpo!')
  }

  const remove = (id: string) =>
    onChange({ ...data, periods: data.periods.filter((p) => p.id !== id) })

  return (
    <div className="reveal h-full rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-lila-100 sm:p-7">
      <h3 className="font-display text-2xl font-semibold text-tinta">
        Registrar periodo
      </h3>
      <form onSubmit={submit} className="mt-5 grid gap-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Inicio
            <input
              type="date"
              required
              max={today}
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="h-12 rounded-xl border border-input bg-lila-50 px-3 text-sm font-semibold normal-case tracking-normal text-tinta outline-none focus-visible:ring-4 focus-visible:ring-lila-200"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Fin
            <input
              type="date"
              min={start || undefined}
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="h-12 rounded-xl border border-input bg-lila-50 px-3 text-sm font-semibold normal-case tracking-normal text-tinta outline-none focus-visible:ring-4 focus-visible:ring-lila-200"
            />
          </label>
        </div>
        <p className="-mt-1 text-xs text-muted-foreground">
          ¿Aún no termina? Deja “Fin” vacío y estimaremos 5 días.
        </p>

        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="flex items-center justify-between">
            Duración de tu ciclo
            <span className="font-display text-2xl normal-case tracking-normal text-lila-600">
              {data.cycleLength} días
            </span>
          </span>
          <input
            type="range"
            min={MIN_CYCLE}
            max={MAX_CYCLE}
            value={data.cycleLength}
            onChange={(e) =>
              onChange({ ...data, cycleLength: Number(e.target.value) })
            }
            className="w-full accent-lila-600"
            aria-valuetext={`${data.cycleLength} días`}
          />
          <span className="flex justify-between text-[0.65rem] normal-case tracking-normal">
            <span>{MIN_CYCLE} días</span>
            <button
              type="button"
              className="font-bold text-lila-600 underline-offset-2 hover:underline"
              onClick={() => onChange({ ...data, cycleLength: DEFAULT_CYCLE })}
            >
              Usar 28 (promedio)
            </button>
            <span>{MAX_CYCLE} días</span>
          </span>
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-rosa-100 px-4 py-3 text-sm font-semibold text-rosa-600">
            {error}
          </p>
        )}

        <FxButton type="submit" className="w-full py-3.5">
          <CalendarPlus className="size-4" aria-hidden="true" />
          Guardar periodo
        </FxButton>
      </form>

      <h4 className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
        Tus registros
      </h4>
      {periods.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-lila-200 p-4 text-sm text-muted-foreground">
          Aún no hay periodos registrados. Empieza con el más reciente que
          recuerdes.
        </p>
      ) : (
        <ul className="mt-3 grid max-h-56 gap-2 overflow-y-auto pr-1">
          {periods.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-2xl bg-lila-50 px-4 py-2.5 text-sm"
            >
              <span>
                <span className="font-bold text-tinta">
                  {formatShort(p.start)} – {formatShort(p.end)}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {diffDays(p.end, p.start) + 1} días
                </span>
              </span>
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-rosa-100 hover:text-rosa-600"
                aria-label={`Eliminar periodo del ${formatShort(p.start)}`}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------- Resumen ---------- */

function SummaryPanel({ data }: { data: CycleData }) {
  const info = currentCycleInfo(data)
  const today = todayISO()
  const preds = predict(data, 3)
  const nextPeriod = preds.find((p) => diffDays(p.start, today) >= 0) ?? preds[0]
  const { length, fromHistory } = effectiveCycleLength(data)
  // Próxima ventana fértil que aún no terminó
  const fertile = [currentFertileWindow(data), ...preds].find(
    (w) => w !== null && diffDays(w.fertileEnd, today) >= 0,
  )
  const phaseName = info && phases.find((p) => p.id === info.phase)?.name

  const tiles = [
    {
      label: 'Día de tu ciclo',
      value: info ? `${info.day}` : '—',
      hint: info
        ? info.late
          ? 'Tu periodo podría estar retrasado'
          : phaseName
        : 'Registra un periodo',
      tone: 'lila',
    },
    {
      label: 'Próximo periodo',
      value: nextPeriod ? formatShort(nextPeriod.start) : '—',
      hint: nextPeriod
        ? (() => {
            const d = diffDays(nextPeriod.start, today)
            return d === 0 ? 'Podría empezar hoy' : `En ${d} días aprox.`
          })()
        : 'Estimación',
      tone: 'rosa',
    },
    {
      label: 'Días fértiles',
      value: fertile
        ? `${formatShort(fertile.fertileStart)} – ${formatShort(fertile.fertileEnd)}`
        : '—',
      hint: fertile ? `Ovulación ≈ ${formatShort(fertile.ovulation)}` : 'Estimación',
      tone: 'lila',
    },
    {
      label: 'Ciclo usado',
      value: `${length} días`,
      hint: fromHistory ? 'Promedio de tus registros' : 'Según lo que indicaste',
      tone: 'rosa',
    },
  ] as const

  return (
    <div className="reveal grid grid-cols-2 gap-3 xl:grid-cols-4" aria-live="polite">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={cn(
            'rounded-[1.5rem] p-5 shadow-soft ring-1',
            t.tone === 'lila' ? 'bg-white ring-lila-100' : 'bg-rosa-100/60 ring-rosa-200',
          )}
        >
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
            {t.label}
          </p>
          <p className="mt-2 font-display text-[1.65rem] leading-tight font-semibold text-tinta first-letter:uppercase">
            {t.value}
          </p>
          <p className="mt-1 text-xs font-semibold text-lila-700">{t.hint}</p>
        </div>
      ))}
      {preds.length > 1 && (
        <p className="col-span-full text-xs text-muted-foreground">
          Siguientes periodos estimados:{' '}
          {preds
            .slice(1)
            .map((p) => formatLong(p.start))
            .join(' · ')}
        </p>
      )}
    </div>
  )
}

/* ---------- Vista mensual ---------- */

function MonthCalendar({ data, today }: { data: CycleData; today: string }) {
  const [cursor, setCursor] = useState(() => today.slice(0, 7)) // "AAAA-MM"
  const dayMap = useMemo(() => buildDayMap(data), [data])

  const [y, m] = cursor.split('-').map(Number)
  const first = fromUTC(Date.UTC(y, m - 1, 1))
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7 // lunes = 0
  const monthName = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('es-PE', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const shift = (delta: number) =>
    setCursor(fromUTC(Date.UTC(y, m - 1 + delta, 1)).slice(0, 7))

  return (
    <div className="reveal rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-lila-100 sm:p-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl font-semibold text-tinta capitalize" aria-live="polite">
          {monthName}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Mes anterior"
            className="inline-flex size-10 items-center justify-center rounded-full bg-lila-50 text-lila-700 hover:bg-lila-100 focus-visible:ring-4 focus-visible:ring-lila-200 outline-none"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(today.slice(0, 7))}
            className="rounded-full bg-lila-50 px-4 text-xs font-bold text-lila-700 hover:bg-lila-100 focus-visible:ring-4 focus-visible:ring-lila-200 outline-none"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Mes siguiente"
            className="inline-flex size-10 items-center justify-center rounded-full bg-lila-50 text-lila-700 hover:bg-lila-100 focus-visible:ring-4 focus-visible:ring-lila-200 outline-none"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div aria-hidden="true" className="grid grid-cols-7 gap-1.5 text-center">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className="pb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>
        <ol
          aria-label={`Días de ${monthName}`}
          className="grid grid-cols-7 gap-1.5"
        >
          {Array.from({ length: lead }, (_, i) => (
            <li key={`v${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const iso = addDays(first, i)
            const kind = dayMap.get(iso) ?? null
            const isToday = iso === today
            return (
              <li
                key={iso}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-xl text-sm text-tinta/80 transition-transform hover:scale-105 sm:rounded-2xl sm:text-base',
                  kind ? dayStyles[kind] : 'bg-lila-50/60',
                  isToday && 'outline-2 outline-offset-2 outline-tinta',
                )}
              >
                <span aria-hidden="true">{i + 1}</span>
                <span className="sr-only">
                  {formatLong(iso)}
                  {kind ? `, ${dayLabels[kind]}` : ''}
                  {isToday ? ', hoy' : ''}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-tinta/80">
        <LegendItem className="bg-rosa-500">Periodo registrado</LegendItem>
        <LegendItem className="bg-rosa-100 ring-2 ring-rosa-300">Periodo estimado</LegendItem>
        <LegendItem className="bg-lila-100 ring-1 ring-lila-300">Días fértiles (estimado)</LegendItem>
        <LegendItem className="bg-lila-600">Ovulación (estimado)</LegendItem>
        <LegendItem className="bg-white outline-2 outline-tinta">Hoy</LegendItem>
      </ul>
    </div>
  )
}

function LegendItem({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <li className="flex items-center gap-2">
      <span className={cn('size-3.5 rounded-md', className)} aria-hidden="true" />
      {children}
    </li>
  )
}

/* ---------- Borrar todo ---------- */

function DeleteAllButton({
  onConfirm,
  disabled,
}: {
  onConfirm: () => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FxButton
        variant="secondary"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Borrar todos mis datos
      </FxButton>
      <DialogContent className="rounded-[1.75rem]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            ¿Borrar todos tus datos?
          </DialogTitle>
          <DialogDescription>
            Se eliminarán todos los periodos registrados y tus preferencias de
            este dispositivo. Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <FxButton variant="ghost">Cancelar</FxButton>
          </DialogClose>
          <FxButton
            variant="secondary"
            onClick={() => {
              onConfirm()
              setOpen(false)
            }}
          >
            Sí, borrar todo
          </FxButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

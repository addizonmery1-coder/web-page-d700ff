/**
 * Lógica del calendario menstrual.
 * Las fechas se manejan como cadenas locales "AAAA-MM-DD" y se calculan en UTC
 * para evitar desfases por horario de verano.
 * Los datos se guardan SOLO en el dispositivo (localStorage).
 */

export type Period = { id: string; start: string; end: string }

export type CycleData = {
  version: 1
  privacyAccepted: boolean
  cycleLength: number // duración del ciclo indicada por la usuaria
  periods: Period[]
}

export const STORAGE_KEY = 'adolever:calendario'
export const MIN_CYCLE = 21
export const MAX_CYCLE = 45
export const DEFAULT_CYCLE = 28
const DAY = 86_400_000

export const emptyData: CycleData = {
  version: 1,
  privacyAccepted: false,
  cycleLength: DEFAULT_CYCLE,
  periods: [],
}

/* ---------- Fechas ---------- */

export function toUTC(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

export function fromUTC(ms: number) {
  return new Date(ms).toISOString().slice(0, 10)
}

export function todayISO() {
  const now = new Date()
  return fromUTC(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
}

export function addDays(iso: string, days: number) {
  return fromUTC(toUTC(iso) + days * DAY)
}

export function diffDays(a: string, b: string) {
  return Math.round((toUTC(a) - toUTC(b)) / DAY)
}

export function formatLong(iso: string) {
  return new Date(toUTC(iso)).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}

export function formatShort(iso: string) {
  return new Date(toUTC(iso)).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

/* ---------- Almacenamiento local ---------- */

export function loadData(): CycleData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyData
    const parsed = JSON.parse(raw) as Partial<CycleData>
    return {
      ...emptyData,
      ...parsed,
      periods: Array.isArray(parsed.periods) ? parsed.periods : [],
    }
  } catch {
    return emptyData
  }
}

export function saveData(data: CycleData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Almacenamiento lleno o bloqueado (modo privado): se ignora en silencio.
  }
}

export function clearData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nada que borrar
  }
}

/* ---------- Cálculos ---------- */

export function sortPeriods(periods: Period[]) {
  return [...periods].sort((a, b) => toUTC(a.start) - toUTC(b.start))
}

/**
 * Duración del ciclo usada en las predicciones: si hay 2 o más periodos
 * registrados se usa el promedio real (dentro de un rango razonable);
 * si no, la duración que indicó la usuaria.
 */
export function effectiveCycleLength(data: CycleData) {
  const sorted = sortPeriods(data.periods)
  const gaps: number[] = []
  for (let i = 1; i < sorted.length; i++) {
    const gap = diffDays(sorted[i].start, sorted[i - 1].start)
    if (gap >= MIN_CYCLE && gap <= MAX_CYCLE) gaps.push(gap)
  }
  if (!gaps.length) return { length: data.cycleLength, fromHistory: false }
  const recent = gaps.slice(-6)
  const avg = Math.round(recent.reduce((s, g) => s + g, 0) / recent.length)
  return { length: avg, fromHistory: true }
}

export function averagePeriodLength(periods: Period[]) {
  if (!periods.length) return 5
  const lens = periods.map((p) => diffDays(p.end, p.start) + 1)
  return Math.max(1, Math.round(lens.reduce((s, l) => s + l, 0) / lens.length))
}

export type Prediction = {
  start: string
  end: string
  ovulation: string
  fertileStart: string
  fertileEnd: string
}

/**
 * Próximos periodos estimados. La ovulación se estima 14 días antes del
 * siguiente periodo y la ventana fértil abarca los 5 días previos a la
 * ovulación y el día siguiente (el espermatozoide puede vivir hasta 5 días).
 */
export function predict(data: CycleData, count = 3): Prediction[] {
  const sorted = sortPeriods(data.periods)
  const last = sorted.at(-1)
  if (!last) return []
  const { length } = effectiveCycleLength(data)
  const periodLen = averagePeriodLength(sorted)
  const today = todayISO()
  const out: Prediction[] = []

  // Ventana fértil del ciclo en curso (antes del primer periodo estimado)
  let cycleStart = last.start
  for (let i = 0; out.length < count && i < count + 24; i++) {
    const nextStart = addDays(cycleStart, length)
    const ovulation = addDays(nextStart, -14)
    const prediction = {
      start: nextStart,
      end: addDays(nextStart, periodLen - 1),
      ovulation,
      fertileStart: addDays(ovulation, -5),
      fertileEnd: addDays(ovulation, 1),
    }
    // Se omiten ciclos que ya pasaron por completo
    if (diffDays(prediction.end, today) >= 0) out.push(prediction)
    cycleStart = nextStart
  }
  return out
}

/** Ventana fértil del ciclo que empezó con el último periodo registrado. */
export function currentFertileWindow(data: CycleData) {
  const last = sortPeriods(data.periods).at(-1)
  if (!last) return null
  const { length } = effectiveCycleLength(data)
  const ovulation = addDays(last.start, length - 14)
  return {
    ovulation,
    fertileStart: addDays(ovulation, -5),
    fertileEnd: addDays(ovulation, 1),
  }
}

export type Phase = 'menstrual' | 'folicular' | 'ovulacion' | 'lutea'

export function currentCycleInfo(data: CycleData) {
  const last = sortPeriods(data.periods).at(-1)
  if (!last) return null
  const { length } = effectiveCycleLength(data)
  const today = todayISO()
  const day = diffDays(today, last.start) + 1
  if (day < 1) return null
  const periodLen = diffDays(last.end, last.start) + 1
  const ovDay = length - 14
  let phase: Phase
  if (day <= periodLen) phase = 'menstrual'
  else if (day < ovDay - 1) phase = 'folicular'
  else if (day <= ovDay + 1) phase = 'ovulacion'
  else phase = 'lutea'
  return { day, length, phase, late: day > length }
}

export type DayKind = 'period' | 'predicted' | 'fertile' | 'ovulation' | null

/** Clasifica cada día del calendario para pintarlo. */
export function buildDayMap(data: CycleData) {
  const map = new Map<string, DayKind>()
  const mark = (from: string, to: string, kind: DayKind) => {
    for (let d = from; diffDays(to, d) >= 0; d = addDays(d, 1)) {
      if (!map.has(d) || kind === 'period') map.set(d, kind)
    }
  }
  for (const p of data.periods) mark(p.start, p.end, 'period')
  const windows = [currentFertileWindow(data), ...predict(data, 6)].filter(
    (w): w is NonNullable<typeof w> => w !== null,
  )
  for (const w of windows) {
    if (!map.has(w.ovulation)) map.set(w.ovulation, 'ovulation')
    mark(w.fertileStart, w.fertileEnd, 'fertile')
  }
  for (const p of predict(data, 6)) mark(p.start, p.end, 'predicted')
  return map
}

export function newId() {
  return Math.random().toString(36).slice(2, 10)
}

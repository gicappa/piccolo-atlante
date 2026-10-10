import type {Periodo} from './types'

const giorno = new Intl.DateTimeFormat('it-IT', {day: 'numeric', timeZone: 'UTC'})
const giornoMese = new Intl.DateTimeFormat('it-IT', {day: 'numeric', month: 'long', timeZone: 'UTC'})
const completo = new Intl.DateTimeFormat('it-IT', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})
const meseAnno = new Intl.DateTimeFormat('it-IT', {month: 'long', year: 'numeric', timeZone: 'UTC'})

const d = (s: string) => new Date(`${s}T00:00:00Z`)

/** "3–17 agosto 2025", "28 dicembre 2024 – 3 gennaio 2025", "agosto 2025" */
export function formattaPeriodo(p: Periodo): string {
  const inizio = d(p.inizio)
  const fine = p.fine ? d(p.fine) : undefined
  if (p.soloMese) {
    if (!fine || meseAnno.format(fine) === meseAnno.format(inizio)) return meseAnno.format(inizio)
    return `${meseAnno.format(inizio)} – ${meseAnno.format(fine)}`
  }
  if (!fine || p.fine === p.inizio) return completo.format(inizio)
  const stessoAnno = inizio.getUTCFullYear() === fine.getUTCFullYear()
  if (stessoAnno && inizio.getUTCMonth() === fine.getUTCMonth())
    return `${giorno.format(inizio)}–${completo.format(fine)}`
  if (stessoAnno) return `${giornoMese.format(inizio)} – ${completo.format(fine)}`
  return `${completo.format(inizio)} – ${completo.format(fine)}`
}

export const formattaData = (s: string) => completo.format(d(s))

export const anno = (p: Periodo) => Number(p.inizio.slice(0, 4))

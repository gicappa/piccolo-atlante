import type {VoceArchivio} from '../components/Archivio.astro'
import {urlRacconto, urlTappa, urlViaggio} from './contenuti'
import {anno, formattaData, formattaPeriodo} from './formato'
import type {Luogo, Racconto, Tappa, Viaggio} from './types'

const unici = (a: (string | undefined)[]) => [...new Set(a.filter((x): x is string => !!x))]
const geo = (luoghi: Luogo[]) => ({paesi: unici(luoghi.map((l) => l.paese)), regioni: unici(luoghi.map((l) => l.regione))})
const luoghiViaggio = (v: Viaggio) => v.tappe.flatMap((t) => (t.luogo ? [t.luogo] : []))

export const etichetta = (tipo: string | undefined, quando: string) => [tipo, quando].filter(Boolean).join(' · ')

export const voceViaggio = (v: Viaggio): VoceArchivio => ({
  url: urlViaggio(v),
  titolo: v.titolo,
  sottotitolo: v.sottotitolo,
  etichetta: etichetta(v.tipo?.titolo, formattaPeriodo(v.periodo)),
  copertina: v.copertina,
  data: v.periodo.inizio,
  anno: anno(v.periodo),
  tipo: v.tipo?.titolo,
  ...geo(luoghiViaggio(v)),
})

export const voceRacconto = (r: Racconto): VoceArchivio => ({
  url: urlRacconto(r),
  titolo: r.titolo,
  sottotitolo: r.sottotitolo,
  etichetta: etichetta(r.tipo?.titolo ?? 'Racconto', formattaPeriodo(r.periodo)),
  copertina: r.copertina,
  data: r.periodo.inizio,
  anno: anno(r.periodo),
  tipo: r.tipo?.titolo,
  ...geo(r.luoghi),
})

export const voceTappa = (v: Viaggio, t: Tappa): VoceArchivio => ({
  url: urlTappa(v, t),
  titolo: t.titolo,
  sottotitolo: `Tappa ${t.numero} di «${v.titolo}»`,
  etichetta: etichetta(t.luogo?.nome, t.data ? formattaData(t.data) : formattaPeriodo(v.periodo)),
  copertina: t.copertina,
  data: t.data ?? v.periodo.inizio,
  anno: t.data ? Number(t.data.slice(0, 4)) : anno(v.periodo),
  tipo: v.tipo?.titolo,
  ...geo(t.luogo ? [t.luogo] : []),
})

import {demo} from './config'
import {caricaDaSanity} from './sanity'
import {contenutiDemo} from './demo'
import type {Contenuti, Luogo, Racconto, Tappa, Viaggio} from './types'
import {anno} from './formato'

let cache: Promise<Contenuti> | undefined

/** Tutti i contenuti del sito, letti una volta sola per build. Con DEMO=true usa i contenuti di prova. */
export function contenuti(): Promise<Contenuti> {
  cache ??= demo ? Promise.resolve(contenutiDemo) : caricaDaSanity()
  return cache
}

export const urlViaggio = (v: Pick<Viaggio, 'slug'>) => `/viaggi/${v.slug}/`
export const urlTappa = (v: Pick<Viaggio, 'slug'>, t: Pick<Tappa, 'slug'>) => `/viaggi/${v.slug}/${t.slug}/`
export const urlRacconto = (r: Pick<Racconto, 'slug'>) => `/racconti/${r.slug}/`

export type VoceAtlante = {titolo: string; sottotitolo: string; url: string}
export type PuntoAtlante = {nome: string; lat: number; lng: number; voci: VoceAtlante[]}

/** Ogni luogo raccontato, con i viaggi e i racconti che ci passano */
export function puntiAtlante({viaggi, racconti}: Contenuti): PuntoAtlante[] {
  const punti = new Map<string, PuntoAtlante>()
  const aggiungi = (l: Luogo, voce: VoceAtlante) => {
    const p = punti.get(l.id) ?? {nome: l.nome, lat: l.lat, lng: l.lng, voci: []}
    p.voci.push(voce)
    punti.set(l.id, p)
  }
  for (const v of viaggi)
    for (const t of v.tappe)
      if (t.luogo) aggiungi(t.luogo, {titolo: t.titolo, sottotitolo: `${v.titolo} · ${anno(v.periodo)}`, url: urlTappa(v, t)})
  for (const r of racconti)
    for (const l of r.luoghi) aggiungi(l, {titolo: r.titolo, sottotitolo: `Racconto · ${anno(r.periodo)}`, url: urlRacconto(r)})
  return [...punti.values()]
}

/** Paesi toccati da un viaggio o un racconto, per i filtri */
export const paesiViaggio = (v: Viaggio) => [...new Set(v.tappe.flatMap((t) => (t.luogo ? [t.luogo.paese] : [])))]
export const paesiRacconto = (r: Racconto) => [...new Set(r.luoghi.map((l) => l.paese))]

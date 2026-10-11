import {createClient} from '@sanity/client'
import {sanityDataset, sanityProjectId} from './config'
import {dimensioniDaRef} from './image'
import type {BloccoTesto, Contenuti, Foto, Luogo, Racconto, Tappa, Viaggio} from './types'

// Solo contenuti pubblicati: le bozze restano nel pannello finché non si preme "Pubblica"
const client = () =>
  createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: '2025-02-19',
    useCdn: false,
    perspective: 'published',
  })

const LUOGO = `{_id, nome, posizione, regione, paese}`
const TIPO = `{titolo, "slug": slug.current}`

const QUERY = `{
  "viaggi": *[_type == "viaggio" && defined(slug.current)] | order(periodo.inizio desc) {
    _id, titolo, "slug": slug.current, sottotitolo, "tipo": tipo->${TIPO}, periodo,
    copertina, introduzione, galleria, inEvidenza,
    "tappe": tappe[]->{_id, titolo, "slug": slug.current, data, copertina, testo, note, "luogo": luogo->${LUOGO}}
  },
  "racconti": *[_type == "racconto" && defined(slug.current)] | order(periodo.inizio desc) {
    _id, titolo, "slug": slug.current, sottotitolo, "tipo": tipo->${TIPO}, periodo,
    copertina, testo, galleria, inEvidenza, "luoghi": luoghi[]->${LUOGO}
  },
  "impostazioni": *[_id == "impostazioni"][0]{apertura, colophon}
}`

/* eslint-disable @typescript-eslint/no-explicit-any */
type Raw = any

function foto(raw: Raw): Foto | undefined {
  const ref = raw?.asset?._ref
  if (!ref) return undefined
  return {kind: 'sanity', source: raw, didascalia: raw.didascalia, alt: raw.alt, ...dimensioniDaRef(ref)}
}

const fotoList = (raw: Raw[] | null | undefined): Foto[] => (raw ?? []).map(foto).filter((f): f is Foto => !!f)

function testo(raw: Raw[] | null | undefined): BloccoTesto[] {
  return (raw ?? []).flatMap((b): BloccoTesto[] => {
    if (b._type === 'figura') {
      const f = foto(b.foto)
      return f ? [{_type: 'figura', _key: b._key, foto: f, formato: b.formato}] : []
    }
    if (b._type === 'galleria') return [{_type: 'galleria', _key: b._key, foto: fotoList(b.foto)}]
    return [b]
  })
}

function luogo(raw: Raw): Luogo | undefined {
  if (!raw?.posizione) return undefined
  return {
    id: raw._id,
    nome: raw.nome,
    lat: raw.posizione.lat,
    lng: raw.posizione.lng,
    regione: raw.regione ?? undefined,
    paese: raw.paese,
  }
}

function viaggio(raw: Raw): Viaggio {
  const tappe: Tappa[] = (raw.tappe ?? [])
    .filter((t: Raw) => t?.slug) // tappe ancora in bozza non compaiono
    .map((t: Raw, i: number) => ({
      id: t._id,
      slug: t.slug,
      titolo: t.titolo,
      numero: i + 1,
      data: t.data ?? undefined,
      luogo: luogo(t.luogo),
      copertina: foto(t.copertina),
      testo: testo(t.testo),
      note: t.note ?? undefined,
    }))
  return {
    id: raw._id,
    slug: raw.slug,
    titolo: raw.titolo,
    sottotitolo: raw.sottotitolo ?? undefined,
    tipo: raw.tipo ?? undefined,
    periodo: raw.periodo,
    copertina: foto(raw.copertina),
    introduzione: testo(raw.introduzione),
    tappe,
    galleria: fotoList(raw.galleria),
    inEvidenza: !!raw.inEvidenza,
  }
}

function racconto(raw: Raw): Racconto {
  return {
    id: raw._id,
    slug: raw.slug,
    titolo: raw.titolo,
    sottotitolo: raw.sottotitolo ?? undefined,
    tipo: raw.tipo ?? undefined,
    periodo: raw.periodo,
    luoghi: (raw.luoghi ?? []).map(luogo).filter((l: Luogo | undefined): l is Luogo => !!l),
    copertina: foto(raw.copertina),
    testo: testo(raw.testo),
    galleria: fotoList(raw.galleria),
    inEvidenza: !!raw.inEvidenza,
  }
}

export async function caricaDaSanity(): Promise<Contenuti> {
  const raw = await client().fetch<Raw>(QUERY)
  return {
    viaggi: raw.viaggi.filter((v: Raw) => v.periodo?.inizio).map(viaggio),
    racconti: raw.racconti.filter((r: Raw) => r.periodo?.inizio).map(racconto),
    impostazioni: raw.impostazioni ?? {},
  }
}

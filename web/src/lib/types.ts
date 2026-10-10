import type {SanityImageSource} from '@sanity/image-url'

export type Foto = {
  didascalia?: string
  alt?: string
  width: number
  height: number
} & ({kind: 'sanity'; source: SanityImageSource} | {kind: 'static'; url: string})

// Testo ricco (Portable Text) con foto e gallerie già normalizzate
export type BloccoTesto =
  | {_type: 'block'; _key: string; [k: string]: unknown}
  | {_type: 'figura'; _key: string; foto: Foto; formato?: 'normale' | 'larga' | 'piena'}
  | {_type: 'galleria'; _key: string; foto: Foto[]}

export type Periodo = {inizio: string; fine?: string; soloMese?: boolean}

export type Tipo = {titolo: string; slug: string}

export type Luogo = {
  id: string
  nome: string
  lat: number
  lng: number
  regione?: string
  paese: string
}

export type Tappa = {
  id: string
  slug: string
  titolo: string
  numero: number
  data?: string
  luogo?: Luogo
  copertina?: Foto
  testo: BloccoTesto[]
  note?: string
}

export type Viaggio = {
  id: string
  slug: string
  titolo: string
  sottotitolo?: string
  tipo?: Tipo
  periodo: Periodo
  copertina?: Foto
  introduzione: BloccoTesto[]
  tappe: Tappa[]
  galleria: Foto[]
  inEvidenza: boolean
}

export type Racconto = {
  id: string
  slug: string
  titolo: string
  sottotitolo?: string
  tipo?: Tipo
  periodo: Periodo
  luoghi: Luogo[]
  copertina?: Foto
  testo: BloccoTesto[]
  galleria: Foto[]
  inEvidenza: boolean
}

export type Impostazioni = {apertura?: string; colophon?: string}

export type Contenuti = {
  viaggi: Viaggio[]
  racconti: Racconto[]
  impostazioni: Impostazioni
}

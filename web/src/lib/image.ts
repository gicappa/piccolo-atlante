import {createImageUrlBuilder} from '@sanity/image-url'
import {sanityDataset, sanityProjectId} from './config'
import type {Foto} from './types'

const builder = createImageUrlBuilder({projectId: sanityProjectId, dataset: sanityDataset})

const LARGHEZZE = [480, 800, 1200, 1600, 2400]

/** URL di una foto alla larghezza richiesta; con `ratio` la ritaglia rispettando il punto focale. */
export function fotoUrl(foto: Foto, width: number, ratio?: number): string {
  if (foto.kind === 'static') return foto.url
  let img = builder.image(foto.source).width(width).auto('format').quality(78)
  if (ratio) img = img.height(Math.round(width / ratio)).fit('crop')
  return img.url()
}

export function fotoSrcset(foto: Foto, ratio?: number): string | undefined {
  if (foto.kind === 'static') return undefined
  return LARGHEZZE.filter((w) => w <= foto.width * 1.2)
    .map((w) => `${fotoUrl(foto, w, ratio)} ${w}w`)
    .join(', ')
}

/** Le dimensioni originali sono scritte nell'id dell'asset: image-<id>-<larghezza>x<altezza>-<formato> */
export function dimensioniDaRef(ref: string): {width: number; height: number} {
  const m = /-(\d+)x(\d+)-/.exec(ref)
  return m ? {width: Number(m[1]), height: Number(m[2])} : {width: 1600, height: 1067}
}

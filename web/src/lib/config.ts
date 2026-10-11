// Con DEMO=true il sito usa i contenuti di prova invece di quelli di Sanity
export const demo = import.meta.env.DEMO === 'true'
export const sanityProjectId = (import.meta.env.SANITY_PROJECT_ID as string | undefined) || 'e7n48nwr'
export const sanityDataset = (import.meta.env.SANITY_DATASET as string | undefined) || 'production'

// Mappa OpenStreetMap: gratuita e senza chiave, ammorbidita via CSS. Si può cambiare con PUBLIC_TILE_URL.
export const tileUrl =
  (import.meta.env.PUBLIC_TILE_URL as string | undefined) || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
export const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

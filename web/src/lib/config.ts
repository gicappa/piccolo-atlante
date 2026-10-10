export const sanityProjectId = import.meta.env.SANITY_PROJECT_ID as string | undefined
export const sanityDataset = (import.meta.env.SANITY_DATASET as string | undefined) || 'production'

// Mappa chiara e sobria (CARTO Positron, dati OpenStreetMap). Si può cambiare con PUBLIC_TILE_URL.
export const tileUrl =
  (import.meta.env.PUBLIC_TILE_URL as string | undefined) ||
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
export const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

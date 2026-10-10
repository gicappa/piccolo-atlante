import type {BloccoTesto} from './types'

/** Le prime righe di un testo, per le anteprime */
export function estratto(blocchi: BloccoTesto[], max = 260): string {
  const testo = blocchi
    .filter((b) => b._type === 'block')
    .map((b) => ((b as {children?: {text?: string}[]}).children ?? []).map((c) => c.text ?? '').join(''))
    .join(' ')
    .trim()
  if (testo.length <= max) return testo
  return testo.slice(0, testo.lastIndexOf(' ', max)) + '…'
}

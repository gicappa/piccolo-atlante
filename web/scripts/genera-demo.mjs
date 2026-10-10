// Genera le immagini segnaposto dei contenuti di prova (paesaggi stilizzati in SVG)
import {writeFileSync, mkdirSync} from 'node:fs'

const palette = {
  mare: ['#e9e4d8', '#c9d6d6', '#9fb8bb', '#6f9399', '#d9a77a'],
  citta: ['#efe7da', '#e0cdb2', '#c9a585', '#a77b5f', '#7d5a48'],
  monte: ['#eef0ec', '#c8d1cc', '#9aa9a3', '#6d807b', '#f1e2c6'],
  lago: ['#ece8df', '#cdd8d3', '#a8bdb6', '#7f9a95', '#e7c9a3'],
  campagna: ['#f0eadc', '#dcd3b5', '#bdb38a', '#8f8a62', '#e3b98f'],
}

function svg(nome, tema, w, h, seed) {
  const [cielo, a, b, c, sole] = palette[tema]
  let s = seed
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const colle = (base, amp, colore) => {
    const pts = []
    for (let x = 0; x <= w; x += w / 8) pts.push(`${x.toFixed(0)},${(base + (rnd() - 0.5) * amp).toFixed(0)}`)
    return `<polygon fill="${colore}" points="0,${h} ${pts.join(' ')} ${w},${h}"/>`
  }
  const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="${cielo}"/>
<circle cx="${(w * (0.2 + rnd() * 0.6)).toFixed(0)}" cy="${(h * 0.3).toFixed(0)}" r="${(Math.min(w, h) * 0.08).toFixed(0)}" fill="${sole}" opacity="0.8"/>
${colle(h * 0.55, h * 0.25, a)}
${colle(h * 0.68, h * 0.18, b)}
${colle(h * 0.82, h * 0.1, c)}
</svg>`
  writeFileSync(`public/demo/${nome}.svg`, out)
}

mkdirSync('public/demo', {recursive: true})
const temi = Object.keys(palette)
let i = 1
for (const tema of temi)
  for (const [w, h] of [[1600, 1067], [1200, 1500], [1600, 900]]) svg(`${tema}-${w}x${h}`, tema, w, h, i++ * 7919)

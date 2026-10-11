import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export type PuntoMappa = {
  nome: string
  lat: number
  lng: number
  numero?: number
  voci: {titolo: string; sottotitolo?: string; url: string}[]
}

type Dati = {
  punti: PuntoMappa[]
  modo: 'atlante' | 'percorso'
  tileUrl: string
  tileAttribution: string
}

function popup(p: PuntoMappa): HTMLElement {
  const box = document.createElement('div')
  const nome = document.createElement('div')
  nome.className = 'popup-nome'
  nome.textContent = p.nome
  box.append(nome)
  for (const v of p.voci) {
    const a = document.createElement('a')
    a.className = 'popup-voce'
    a.href = v.url
    a.textContent = v.titolo
    if (v.sottotitolo) {
      const s = document.createElement('span')
      s.textContent = v.sottotitolo
      a.append(s)
    }
    box.append(a)
  }
  return box
}

async function crea(el: HTMLElement) {
  const {punti, modo, tileUrl, tileAttribution} = JSON.parse(el.dataset.mappa!) as Dati
  const mappa = L.map(el, {scrollWheelZoom: false, worldCopyJump: true})
  L.tileLayer(tileUrl, {attribution: tileAttribution, maxZoom: 18}).addTo(mappa)
  const coordinate = punti.map((p) => L.latLng(p.lat, p.lng))

  if (modo === 'percorso') {
    if (coordinate.length > 1)
      L.polyline(coordinate, {color: '#8a4b2a', weight: 2, opacity: 0.8, dashArray: '6 6'}).addTo(mappa)
    punti.forEach((p, i) => {
      const icon = L.divIcon({className: '', html: `<div class="segno-tappa">${p.numero ?? i + 1}</div>`, iconSize: [26, 26]})
      L.marker(coordinate[i], {icon, title: p.nome}).bindPopup(popup(p)).addTo(mappa)
    })
  } else {
    // markercluster si aspetta Leaflet come variabile globale
    ;(window as unknown as {L: typeof L}).L = L
    await import('leaflet.markercluster')
    const gruppo = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 40})
    const icon = L.divIcon({className: '', html: '<div class="segno-luogo"></div>', iconSize: [12, 12]})
    punti.forEach((p, i) => gruppo.addLayer(L.marker(coordinate[i], {icon, title: p.nome}).bindPopup(popup(p))))
    mappa.addLayer(gruppo)
  }

  if (coordinate.length === 1) mappa.setView(coordinate[0], 11)
  else mappa.fitBounds(L.latLngBounds(coordinate), {padding: [40, 40], maxZoom: 12})
  // la rotella zooma solo dopo aver cliccato sulla mappa, così la pagina scorre normalmente
  mappa.once('focus', () => mappa.scrollWheelZoom.enable())
}

export function avviaMappe() {
  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const v of voci) {
        if (!v.isIntersecting) continue
        osservatore.unobserve(v.target)
        crea(v.target as HTMLElement)
      }
    },
    {rootMargin: '200px'},
  )
  document.querySelectorAll<HTMLElement>('[data-mappa]').forEach((el) => osservatore.observe(el))
}

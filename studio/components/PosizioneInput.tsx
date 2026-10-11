import {useEffect, useRef, useState, type FormEvent} from 'react'
import {set, unset, type ObjectInputProps} from 'sanity'
import {Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Geopoint = {_type: 'geopoint'; lat: number; lng: number}
type Risultato = {display_name: string; lat: string; lon: string}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUZIONE = '&copy; OpenStreetMap'

// Scelta della posizione di un luogo: si cerca per nome oppure si clicca sulla mappa
export function PosizioneInput(props: ObjectInputProps<Geopoint>) {
  const {value, onChange, readOnly} = props
  const contenitore = useRef<HTMLDivElement>(null)
  const mappa = useRef<L.Map | null>(null)
  const punto = useRef<L.CircleMarker | null>(null)
  const [ricerca, setRicerca] = useState('')
  const [risultati, setRisultati] = useState<Risultato[]>([])
  const [stato, setStato] = useState<string | null>(null)

  const scegli = (lat: number, lng: number) => {
    if (readOnly) return
    onChange(set({_type: 'geopoint', lat: arrotonda(lat), lng: arrotonda(lng)}))
  }

  useEffect(() => {
    if (!contenitore.current || mappa.current) return
    const m = L.map(contenitore.current, {scrollWheelZoom: false}).setView(
      value ? [value.lat, value.lng] : [44, 11],
      value ? 11 : 4,
    )
    L.tileLayer(TILE_URL, {attribution: ATTRIBUZIONE, maxZoom: 19}).addTo(m)
    m.on('click', (e: L.LeafletMouseEvent) => scegli(e.latlng.lat, e.latlng.lng))
    mappa.current = m
    return () => {
      m.remove()
      mappa.current = null
      punto.current = null
    }
    // la mappa si crea una volta sola
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const m = mappa.current
    if (!m) return
    if (!value) {
      punto.current?.remove()
      punto.current = null
      return
    }
    const pos: L.LatLngExpression = [value.lat, value.lng]
    if (punto.current) punto.current.setLatLng(pos)
    else
      punto.current = L.circleMarker(pos, {radius: 8, color: '#8a4b2a', weight: 2, fillOpacity: 0.6}).addTo(m)
  }, [value])

  const cerca = async (e: FormEvent) => {
    e.preventDefault()
    if (!ricerca.trim()) return
    setStato('Cerco…')
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=it&q=${encodeURIComponent(ricerca)}`
      const res = await fetch(url, {headers: {Accept: 'application/json'}})
      const dati: Risultato[] = await res.json()
      setRisultati(dati)
      setStato(dati.length ? null : 'Nessun risultato: prova a cliccare direttamente sulla mappa.')
    } catch {
      setStato('Ricerca non disponibile: clicca direttamente sulla mappa.')
    }
  }

  const usa = (r: Risultato) => {
    const lat = Number(r.lat)
    const lng = Number(r.lon)
    scegli(lat, lng)
    mappa.current?.setView([lat, lng], 12)
    setRisultati([])
  }

  return (
    <Stack gap={3}>
      <form onSubmit={cerca}>
        <Flex gap={2}>
          <Box flex={1}>
            <TextInput
              value={ricerca}
              placeholder="Cerca un luogo, es. Bormio o Lisbona"
              onChange={(e) => setRicerca(e.currentTarget.value)}
              disabled={readOnly}
            />
          </Box>
          <Button type="submit" text="Cerca" mode="ghost" disabled={readOnly} />
        </Flex>
      </form>
      {stato && <Text size={1} muted>{stato}</Text>}
      {risultati.length > 0 && (
        <Stack gap={1}>
          {risultati.map((r) => (
            <Button
              key={`${r.lat},${r.lon}`}
              mode="bleed"
              justify="flex-start"
              text={r.display_name}
              onClick={() => usa(r)}
            />
          ))}
        </Stack>
      )}
      <Card border radius={2} overflow="hidden">
        <div ref={contenitore} style={{height: 340}} />
      </Card>
      <Flex justify="space-between" align="center">
        <Text size={1} muted>
          {value ? `${value.lat}, ${value.lng}` : 'Nessuna posizione: clicca sulla mappa.'}
        </Text>
        {value && !readOnly && <Button text="Rimuovi" mode="bleed" tone="critical" onClick={() => onChange(unset())} />}
      </Flex>
    </Stack>
  )
}

const arrotonda = (n: number) => Math.round(n * 1e5) / 1e5

# Piccolo Atlante

*Storie di luoghi vicini e lontani.* Un diario di viaggio di famiglia: viaggi divisi in tappe, racconti brevi, foto e mappe.

```
web/     il sito pubblico (Astro, statico)
studio/  il pannello dove si scrivono i contenuti (Sanity Studio)
```

## Provarlo subito

```sh
npm install
npm run dev        # sito su http://localhost:4321 con i contenuti di prova
```

Finché `SANITY_PROJECT_ID` non è impostato, il sito usa i contenuti di prova in `web/src/lib/demo.ts`.

## Collegare Sanity (una volta sola)

1. Crea un progetto gratuito su [sanity.io](https://www.sanity.io) con il dataset `production` e annota il *Project ID*.
2. Copia `studio/.env.example` in `studio/.env` e `web/.env.example` in `web/.env`, inserendo il Project ID.
3. Carica i tipi di esperienza e le impostazioni iniziali:
   ```sh
   cd studio && npx sanity dataset import seed/tipi.ndjson production
   ```
4. Avvia il pannello in locale con `npm run studio`, oppure pubblicalo su `https://piccolo-atlante.sanity.studio` con `npm run studio:deploy`.

Per far entrare altre persone nel pannello: *Members* nella pagina del progetto su sanity.io.

## Pubblicare il sito (Cloudflare Pages)

1. Collega questo repository a Cloudflare Pages.
   - Comando di build: `npm run build`
   - Cartella di output: `web/dist`
   - Variabili d'ambiente: `SANITY_PROJECT_ID`, `SANITY_DATASET=production`, `SITE_URL=https://il-dominio`
2. In Cloudflare Pages crea un *Deploy hook* e copiane l'URL.
3. In Sanity, *API → Webhooks*: nuovo webhook con quell'URL, filtro
   `_type in ["viaggio", "tappa", "racconto", "luogo", "tipo", "impostazioni"]`, sugli eventi crea, aggiorna e cancella.

Da quel momento ogni "Pubblica" nel pannello rigenera il sito in un paio di minuti. Le bozze non escono mai: il sito legge solo i contenuti pubblicati.

## Come sono fatti i contenuti

| Tipo | Cosa contiene |
|---|---|
| **Viaggio** | titolo, sottotitolo, tipo, periodo, copertina, introduzione, tappe in ordine, galleria |
| **Tappa** | titolo, luogo, data, foto principale, racconto, note pratiche |
| **Racconto** | contenuto breve e autonomo: un luogo o pochi, testo, galleria |
| **Luogo** | nome, posizione (scelta sulla mappa), regione, paese |
| **Tipo di esperienza** | elenco modificabile: weekend, cammino, città… |
| **Impostazioni** | frase d'apertura della home e colophon |

I testi accettano foto singole (normali, larghe o a tutta pagina) e gallerie nel punto esatto del racconto.
Anno, paese e regione per i filtri si ricavano da date e luoghi.

## Mappe

Leaflet con la mappa CARTO Positron (dati OpenStreetMap), resa più calda con un filtro seppia. Per cambiarla basta `PUBLIC_TILE_URL` in `web/.env`.

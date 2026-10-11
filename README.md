# Piccolo Atlante

*Storie di luoghi vicini e lontani.* Un diario di viaggio di famiglia: viaggi divisi in tappe, racconti brevi, foto e mappe.

```
web/     il sito pubblico (Astro, statico)
studio/  il pannello dove si scrivono i contenuti (Sanity Studio)
```

## Provarlo subito

```sh
npm install
npm run dev        # sito su http://localhost:4321 con i contenuti di Sanity
```

Per lavorare con i contenuti di prova in `web/src/lib/demo.ts`, copia `web/.env.example` in `web/.env` (contiene `DEMO=true`).

## Collegare Sanity (una volta sola)

Il progetto Sanity è `e7n48nwr` (dataset `production`), già impostato nel pannello.

1. Accedi con `cd studio && npx sanity login`.
2. Carica i tipi di esperienza e le impostazioni iniziali:
   ```sh
   npx sanity dataset import seed/tipi.ndjson production
   ```
3. Avvia il pannello in locale con `npm run studio`, oppure pubblicalo su `https://piccolo-atlante.sanity.studio` con `npm run studio:deploy`.

Per far entrare altre persone nel pannello: *Members* nella pagina del progetto su sanity.io.

## Pubblicare il sito (Cloudflare)

Il progetto Cloudflare si chiama `piccolo-atlante` ed è collegato a questo repository: ogni push su `main` ricostruisce e pubblica il sito.
La configurazione è in `wrangler.jsonc` (si pubblicano solo i file statici di `web/dist`).

- Comando di build: `npm run build`
- Comando di deploy: `npx wrangler deploy`
- Nessuna variabile obbligatoria: il progetto Sanity è già nel codice. Quando c'è il dominio, aggiungi `SITE_URL` tra le variabili **di build** (Settings → Build → Variables and secrets), non tra quelle del Worker.

Per ripubblicare quando si preme "Pubblica" nel pannello: in Cloudflare crea un *Deploy hook* (Settings → Build → Deploy hooks), poi in Sanity *API → Webhooks* crea un webhook con quell'URL, filtro
`_type in ["viaggio", "tappa", "racconto", "luogo", "tipo", "impostazioni"]`, sugli eventi crea, aggiorna e cancella.

Le bozze non escono mai: il sito legge solo i contenuti pubblicati.

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

Leaflet con le mappe di OpenStreetMap (gratuite, senza chiave), ammorbidite con un filtro CSS. Per cambiarla basta `PUBLIC_TILE_URL` in `web/.env`.

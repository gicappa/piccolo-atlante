// Contenuti di prova: servono a vedere il sito prima di collegare Sanity. Testi e foto sono segnaposto.
import type {BloccoTesto, Contenuti, Foto, Luogo} from './types'

type Tema = 'mare' | 'citta' | 'monte' | 'lago' | 'campagna'
type Formato = 'orizzontale' | 'verticale' | 'panorama'

const DIM: Record<Formato, [number, number]> = {
  orizzontale: [1600, 1067],
  verticale: [1200, 1500],
  panorama: [1600, 900],
}

const foto = (tema: Tema, formato: Formato = 'orizzontale', didascalia?: string): Foto => {
  const [width, height] = DIM[formato]
  return {kind: 'static', url: `/demo/${tema}-${width}x${height}.svg`, width, height, didascalia}
}

let chiave = 0
const k = () => `demo${chiave++}`
const p = (testo: string, style = 'normal'): BloccoTesto => ({
  _type: 'block',
  _key: k(),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: k(), text: testo, marks: []}],
})
const citazione = (testo: string) => p(testo, 'blockquote')
const figura = (f: Foto, formato: 'normale' | 'larga' | 'piena' = 'larga'): BloccoTesto => ({
  _type: 'figura',
  _key: k(),
  foto: f,
  formato,
})
const galleria = (...f: Foto[]): BloccoTesto => ({_type: 'galleria', _key: k(), foto: f})

const luogo = (id: string, nome: string, lat: number, lng: number, paese: string, regione?: string): Luogo => ({
  id,
  nome,
  lat,
  lng,
  paese,
  regione,
})

const lisbona = luogo('lisbona', 'Lisbona', 38.7139, -9.1394, 'Portogallo', 'Lisbona')
const sintra = luogo('sintra', 'Sintra', 38.7979, -9.3881, 'Portogallo', 'Lisbona')
const coimbra = luogo('coimbra', 'Coimbra', 40.2033, -8.4103, 'Portogallo', 'Centro')
const porto = luogo('porto', 'Porto', 41.1496, -8.611, 'Portogallo', 'Nord')
const ortisei = luogo('ortisei', 'Ortisei', 46.5747, 11.6714, 'Italia', 'Trentino-Alto Adige')
const siusi = luogo('siusi', 'Alpe di Siusi', 46.5406, 11.6247, 'Italia', 'Trentino-Alto Adige')
const seceda = luogo('seceda', 'Seceda', 46.6006, 11.7258, 'Italia', 'Trentino-Alto Adige')
const bergamo = luogo('bergamo', 'Bergamo Alta', 45.7037, 9.6627, 'Italia', 'Lombardia')
const varenna = luogo('varenna', 'Varenna', 46.0103, 9.2836, 'Italia', 'Lombardia')
const bellano = luogo('bellano', 'Bellano', 46.0419, 9.3011, 'Italia', 'Lombardia')

const testoProva =
  'Questo è un testo di prova. Qui andrà il racconto vero: cosa abbiamo visto, chi abbiamo incontrato, la luce del mattino e la stanchezza buona della sera.'

export const contenutiDemo: Contenuti = {
  impostazioni: {
    apertura:
      'Un piccolo atlante di famiglia. Luoghi lontani e luoghi a due passi da casa, raccontati con calma, una tappa alla volta.',
    colophon: 'Scritto a mano, un viaggio alla volta.',
  },
  viaggi: [
    {
      id: 'portogallo',
      slug: 'portogallo-da-lisbona-a-porto',
      titolo: 'Portogallo, da Lisbona a Porto',
      sottotitolo: 'Dieci giorni lungo l’Atlantico, tra azulejos e saudade',
      tipo: {titolo: 'Grande viaggio', slug: 'grande-viaggio'},
      periodo: {inizio: '2025-08-03', fine: '2025-08-13'},
      copertina: foto('mare', 'panorama', 'L’oceano visto dal Cabo da Roca'),
      inEvidenza: true,
      introduzione: [
        p(testoProva),
        p(
          'Siamo partiti senza un programma preciso, con una sola regola: fermarsi quando un posto ci chiedeva di restare. Il racconto cresce un pezzo alla volta.',
        ),
        citazione('Il viaggio non comincia quando si parte, né finisce quando si torna.'),
      ],
      tappe: [
        {
          id: 'lisbona-t',
          slug: 'lisbona',
          titolo: 'Lisbona, la città dei sette colli',
          numero: 1,
          data: '2025-08-03',
          luogo: lisbona,
          copertina: foto('citta', 'orizzontale', 'I tetti dell’Alfama'),
          testo: [
            p(testoProva),
            figura(foto('citta', 'panorama', 'Il tram 28 in salita')),
            p('Un secondo paragrafo di prova, per vedere come respira il testo tra una foto e l’altra.'),
          ],
          note: 'Dormito in una piccola pensione all’Alfama. Pastéis de nata da Manteigaria, senza dubbio.',
        },
        {
          id: 'sintra-t',
          slug: 'sintra',
          titolo: 'Sintra tra la nebbia',
          numero: 2,
          data: '2025-08-06',
          luogo: sintra,
          copertina: foto('monte', 'verticale'),
          testo: [
            p(testoProva),
            galleria(foto('monte', 'verticale'), foto('campagna', 'orizzontale'), foto('lago', 'orizzontale')),
          ],
        },
        {
          id: 'coimbra-t',
          slug: 'coimbra',
          titolo: 'Coimbra e la sua università',
          numero: 3,
          data: '2025-08-08',
          luogo: coimbra,
          copertina: foto('campagna', 'orizzontale'),
          testo: [p(testoProva)],
        },
        {
          id: 'porto-t',
          slug: 'porto',
          titolo: 'Porto al tramonto',
          numero: 4,
          data: '2025-08-10',
          luogo: porto,
          copertina: foto('mare', 'orizzontale', 'Il Douro dal ponte Dom Luís'),
          testo: [p(testoProva), figura(foto('mare', 'verticale', 'Ribeira'), 'normale'), p(testoProva)],
          note: 'Le cantine del vino di Porto sono dall’altra parte del fiume, a Vila Nova de Gaia.',
        },
      ],
      galleria: [
        foto('mare', 'orizzontale'),
        foto('citta', 'verticale'),
        foto('campagna', 'panorama'),
        foto('lago', 'orizzontale'),
        foto('citta', 'orizzontale'),
        foto('monte', 'verticale'),
      ],
    },
    {
      id: 'dolomiti',
      slug: 'weekend-in-val-gardena',
      titolo: 'Un weekend in Val Gardena',
      sottotitolo: 'Prati, nuvole e un rifugio con lo strudel',
      tipo: {titolo: 'Weekend', slug: 'weekend'},
      periodo: {inizio: '2024-07-13', fine: '2024-07-14'},
      copertina: foto('monte', 'panorama'),
      inEvidenza: false,
      introduzione: [p(testoProva)],
      tappe: [
        {
          id: 'ortisei-t',
          slug: 'ortisei',
          titolo: 'Arrivo a Ortisei',
          numero: 1,
          data: '2024-07-13',
          luogo: ortisei,
          copertina: foto('monte', 'orizzontale'),
          testo: [p(testoProva)],
        },
        {
          id: 'seceda-t',
          slug: 'seceda',
          titolo: 'Su al Seceda',
          numero: 2,
          data: '2024-07-13',
          luogo: seceda,
          copertina: foto('monte', 'verticale'),
          testo: [p(testoProva), figura(foto('monte', 'panorama', 'Le Odle'), 'piena')],
        },
        {
          id: 'siusi-t',
          slug: 'alpe-di-siusi',
          titolo: 'Alpe di Siusi',
          numero: 3,
          data: '2024-07-14',
          luogo: siusi,
          copertina: foto('campagna', 'orizzontale'),
          testo: [p(testoProva)],
        },
      ],
      galleria: [],
    },
  ],
  racconti: [
    {
      id: 'bergamo',
      slug: 'una-domenica-a-bergamo-alta',
      titolo: 'Una domenica a Bergamo Alta',
      sottotitolo: 'Le mura, la funicolare e una polenta',
      tipo: {titolo: 'Città', slug: 'citta'},
      periodo: {inizio: '2025-03-16'},
      luoghi: [bergamo],
      copertina: foto('citta', 'orizzontale'),
      testo: [p(testoProva), figura(foto('citta', 'panorama')), p(testoProva)],
      galleria: [foto('citta', 'verticale'), foto('campagna', 'orizzontale')],
      inEvidenza: true,
    },
    {
      id: 'viandante',
      slug: 'sul-sentiero-del-viandante',
      titolo: 'Sul Sentiero del Viandante',
      sottotitolo: 'Da Varenna a Bellano, sopra il lago',
      tipo: {titolo: 'Passeggiata', slug: 'passeggiata'},
      periodo: {inizio: '2024-10-05'},
      luoghi: [varenna, bellano],
      copertina: foto('lago', 'panorama'),
      testo: [p(testoProva)],
      galleria: [],
      inEvidenza: false,
    },
  ],
}

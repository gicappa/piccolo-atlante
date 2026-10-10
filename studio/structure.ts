import type {StructureResolver} from 'sanity/structure'

export const singletonTypes = new Set(['impostazioni'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Piccolo Atlante')
    .items([
      S.documentTypeListItem('viaggio').title('Viaggi'),
      S.documentTypeListItem('racconto').title('Racconti'),
      S.divider(),
      S.documentTypeListItem('tappa').title('Tutte le tappe'),
      S.documentTypeListItem('luogo').title('Luoghi'),
      S.documentTypeListItem('tipo').title('Tipi di esperienza'),
      S.divider(),
      S.listItem()
        .title('Impostazioni del sito')
        .id('impostazioni')
        .child(S.document().schemaType('impostazioni').documentId('impostazioni')),
    ])

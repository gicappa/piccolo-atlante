import {defineField, defineType} from 'sanity'

// Una fotografia con didascalia. Il "punto focale" (hotspot) evita che i ritagli taglino il soggetto.
export const foto = defineType({
  name: 'foto',
  title: 'Foto',
  type: 'image',
  options: {hotspot: true, metadata: ['lqip', 'palette', 'exif', 'location']},
  fields: [
    defineField({
      name: 'didascalia',
      title: 'Didascalia',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Descrizione per chi non vede l’immagine',
      description: 'Facoltativa: una frase su cosa mostra la foto.',
      type: 'string',
    }),
  ],
})

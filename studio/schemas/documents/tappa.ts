import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons/Pin'

export const tappa = defineType({
  name: 'tappa',
  title: 'Tappa',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({name: 'titolo', title: 'Titolo', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Indirizzo della pagina',
      type: 'slug',
      options: {source: 'titolo', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'luogo',
      title: 'Luogo',
      description: 'Dove si trova la tappa sulla mappa. Puoi sceglierne uno esistente o crearne uno nuovo.',
      type: 'reference',
      to: [{type: 'luogo'}],
    }),
    defineField({name: 'data', title: 'Data', type: 'date'}),
    defineField({name: 'copertina', title: 'Foto principale', type: 'foto'}),
    defineField({name: 'testo', title: 'Racconto', type: 'testo'}),
    defineField({
      name: 'note',
      title: 'Note pratiche e ricordi',
      description: 'Dove abbiamo dormito, cosa abbiamo mangiato, un consiglio. Appare in un riquadro a parte.',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'titolo', luogo: 'luogo.nome', data: 'data', media: 'copertina'},
    prepare: ({title, luogo, data, media}) => ({title, media, subtitle: [luogo, data].filter(Boolean).join(' · ')}),
  },
})

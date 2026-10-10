import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'

// Un contenuto breve e autonomo: una passeggiata, una giornata, una città
export const racconto = defineType({
  name: 'racconto',
  title: 'Racconto',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({name: 'titolo', title: 'Titolo', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Indirizzo della pagina',
      type: 'slug',
      options: {source: 'titolo', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({name: 'sottotitolo', title: 'Sottotitolo', type: 'string'}),
    defineField({name: 'tipo', title: 'Tipo di esperienza', type: 'reference', to: [{type: 'tipo'}]}),
    defineField({name: 'periodo', title: 'Quando', type: 'periodo', validation: (r) => r.required()}),
    defineField({
      name: 'luoghi',
      title: 'Luoghi',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'luogo'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({name: 'copertina', title: 'Foto di copertina', type: 'foto'}),
    defineField({name: 'testo', title: 'Racconto', type: 'testo'}),
    defineField({
      name: 'galleria',
      title: 'Galleria',
      type: 'array',
      of: [{type: 'foto'}],
      options: {layout: 'grid'},
    }),
    defineField({name: 'inEvidenza', title: 'In evidenza in home', type: 'boolean', initialValue: false}),
  ],
  orderings: [
    {title: 'Più recenti', name: 'recenti', by: [{field: 'periodo.inizio', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'titolo', inizio: 'periodo.inizio', media: 'copertina'},
    prepare: ({title, inizio, media}) => ({title, media, subtitle: inizio?.slice(0, 4)}),
  },
})

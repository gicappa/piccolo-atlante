import {defineArrayMember, defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'

export const viaggio = defineType({
  name: 'viaggio',
  title: 'Viaggio',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    {name: 'racconto', title: 'Racconto', default: true},
    {name: 'tappe', title: 'Tappe'},
    {name: 'foto', title: 'Foto'},
  ],
  fields: [
    defineField({name: 'titolo', title: 'Titolo', type: 'string', group: 'racconto', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Indirizzo della pagina',
      description: 'Si genera dal titolo: premi "Genera".',
      type: 'slug',
      group: 'racconto',
      options: {source: 'titolo', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({name: 'sottotitolo', title: 'Sottotitolo', type: 'string', group: 'racconto'}),
    defineField({
      name: 'tipo',
      title: 'Tipo di esperienza',
      type: 'reference',
      to: [{type: 'tipo'}],
      group: 'racconto',
    }),
    defineField({name: 'periodo', title: 'Periodo', type: 'periodo', group: 'racconto', validation: (r) => r.required()}),
    defineField({name: 'copertina', title: 'Foto di copertina', type: 'foto', group: 'racconto'}),
    defineField({
      name: 'introduzione',
      title: 'Introduzione',
      description: 'Il racconto generale del viaggio. Le tappe si scrivono a parte.',
      type: 'testo',
      group: 'racconto',
    }),
    defineField({
      name: 'tappe',
      title: 'Tappe, nell’ordine del viaggio',
      description: 'Trascina per riordinare. Con "Aggiungi" puoi creare una tappa nuova direttamente da qui.',
      type: 'array',
      group: 'tappe',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tappa'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'galleria',
      title: 'Galleria del viaggio',
      description: 'Foto da mostrare in fondo alla pagina, oltre a quelle delle tappe.',
      type: 'array',
      group: 'foto',
      of: [{type: 'foto'}],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'inEvidenza',
      title: 'In evidenza in home',
      type: 'boolean',
      group: 'racconto',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Più recenti', name: 'recenti', by: [{field: 'periodo.inizio', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'titolo', inizio: 'periodo.inizio', media: 'copertina', tappe: 'tappe'},
    prepare: ({title, inizio, media, tappe}) => ({
      title,
      media,
      subtitle: [inizio?.slice(0, 4), `${tappe?.length ?? 0} tappe`].filter(Boolean).join(' · '),
    }),
  },
})

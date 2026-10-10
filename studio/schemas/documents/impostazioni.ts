import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const impostazioni = defineType({
  name: 'impostazioni',
  title: 'Impostazioni del sito',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'apertura',
      title: 'Frase d’apertura della home',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'colophon',
      title: 'Colophon',
      description: 'Le poche parole a fondo pagina.',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {prepare: () => ({title: 'Impostazioni del sito'})},
})

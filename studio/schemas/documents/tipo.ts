import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const tipo = defineType({
  name: 'tipo',
  title: 'Tipo di esperienza',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'titolo', title: 'Nome', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Identificativo',
      type: 'slug',
      options: {source: 'titolo'},
      validation: (r) => r.required(),
    }),
  ],
})

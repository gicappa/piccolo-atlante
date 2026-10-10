import {defineField, defineType} from 'sanity'

// Una foto inserita in un punto preciso del testo
export const figura = defineType({
  name: 'figura',
  title: 'Foto nel testo',
  type: 'object',
  fields: [
    defineField({name: 'foto', title: 'Foto', type: 'foto', validation: (r) => r.required()}),
    defineField({
      name: 'formato',
      title: 'Formato',
      type: 'string',
      initialValue: 'normale',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Come il testo', value: 'normale'},
          {title: 'Più larga', value: 'larga'},
          {title: 'A tutta pagina', value: 'piena'},
        ],
      },
    }),
  ],
  preview: {
    select: {media: 'foto', title: 'foto.didascalia'},
    prepare: ({media, title}) => ({media, title: title || 'Foto', subtitle: 'Foto nel testo'}),
  },
})

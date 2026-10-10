import {defineField, defineType} from 'sanity'

// Un gruppo di foto inserito nel testo
export const galleria = defineType({
  name: 'galleria',
  title: 'Galleria nel testo',
  type: 'object',
  fields: [
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'array',
      of: [{type: 'foto'}],
      options: {layout: 'grid'},
      validation: (r) => r.min(2),
    }),
  ],
  preview: {
    select: {media: 'foto.0', foto: 'foto'},
    prepare: ({media, foto}) => ({media, title: `Galleria di ${foto?.length ?? 0} foto`}),
  },
})

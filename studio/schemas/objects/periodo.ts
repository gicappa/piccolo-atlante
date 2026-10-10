import {defineField, defineType} from 'sanity'

export const periodo = defineType({
  name: 'periodo',
  title: 'Periodo',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({name: 'inizio', title: 'Dal', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'fine',
      title: 'Al',
      type: 'date',
      validation: (r) =>
        r.custom((fine, ctx) => {
          const inizio = (ctx.parent as {inizio?: string})?.inizio
          return !fine || !inizio || fine >= inizio ? true : 'La fine viene prima dell’inizio'
        }),
    }),
    defineField({
      name: 'soloMese',
      title: 'Mostra solo mese e anno',
      description: 'Utile quando non ci si ricorda i giorni esatti.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

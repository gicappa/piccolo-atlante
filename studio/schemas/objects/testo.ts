import {defineArrayMember, defineType} from 'sanity'

// Testo narrativo: paragrafi, titoletti, citazioni, foto e gallerie nel punto giusto
export const testo = defineType({
  name: 'testo',
  title: 'Testo',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragrafo', value: 'normal'},
        {title: 'Titoletto', value: 'h2'},
        {title: 'Citazione', value: 'blockquote'},
      ],
      lists: [{title: 'Elenco', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Grassetto', value: 'strong'},
          {title: 'Corsivo', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [{name: 'href', title: 'Indirizzo', type: 'url'}],
          },
        ],
      },
    }),
    defineArrayMember({type: 'figura'}),
    defineArrayMember({type: 'galleria'}),
  ],
})

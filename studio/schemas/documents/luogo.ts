import {defineField, defineType} from 'sanity'
import {MarkerIcon} from '@sanity/icons/Marker'
import {PosizioneInput} from '../../components/PosizioneInput'

export const luogo = defineType({
  name: 'luogo',
  title: 'Luogo',
  type: 'document',
  icon: MarkerIcon,
  fields: [
    defineField({name: 'nome', title: 'Nome', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'posizione',
      title: 'Posizione sulla mappa',
      description: 'Cerca il nome del luogo oppure clicca sulla mappa.',
      type: 'geopoint',
      components: {input: PosizioneInput},
      validation: (r) => r.required(),
    }),
    defineField({name: 'regione', title: 'Regione o zona', type: 'string'}),
    defineField({name: 'paese', title: 'Paese', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'nome', regione: 'regione', paese: 'paese'},
    prepare: ({title, regione, paese}) => ({title, subtitle: [regione, paese].filter(Boolean).join(', ')}),
  },
})

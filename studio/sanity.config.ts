import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {itITLocale} from '@sanity/locale-it-it'
import {schemaTypes} from './schemas'
import {structure, singletonTypes} from './structure'

export default defineConfig({
  name: 'piccolo-atlante',
  title: 'Piccolo Atlante',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'e7n48nwr',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure}), itITLocale()],
  schema: {
    types: schemaTypes,
    // Le impostazioni sono un documento unico: niente "crea nuovo"
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})

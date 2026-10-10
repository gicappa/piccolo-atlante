import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'e7n48nwr',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Lo Studio pubblicato sarà su https://piccolo-atlante.sanity.studio
  studioHost: 'piccolo-atlante',
  deployment: {autoUpdates: true},
})

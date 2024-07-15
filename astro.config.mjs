import { defineConfig } from 'astro/config'
import { i18nConfig } from './src/i18n/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import vue from '@astrojs/vue'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  i18n: i18nConfig,
  site: 'http://localhost:4321/', // Site URL from env
  integrations: [sitemap(), react(), vue(), partytown()]
})

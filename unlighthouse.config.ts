import { defineConfig } from 'unlighthouse'
import { loadEnv } from 'vite'

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '')

export default defineConfig({
  site: SITE_URL,
  scanner: {
    sitemap: [`${SITE_URL}/sitemap-0.xml`]
  }
})

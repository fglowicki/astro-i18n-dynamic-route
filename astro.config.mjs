import { defineConfig } from "astro/config";
import { i18nConfig } from "./src/i18n/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  i18n: i18nConfig,
  site: "http://localhost:4321/", // Site URL from env
  integrations: [sitemap()],
});

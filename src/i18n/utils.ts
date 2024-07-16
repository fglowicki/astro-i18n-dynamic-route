// i18n util based on https://docs.astro.build/en/recipes/i18n/#translate-routes

import { defaultLocale, locales } from './config'
import { translations, routes } from './translations'

type Path = keyof (typeof routes)[typeof defaultLocale]
type Locale = keyof typeof translations
type TranslationKey = keyof (typeof translations)[typeof defaultLocale]

export function getLocaleFromUrl(url: URL) {
  const [, locale] = url.pathname.split('/')
  if (locale in translations) return locale as Locale
  return defaultLocale
}

export function getRouteFromUrl(url: URL) {
  const locale = getLocaleFromUrl(url)
  const pathname = new URL(url).pathname
  const parts = pathname?.split('/')

  const path = Object.values(routes[locale]).find(route =>
    parts.includes(route)
  )
  if (!path) return

  const getKeyByValue = (
    obj: Record<string, string>,
    value: string
  ): string | undefined => Object.keys(obj).find(key => obj[key] === value)
  const reversedKey = getKeyByValue(routes[locale], path)
  if (!reversedKey) return

  return reversedKey as Path
}

export function useTranslations(url: URL) {
  const locale = getLocaleFromUrl(url)
  return function t(key: TranslationKey) {
    return translations[locale][key] ?? translations[defaultLocale][key]
  }
}

export function useTranslatedPath(locale: Locale) {
  return function translatePath(path?: Path, lang: Locale = locale) {
    if (!path) return `/${lang}`
    const hasTranslation = routes[lang] && routes[lang][path]
    const translatedPath = hasTranslation ? '/' + routes[lang][path] : path

    return `/${lang}${translatedPath}`
  }
}

export function getStaticPathsForLocales(path?: Path) {
  return locales
    .map(locale =>
      !path
        ? { locale }
        : {
            locale,
            [path]: routes[locale][path]
          }
    )
    .map(params => ({ params }))
}

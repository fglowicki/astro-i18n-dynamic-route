import { defaultLocale, locales } from './config'
import { translations, pages } from './translations'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in translations) return lang as keyof typeof translations
  return defaultLocale
}

export function useTranslations(url: URL) {
  const lang = getLangFromUrl(url)
  return function t(key: keyof (typeof translations)[typeof defaultLocale]) {
    return translations[lang][key] ?? translations[defaultLocale][key]
  }
}

export function useTranslatedPath(locale: keyof typeof translations) {
  return function translatePath(
    path: keyof typeof pages,
    lang: keyof typeof translations = locale
  ) {
    return `/${lang}/${pages[path][lang]}/`
  }
}

export function getStaticPathsForLanguages(path?: keyof typeof pages) {
  return locales
    .map(locale => {
      return !path
        ? { locale }
        : {
            locale,
            [path]: pages[path][locale]
          }
    })
    .map(params => ({ params }))
}

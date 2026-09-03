import type { Locale } from './config'
import fr from './messages/fr.json'

/**
 * Le français fait référence : les autres fichiers de messages doivent avoir
 * exactement la même forme, ce que TypeScript vérifie à la compilation.
 */
export type Messages = typeof fr

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  fr: () => import('./messages/fr.json'),
  en: () => import('./messages/en.json'),
  es: () => import('./messages/es.json'),
  pt: () => import('./messages/pt.json'),
  zh: () => import('./messages/zh.json'),
  de: () => import('./messages/de.json'),
  it: () => import('./messages/it.json'),
  ja: () => import('./messages/ja.json'),
  ar: () => import('./messages/ar.json'),
}

/** Charge les textes d'une langue (appelé côté serveur uniquement). */
export async function getMessages(locale: Locale): Promise<Messages> {
  const load = loaders[locale]
  return (await load()).default
}

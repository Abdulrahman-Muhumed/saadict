import { i18n, Locale } from "./config";

export async function getDictionary(locale: Locale) {
  const safeLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const dict = await import(`./messages/${safeLocale}.json`);
  return dict.default;
}

import { ReactNode } from "react";
import { i18n, Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TranslationProvider } from "@/lib/i18n/provider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {

  const locale: Locale =
    i18n.locales.includes(params.locale)
      ? params.locale
      : i18n.defaultLocale;

  const dictionary = await getDictionary(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary} >
      {children}
    </TranslationProvider>
  );
}

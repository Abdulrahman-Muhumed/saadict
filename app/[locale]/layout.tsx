import type { ReactNode } from "react";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TranslationProvider } from "@/lib/i18n/provider";
import PageTransitionProvider from "@/components/global/PageTransitionProvider";
import ScrollTop from "@/components/global/ScrollTop";
import { Analytics } from "@vercel/analytics/next";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  // IMPORTANT: match what Next expects for "/[locale]"
  params: Promise<{ locale: string }>;
}) {
  // Next 15: params is a Promise -> await it
  const { locale: rawLocale } = await params;

  // Safely narrow to your union type
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dictionary = await getDictionary(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary}>
      <PageTransitionProvider>
        {children}
        <Analytics />
        <ScrollTop />
      </PageTransitionProvider>
    </TranslationProvider>
  );
}

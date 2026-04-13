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

function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}

function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  const locale: Locale = isValidLocale(rawLocale)
    ? rawLocale
    : i18n.defaultLocale;

  const dictionary = await getDictionary(locale);
  const dir = getDirection(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary}>
      <div
        lang={locale}
        dir={dir}
        className="min-h-screen"
        suppressHydrationWarning
      >
        <PageTransitionProvider>
          {children}
          <Analytics />
          <ScrollTop />
        </PageTransitionProvider>
      </div>
    </TranslationProvider>
  );
}
"use client";

import { NextIntlClientProvider, useTranslations as useNextIntlTranslations } from "next-intl";

export function TranslationProvider({
  children,
  locale,
  dictionary,
}: {
  children: React.ReactNode;
  locale: string;
  dictionary: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={dictionary}>
      {children}
    </NextIntlClientProvider>
  );
}

// re-export for convenience
export const useTranslations = useNextIntlTranslations;

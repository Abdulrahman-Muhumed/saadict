import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { brand } from "@/components/config/brand";
import { i18n, type Locale } from "@/lib/i18n/config";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Hoggaan E-Portal",
    description: "The official Hoggaan digital portal for pilgrims.",
    icons: {
        icon: brand.logo.light,
        apple: brand.logo.light,
    },
    keywords: [
        "Hoggaan Portal",
        "Hajj management system",
        "Umrah portal",
        "pilgrim ID",
        "booking verification",
        "travel dashboard",
    ],
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validate and narrow the locale
    const locale: Locale = i18n.locales.includes(params.locale as Locale)
        ? (params.locale as Locale)
        : i18n.defaultLocale;

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <body className={`${geistSans.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

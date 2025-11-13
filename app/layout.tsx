import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { brand } from "@/components/config/brand";
import "./globals.css";

export const metadata: Metadata = {
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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

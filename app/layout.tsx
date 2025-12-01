import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { brand } from "@/components/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: "HornBox LLC",
  description:
    "HornBox LLC is a global freight forwarding and logistics provider offering ocean, air, road transport, customs clearance, warehousing, and project cargo solutions across 195+ destinations.",
  icons: {
    icon: brand.logo.light,
    apple: brand.logo.light,
  },
  keywords: [
    "HornBox Logistics",
    "HornBox LLC",
    "Freight Forwarding",
    "Ocean Freight",
    "Air Freight",
    "Road Transport",
    "Warehousing",
    "Customs Clearance",
    "Project Cargo",
    "3PL",
    "4PL",
    "Supply Chain",
    "Logistics Services",
    "Global Network",
    "Cargo Shipping",
    "Import Export",
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

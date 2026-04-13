import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { brand } from "@/components/config/brand";
import "./globals.css";


export const metadata: Metadata = {
  title: brand.name,
  description:
    "Saad ICT is a Somalia-based / Global technology company specializing in the design and development of modern digital systems.",
  icons: {
    icon: brand.logo.light,
    apple: brand.logo.light,
  },
  keywords: [
    "Saad ICT",
    "Technology Company",
    "Digital Systems",
    "Software Development",
    "Cloud Computing",
    "Cybersecurity",
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

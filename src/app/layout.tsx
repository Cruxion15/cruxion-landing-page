import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  title: "Cruxion — Where understanding is the output",
  description:
    "The only platform that verifies understanding — not just output. Built for Karnataka engineering colleges. VTU aligned. Plugs into your assignment component with zero curriculum changes.",
  keywords: [
    "Cruxion",
    "VTU",
    "Karnataka engineering colleges",
    "coding platform",
    "understanding verification",
    "assignment grading",
    "placement preparation",
  ],
  authors: [{ name: "Cruxion", url: "https://cruxion.in" }],
  openGraph: {
    title: "Cruxion — Where understanding is the output",
    description:
      "The only platform that verifies understanding — not just output. Built for Karnataka engineering colleges.",
    url: "https://cruxion.in",
    siteName: "Cruxion",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cruxion — Where understanding is the output",
    description:
      "The only platform that verifies understanding — not just output. Built for Karnataka engineering colleges.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

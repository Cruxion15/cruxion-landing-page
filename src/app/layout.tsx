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
  title: "Cruxion — Engineering outcome infrastructure",
  description:
    "The AI-native platform that takes engineering students from classroom to industry-ready. Skill tracks, Socratic AI mentorship, and verified outcomes.",
  keywords: [
    "Cruxion",
    "VTU",
    "Karnataka engineering colleges",
    "coding platform",
    "understanding verification",
    "assignment grading",
    "placement preparation",
    "engineering education",
  ],
  authors: [{ name: "Cruxion", url: "https://cruxion.in" }],
  openGraph: {
    title: "Cruxion — Engineering outcome infrastructure",
    description:
      "The AI-native platform that takes engineering students from classroom to industry-ready.",
    url: "https://cruxion.in",
    siteName: "Cruxion",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cruxion — Engineering outcome infrastructure",
    description:
      "The AI-native platform that takes engineering students from classroom to industry-ready.",
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

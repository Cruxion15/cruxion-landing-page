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
  metadataBase: new URL("https://cruxion.in"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  title: "Cruxion: Engineering outcome infrastructure",
  description:
    "Cruxion is an AI-native engineering education platform for CS and EC students. Structured skill tracks from embedded systems to cloud engineering on AWS, GCP, and Azure, with Socratic AI mentorship and verified outcomes employers look for.",
  keywords: [
    "Cruxion",
    "engineering education platform",
    "AI mentor for engineering students",
    "cloud engineering track",
    "embedded systems education",
    "AWS GCP Azure for students",
    "CS and EC skill tracks",
    "understanding verification",
    "Apprentice Engineer Architect",
    "Arduino IoT education",
    "placement-ready engineers",
    "engineering college platform",
    "Crucible by Cruxion",
    "hardware software engineering",
  ],
  authors: [{ name: "Cruxion", url: "https://cruxion.in" }],
  openGraph: {
    title: "Cruxion: Engineering outcome infrastructure",
    description:
      "AI-native platform for CS and EC engineering students. Cloud, embedded systems, IoT: structured skill tracks with verified outcomes. Apprentice to Engineer to Architect.",
    url: "https://cruxion.in",
    siteName: "Cruxion",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cruxion: Engineering outcome infrastructure",
    description:
      "AI-native platform for CS and EC engineering students. Cloud, embedded systems, IoT: structured skill tracks with verified outcomes. Apprentice to Engineer to Architect.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://cruxion.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cruxion",
  url: "https://cruxion.in",
  logo: "https://cruxion.in/icon.svg",
  description:
    "Cruxion is an AI-native engineering education platform that takes CS and EC students from classroom to industry-ready. Structured skill tracks, from system design to cloud engineering on AWS, GCP, and Azure, and from embedded systems to IoT on Arduino, with Socratic AI mentorship and verified outcomes.",
  foundingLocation: "India",
  applicationCategory: "EducationalApplication",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Engineering students: CS, ECE, AI/ML, IoT, Embedded Systems",
  },
  offers: [
    {
      "@type": "Course",
      name: "CS · Software Engineering Track",
      description: "Apprentice → Engineer → Architect. System design, cloud engineering on AWS/GCP/Azure, AI-mentored assignments with verified understanding.",
      provider: { "@type": "Organization", name: "Cruxion" },
    },
    {
      "@type": "Course",
      name: "EC · Hardware Engineering Track",
      description: "Circuits to Embedded Systems to IoT. Arduino, MQTT, AWS IoT Core, from wiring LEDs to live cloud dashboards.",
      provider: { "@type": "Organization", name: "Cruxion" },
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/cruxion/",
    "https://app.cruxion.in",
    "https://github.com/Cruxion15",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cruxion",
  url: "https://cruxion.in",
  publisher: { "@type": "Organization", name: "Cruxion" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

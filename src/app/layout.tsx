import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/data";
import "./globals.css";

// Re-render hourly so time-limited offers switch themselves off.
export const revalidate = 3600;

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.descriptor}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web design agency UK",
    "website redesign",
    "app development UK",
    "AI agents",
    "AI automation agency",
    "Meta Ads management",
    "Google Ads management",
    "paid media agency",
    "branding studio",
    "social media management",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.descriptor}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.descriptor}`,
    description: siteConfig.description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  knowsAbout: [
    "Web design and development",
    "App development",
    "AI agents and automation",
    "Paid media management",
    "Brand design",
    "SEO and analytics",
  ],
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: "+447847743022",
  description: siteConfig.description,
  areaServed: "GB",
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin].filter(Boolean),
};

// Runs before first paint. On the home page only: the first visit in a session plays the
// entrance, later loads skip it. The page content is already in the HTML underneath.
const introScript = `try{var h=document.documentElement;if(location.pathname==='/'){if(!sessionStorage.getItem('jmb-intro')){h.classList.add('intro-active','intro-ran')}else{h.classList.add('intro-seen')}}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AnnouncementBar />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}

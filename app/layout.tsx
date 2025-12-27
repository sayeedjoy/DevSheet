import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fontSans, fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  applicationName: siteConfig.name,
  category: "Technology",
  classification: "Programming Reference",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteConfig.url,
    title: siteConfig.fullName,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_VERIFICATION_CODE || "your-google-verification-code",
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION_CODE || "",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": siteConfig.name,
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#8b5cf6",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
      lang="bn"
    >
      <head>
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.maateen.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.maateen.me" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* Preload critical font stylesheet */}
        <link
          rel="preload"
          href="https://fonts.maateen.me/solaiman-lipi/font.css"
          as="style"
        />
        {/* Load font stylesheet */}
        <link
          rel="stylesheet"
          href="https://fonts.maateen.me/solaiman-lipi/font.css"
        />
        {/* Devicon CSS for programming language icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-screen text-foreground bg-background antialiased font-sans">
        {/* JSON-LD structured data - loaded after page interactive */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.fullName,
              description: siteConfig.description,
              url: process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: siteConfig.author.name,
                url: siteConfig.author.url,
                logo: {
                  "@type": "ImageObject",
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/logo.png`,
                },
              },
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.twitter,
                siteConfig.links.discord,
              ],
            }),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.author.name,
              url: siteConfig.author.url,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/logo.png`,
              description: siteConfig.description,
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.twitter,
                siteConfig.links.discord,
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: siteConfig.author.email,
              },
            }),
          }}
        />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 pb-8 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://himanshumishra.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Himanshu Mishra — Software Developer",
    template: "%s | Himanshu Mishra",
  },
  description:
    "Software Developer 2 at Serko. I build scalable Java microservices, cloud-native systems on GCP, and polished web interfaces. Based in Bengaluru, India.",
  keywords: [
    "Himanshu Mishra",
    "Software Developer",
    "Java Developer",
    "Spring Boot",
    "GCP",
    "Microservices",
    "Backend Developer",
    "Bengaluru",
    "Serko",
    "Portfolio",
    "Full Stack Developer",
    "React",
    "Next.js",
    "System Design",
    "LLD",
  ],
  authors: [{ name: "Himanshu Mishra", url: BASE_URL }],
  creator: "Himanshu Mishra",
  publisher: "Himanshu Mishra",

  // ── Canonical & indexing ─────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Himanshu Mishra",
    title: "Himanshu Mishra — Software Developer",
    description:
      "Software Developer 2 at Serko. Scalable Java microservices, GCP cloud systems, and modern web interfaces. Based in Bengaluru, India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Himanshu Mishra — Software Developer Portfolio",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@manshu_1100",
    creator: "@manshu_1100",
    title: "Himanshu Mishra — Software Developer",
    description:
      "Software Developer 2 at Serko. Java · Spring Boot · GCP · React. Based in Bengaluru, India.",
    images: ["/og-image.png"],
  },

  // ── Verification (add tokens once you verify in Google / Bing) ───────────
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  // },
};

// ── JSON-LD Structured Data (Person schema) ──────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Himanshu Mishra",
  url: BASE_URL,
  image: `${BASE_URL}/HimanshuPhoto.png`,
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Serko",
    url: "https://www.serko.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/himanshu-mishra-0b2795191/",
    "https://github.com/Himanshu-prog-hub",
    "https://x.com/manshu_1100",
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Google Cloud Platform",
    "React",
    "Next.js",
    "System Design",
    "Low Level Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent browser from restoring previous scroll position on refresh */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';if(typeof window!=='undefined'){window.scrollTo(0,0);}" }} />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

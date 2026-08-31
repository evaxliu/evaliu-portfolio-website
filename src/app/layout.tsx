import "./globals.css";

import type { Metadata } from "next";
import Footer from "./components/Footer";

const siteUrl = "https://evaxliu.com";

const siteDescription =
  "MS in Computer Science at Georgia Tech and software engineer. I build research tools, web applications, and production software.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Eva Liu ✦ Software Engineer & MSCS Georgia Tech",

  description: siteDescription,

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/purple-star.png",
      },
      {
        url: "/purple-star.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Eva Liu ✦ Software Engineer & MSCS Georgia Tech",
    description: siteDescription,
    url: siteUrl,
    siteName: "Eva Liu",
    images: [
      {
        url: "/OG_Prev.png",
        width: 1200,
        height: 630,
        alt: "Eva Liu — Software Engineer available for full-time and intern roles.",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Eva Liu ✦ Software Engineer & MSCS Georgia Tech",
    description: siteDescription,
    images: ["/OG_Prev.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Eva Liu",
      description: siteDescription,
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },

    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: `${siteUrl}/`,
      name: "Eva Liu — Software Engineer & MSCS Georgia Tech",
      description: siteDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },

    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Eva Liu",
      url: `${siteUrl}/`,
      description:
        "MS in Computer Science at Georgia Tech and software engineer. I build research tools, web applications, and production software.",
      jobTitle: ["Software Engineer"],
      sameAs: [
        "https://github.com/evaxliu",
        "https://www.linkedin.com/in/el02/",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Washington",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <main>
          {children}
        </main>

        <div className="flex items-center flex-col">
          <Footer />
        </div>
      </body>
    </html>
  );
}
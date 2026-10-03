import type { Metadata, Viewport } from "next";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

const description =
  "Research portfolio of Muhammad Uns Haider Shah: surrogate modeling and Bayesian optimization with CFD for aerodynamic design, trustworthy uncertainty in data-driven models, and ML diagnostics and prognostics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Mechanical Engineering Research Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "computational fluid dynamics",
    "surrogate modeling",
    "Bayesian optimization",
    "Gaussian process",
    "aerodynamic design optimization",
    "blended wing body UAV",
    "scientific machine learning",
    "prognostics",
    "mechanical engineering",
    "aerospace engineering",
  ],
  openGraph: {
    type: "website",
    title: `${profile.name} | Research Portfolio`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} | Research Portfolio`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1418" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    sameAs: [profile.github, profile.linkedin],
    alumniOf: "COMSATS University Islamabad",
    knowsAbout: ["Computational Fluid Dynamics", "Surrogate Modeling", "Bayesian Optimization", "Prognostics"],
  };

  return (
    <html lang="en">
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </body>
    </html>
  );
}

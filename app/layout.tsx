import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cookies } from "next/headers";
import { ActiveThemeProvider } from "@/components/active-theme";
import { cn } from "@/lib/utils";
import LayoutWrapper from "@/components/shared/layout-wrapper";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metadata: Metadata = {
  title: "TheraDiagnostics",
  description:
    "Reliable diagnostic center offering accurate tests and medical screenings with advanced technology for quick and efficient results. Trusted by patients for quality care",
  robots: "index, follow",
  keywords: [
    "theradiagnostic dashboard",
    "shadcnui theradiagnostic dashboard",
    "nextjs dashboard",
  ],
  openGraph: {
    url: "https://dashboard.rjdev.space/",
    type: "website",
    title: "TheraDiagnostics",
    description:
      "Reliable diagnostic center offering accurate tests and medical screenings with advanced technology for quick and efficient results. Trusted by patients for quality care",
    siteName: "TheraDiagnostic",
    images: [
      {
        url: "https://dashboard.rjdev.space/thumbnail/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "TheraDiagnostics dashboard Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheraDiagnostics",
    description:
      "Reliable diagnostic center offering accurate tests and medical screenings with advanced technology for quick and efficient results. Trusted by patients for quality care",
    creator: "@TheraDiagnostics",
    site: "@TheraDiagnostics",
    images: [
      {
        url: "https://dashboard.rjdev.space/thumbnail/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "TheraDiagnostics dashboard Thumbnail",
      },
    ],
  },
  alternates: {
    canonical: "https://dashboard.rjdev.space/",
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");
  const activeFontValue = cookieStore.get("active_font")?.value || "sans-serif";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* google search console verification */}
        <meta
          name="google-site-verification"
          content="_vqr11OEXdAKKPVXrHJv3xl3U6k_rNQnIMLb_vh9nfE"
        />
        {/* favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon/favicon.ico"
          sizes="32x32"
        />

        {/* apple touch icons */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          activeFontValue ? `font-${activeFontValue}` : ""
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableColorScheme
        >
          <ActiveThemeProvider
            initialTheme={activeThemeValue}
            initialFont={activeFontValue}
          >
            <NextTopLoader crawlSpeed={200} easing="ease" />
            <LayoutWrapper>
              <NuqsAdapter>{children}</NuqsAdapter>
            </LayoutWrapper>
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

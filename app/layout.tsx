import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import portfolioData from "../data/portfolioData.json";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahidh Saliheen | Urban Planner • GIS & Spatial Data Analyst",
  description: "Professional portfolio of Shahidh Saliheen, an Urban Planning graduate specializing in GIS, Remote Sensing, Urban Analytics, Spatial Data Science, and Sustainable Development.",
  keywords: [
    "Urban Planning",
    "GIS Analyst",
    "Remote Sensing",
    "Urban Analytics",
    "Spatial Data Science",
    "Sustainable Development",
    "Smart Cities",
    "ArcGIS Pro",
    "Google Earth Engine"
  ],
  authors: [{ name: "Shahidh Saliheen" }],
  icons: {
    icon: "/urban-portfolio/logo.png",
    apple: "/urban-portfolio/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = portfolioData.profile.gaMeasurementId;

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {gaId && gaId !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-base transition-colors duration-300 font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

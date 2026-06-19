import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-base transition-colors duration-300 font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

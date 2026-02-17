import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "BlogPro | Modern Insights on Tech & Startups",
  description: "Daily blogs on trending topics in AI, technology, programming, and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const savedTheme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', savedTheme);
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}

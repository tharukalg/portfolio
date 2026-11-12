import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Manrope, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tharuka Lakshan — Full-Stack & Mobile Engineer",
  description:
    "Portfolio of Tharuka Lakshan — Full Stack Software Engineer specializing in Flutter, NestJS, React, .NET, AWS, and AI solutions. Currently a Software Engineer at Savinda Graphic Systems.",
  keywords: [
    "Tharuka Lakshan",
    "Software Engineer",
    "Full Stack Developer",
    "Flutter Developer",
    "React Developer",
    "NestJS",
    "thebrandora.com",
    "Sri Lanka",
    "Savinda Graphic Systems",
  ],
  authors: [{ name: "Tharuka Lakshan", url: "https://github.com/tharukalg" }],
};

export const viewport: Viewport = {
  themeColor: "#1f5866",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}

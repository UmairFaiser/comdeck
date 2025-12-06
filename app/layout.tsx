import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/NavBar";
import ClientDisclaimerBanner from "../components/ClientDisclaimerBanner";


import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sans = localFont({
  src: [
    {
      path: "./fonts/nunito/nunito-v32-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/nunito/nunito-v32-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/nunito/nunito-v32-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

const mono = localFont({
  src: [
    {
      path: "./fonts/intelone-mono/regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

const serif = localFont({
  src: [
    {
      path: "./fonts/pp-editorial-new/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/pp-editorial-new/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}
      >
        <div className="sticky top-0 z-50">
          <NavBar />
          <ClientDisclaimerBanner />
        </div>
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

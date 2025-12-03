import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/NavBar";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sans = Nunito({
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
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

export const metadata: Metadata = {
  title: "Comdeck",
  description: "A directory for advance level commerce papers",
};

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
          <DisclaimerBanner />
        </div>
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

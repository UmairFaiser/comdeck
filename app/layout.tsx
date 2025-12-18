import localFont from "next/font/local";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://comdeck.vercel.app'),
  title: 'Comdeck',
  description: 'A directory for Advanced level commerce resources.',
  openGraph: {
    title: 'Comdeck',
    description: 'A directory for Advanced level commerce resources.',
    url: 'https://comdeck.vercel.app',
    siteName: 'Comdeck',
    images: ['/opengraph-image.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comdeck',
    description: 'A directory for Advanced level commerce resources.',
    creator: '@UmairFaiser',
    images: ['/opengraph-image.png'],
  },
};

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
  const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;

  return (
    <html lang="en" suppressHydrationWarning>
      <ClientLayoutWrapper fontVariables={fontVariables}>
        {children}
      </ClientLayoutWrapper>
    </html>
  );
}

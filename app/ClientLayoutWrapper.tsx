'use client';

import NavBar from "../components/NavBar";
import ClientDisclaimerBanner from "../components/ClientDisclaimerBanner";
import { ToastProvider } from "../contexts/ToastContext";
import Toast from "../components/Toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState } from "react";
import LatestSidebar from "../components/LatestSidebar";
import { getLatestResources } from "@/lib/resources";
import { ThemeProvider } from "next-themes";

export default function ClientLayoutWrapper({ children, fontVariables }: { children: React.ReactNode, fontVariables: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = getLatestResources();

  return (
    <body className={`${fontVariables} antialiased`}>
      <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
        <ToastProvider>
          <div className="sticky top-0 z-50">
            <NavBar setSidebarOpen={setSidebarOpen} />
            <ClientDisclaimerBanner />
          </div>
          <main>{children}</main>
          <Toast />
          <Analytics />
          <SpeedInsights />
          <LatestSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} items={items} />
        </ToastProvider>
      </ThemeProvider>
    </body>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AnimatedHeatmapBackground } from "@/components/AnimatedHeatmapBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thumbnail IQ — AI-Powered YouTube Thumbnail Attention Heatmap",
  description: "Understand visual attention before you publish. Predict viewer fixation hotspots, scan paths, and design scores with multi-signal computer vision.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <LanguageProvider>
            <AnimatedHeatmapBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

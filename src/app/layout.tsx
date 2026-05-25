import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { FloatingDock } from "@/components/common/FloatingDock";
import { KeyboardShortcuts } from "@/components/common/KeyboardShortcuts";
import { INFO } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: INFO.name,
    template: `%s — ${INFO.name}`,
  },
  description: INFO.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${silkscreen.variable} font-sans antialiased`}
      >
        <KeyboardShortcuts />
        <SmoothScroll />
        <div className="flex min-h-screen flex-col bg-background text-foreground relative">
          <Navbar />
          <main className="flex-1 pb-24 md:pb-36">{children}</main>
          <Footer />
          <FloatingDock />
        </div>
      </body>
    </html>
  );
}

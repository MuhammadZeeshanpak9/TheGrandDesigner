import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Nav } from "@/components/layout/Nav";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { TickerHeader } from "@/components/layout/TickerHeader";
import { NewsletterFooter } from "@/components/sections/NewsletterFooter";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Grand Designer",
  description: "I AM YOU.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} text-ink h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ink font-sans bg-paper" suppressHydrationWarning>
        <MotionProvider>
          <TickerHeader />
          <SiteLogo />
          <Nav />
          <div className="relative z-10 flex flex-col w-full">{children}</div>
          <div className="relative z-10">
            <NewsletterFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}

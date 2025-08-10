import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { SplashScreen } from "@/components/splash-screen";
import { SiteHeader } from "@/components/site-header";
import { CustomCursor } from "@/components/custom-cursor";
import { GlobalRockBackground } from "@/components/global-rock-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLEO - Streetwear & Rock",
  description:
    "Where street culture meets rock rebellion. Premium streetwear with attitude.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-transparent text-gray-100 relative`}
      >
        <GlobalRockBackground />
        <div className="relative z-10">
          <SplashScreen />
          <SiteHeader />
          {children}
          <footer className="w-full py-4 md:py-6 px-4 bg-black/40 backdrop-blur-sm text-gray-400">
            <div className="container mx-auto text-center">
              <p className="text-sm md:text-base">
                &copy; 2025 CLEO. Streetwear & Rock.
              </p>
              {/* <p className="text-xs md:text-sm mt-1 opacity-75">
                made by geroserial.com
              </p> */}
            </div>
          </footer>
        </div>
        <CustomCursor />
      </body>
    </html>
  );
}

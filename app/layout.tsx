import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
// import { SplashScreen } from "@/components/splash-screen";
// import { SiteHeader } from "@/components/site-header";
import { CustomCursor } from "@/components/custom-cursor";
import Navbar from "@/components/shared/Navbar";
// import { GlobalRockBackground } from "@/components/global-rock-background";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}

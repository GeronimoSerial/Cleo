import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { SiteHeader } from "@/components/site-header"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CLEO - StreetSwear & Rock",
  description: "Where street culture meets rock rebellion. Premium streetwear with attitude.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-dark-900 text-gray-100`}>
        <SplashScreen />
        <SiteHeader />
        {children}
        <footer className="w-full py-4 md:py-6 px-4 bg-dark-600 text-gray-400">
          <div className="container mx-auto text-center">
            <p className="text-sm md:text-base">&copy; 2023 CLEO. All rights reserved.</p>
            <p className="text-xs md:text-sm mt-1 opacity-75">StreetSwear & Rock</p>
          </div>
        </footer>
        <CustomCursor />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zentoro - Your AI-Powered Execution Engine",
  description: "Focus. Create. Grow. With Toro by your side. The smart terminal for founders.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0d0e11] text-[#e6ebf4] antialiased`}>{children}</body>
    </html>
  )
}

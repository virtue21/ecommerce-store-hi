import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { RecentlyViewedProvider } from "@/lib/recently-viewed-context"
import { CartSidebar } from "@/components/cart-sidebar"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "ModernStore - Premium E-commerce",
  description: "Discover premium fashion, accessories, and lifestyle products",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <CartProvider>
                {children}
                <CartSidebar />
              </CartProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

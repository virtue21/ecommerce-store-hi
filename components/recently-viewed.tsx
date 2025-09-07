"use client"

import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed()

  if (recentlyViewed.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {recentlyViewed.slice(0, 6).map((product) => (
            <Card key={product.id} className="group overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">${product.price}</span>
                    {product.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

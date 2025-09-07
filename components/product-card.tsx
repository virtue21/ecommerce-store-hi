"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Eye } from "lucide-react"
import { QuickViewModal } from "@/components/quick-view-modal"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import Link from "next/link"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)

  const { addItem, openCart } = useCart()

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : undefined
    const defaultColor = product.colors.length > 0 ? product.colors[0] : undefined
    addItem(product, 1, defaultSize, defaultColor)
    openCart()
  }

  const isWishlisted = isInWishlist(product.id)

  return (
    <>
      <Link href={`/products/${product.id}`}>
        <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.originalPrice && <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>}
                {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleWishlistToggle}
                  className={isWishlisted ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button size="icon" variant="secondary" onClick={handleQuickView}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Add to Cart - Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-balance">{product.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <Badge variant="outline" className="text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </Badge>
                )}
              </div>

              {/* Available Colors Preview */}
              {product.colors.length > 0 && (
                <div className="flex items-center gap-1 mt-3">
                  <span className="text-xs text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.toLowerCase() === "black"
                                ? "#000000"
                                : color.toLowerCase() === "navy"
                                  ? "#1e3a8a"
                                  : color.toLowerCase() === "gray"
                                    ? "#6b7280"
                                    : color.toLowerCase() === "blue"
                                      ? "#3b82f6"
                                      : color.toLowerCase() === "red"
                                        ? "#ef4444"
                                        : color.toLowerCase() === "brown"
                                          ? "#92400e"
                                          : color.toLowerCase() === "tan"
                                            ? "#d2b48c"
                                            : color.toLowerCase() === "silver"
                                              ? "#c0c0c0"
                                              : "#6b7280",
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>

      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  )
}

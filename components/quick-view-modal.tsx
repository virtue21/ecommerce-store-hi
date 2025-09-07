"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import type { Product } from "@/lib/mock-data"

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const { addItem, openCart } = useCart()

  if (!product) return null

  // Initialize selections when product changes
  if (selectedSize === "" && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0])
  }
  if (selectedColor === "" && product.colors.length > 0) {
    setSelectedColor(product.colors[0])
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor)
    onClose()
    openCart()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View: {product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-balance">{product.name}</h2>

              {/* Price */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
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
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{product.description}</p>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h4 className="font-medium mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[2.5rem]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h4 className="font-medium mb-2">Color: {selectedColor}</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-primary scale-110" : "border-gray-300"
                      }`}
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
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="font-medium mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <Button className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <Link href={`/products/${product.id}`} onClick={onClose}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

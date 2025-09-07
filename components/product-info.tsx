"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/mock-data"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem, openCart } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor)
    openCart()
  }

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize, selectedColor)
    // TODO: Navigate to checkout
    console.log("Buy now - navigate to checkout")
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    // TODO: Implement wishlist functionality
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-balance">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${product.price}</span>
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
                className={`h-5 w-5 ${
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
        <div className="mb-6">
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

      <Separator />

      {/* Product Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className="min-w-[3rem]"
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
          <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
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
                                      : color.toLowerCase() === "light blue"
                                        ? "#87ceeb"
                                        : color.toLowerCase() === "dark blue"
                                          ? "#00008b"
                                          : color.toLowerCase() === "space gray"
                                            ? "#4a4a4a"
                                            : color.toLowerCase() === "gold"
                                              ? "#ffd700"
                                              : "#6b7280",
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleWishlistToggle}
            className={isWishlisted ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>

        <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  )
}

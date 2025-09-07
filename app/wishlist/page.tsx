"use client"

import { useWishlist } from "@/lib/wishlist-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes?.[0] || "One Size",
      color: product.colors?.[0] || "Default",
      quantity: 1,
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love to your wishlist and shop them later.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Heart className="h-4 w-4 fill-current text-red-500" />
              </Button>
            </div>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold mb-1 hover:text-primary transition-colors">{product.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="outline" onClick={() => removeFromWishlist(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

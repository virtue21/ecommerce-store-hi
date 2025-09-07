"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart, type CartItem as CartItemType } from "@/lib/cart-context"
import Link from "next/link"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  const itemTotal = item.product.price * item.quantity

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/products/${item.product.id}`}>
            <img
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-md border"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.product.id}`}>
            <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
              {item.product.name}
            </h4>
          </Link>

          {/* Variants */}
          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold">${itemTotal.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">${item.product.price} each</span>
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={handleRemove} className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Separator />
    </div>
  )
}

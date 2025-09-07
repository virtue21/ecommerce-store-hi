"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"
import type { CartItem } from "@/lib/cart-context"
import type { PromoCode } from "@/app/checkout/page"

interface OrderSummaryProps {
  items: CartItem[]
  promoCode: PromoCode | null
  onPromoCodeApply: (promoCode: PromoCode | null) => void
  shippingMethod?: "standard" | "express" | "overnight"
}

export function OrderSummary({ items, promoCode, onPromoCodeApply, shippingMethod }: OrderSummaryProps) {
  const [promoCodeInput, setPromoCodeInput] = useState("")
  const [promoError, setPromoError] = useState("")

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const getShippingCost = () => {
    if (!shippingMethod) return 0
    switch (shippingMethod) {
      case "standard":
        return 0
      case "express":
        return 9.99
      case "overnight":
        return 24.99
      default:
        return 0
    }
  }

  const shippingCost = getShippingCost()
  const taxRate = 0.08 // 8% tax
  const taxAmount = subtotal * taxRate

  const discountAmount = promoCode
    ? promoCode.type === "percentage"
      ? subtotal * (promoCode.discount / 100)
      : promoCode.discount
    : 0

  const total = subtotal + shippingCost + taxAmount - discountAmount

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError("")

    // Mock promo code validation
    const validPromoCodes = {
      SAVE10: { code: "SAVE10", discount: 10, type: "percentage" as const },
      WELCOME20: { code: "WELCOME20", discount: 20, type: "fixed" as const },
      FREESHIP: { code: "FREESHIP", discount: shippingCost, type: "fixed" as const },
    }

    const code = promoCodeInput.toUpperCase()
    if (validPromoCodes[code as keyof typeof validPromoCodes]) {
      onPromoCodeApply(validPromoCodes[code as keyof typeof validPromoCodes])
      setPromoCodeInput("")
    } else {
      setPromoError("Invalid promo code")
    }
  }

  const removePromoCode = () => {
    onPromoCodeApply(null)
    setPromoError("")
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative">
                <img
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{item.quantity}</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                  {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                </div>
                <p className="font-medium text-sm mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Promo Code */}
        <div>
          {!promoCode ? (
            <form onSubmit={handlePromoCodeSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="outline" size="sm">
                  Apply
                </Button>
              </div>
              {promoError && <p className="text-sm text-destructive">{promoError}</p>}
            </form>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">{promoCode.code}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removePromoCode}
                className="text-green-600 hover:text-green-700"
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {shippingCost > 0 && (
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({promoCode?.code})</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {subtotal < 50 && (
          <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { CartItem } from "@/components/cart-item"
import Link from "next/link"

export function CartSidebar() {
  const { state, closeCart, getTotalItems, getTotalPrice } = useCart()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Link href="/products" onClick={closeCart}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {state.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Cart Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={closeCart}>
                  <Button size="lg" className="w-full">
                    Checkout
                  </Button>
                </Link>
                <Link href="/products" onClick={closeCart}>
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

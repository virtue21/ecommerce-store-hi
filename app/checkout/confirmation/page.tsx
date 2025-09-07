"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [orderNumber] = useState(searchParams.get("order") || "")

  useEffect(() => {
    if (!orderNumber) {
      router.push("/")
      return
    }

    // Clear cart after successful order
    clearCart()
  }, [orderNumber, router, clearCart])

  if (!orderNumber) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-primary">#{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Mail className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Order Confirmation</h3>
                  <p className="text-sm text-muted-foreground">You'll receive an email confirmation shortly</p>
                </div>
                <div className="space-y-2">
                  <Package className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Processing</h3>
                  <p className="text-sm text-muted-foreground">We'll prepare your order for shipping</p>
                </div>
                <div className="space-y-2">
                  <Truck className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Shipping</h3>
                  <p className="text-sm text-muted-foreground">Your order will be shipped within 1-2 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Contact our support team
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

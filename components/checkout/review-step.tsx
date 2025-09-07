"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit } from "lucide-react"
import type { ShippingInfo, PaymentInfo, PromoCode } from "@/app/checkout/page"

interface ReviewStepProps {
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  promoCode: PromoCode | null
  onComplete: () => void
  onBack: () => void
}

export function ReviewStep({ shippingInfo, paymentInfo, promoCode, onComplete, onBack }: ReviewStepProps) {
  const getShippingMethodName = (method: string) => {
    switch (method) {
      case "standard":
        return "Standard Shipping (5-7 business days)"
      case "express":
        return "Express Shipping (2-3 business days)"
      case "overnight":
        return "Overnight Shipping (Next business day)"
      default:
        return "Standard Shipping"
    }
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return `Credit Card ending in ${paymentInfo.cardNumber?.slice(-4) || "****"}`
      case "paypal":
        return "PayPal"
      case "apple-pay":
        return "Apple Pay"
      default:
        return "Credit Card"
    }
  }

  return (
    <div className="space-y-6">
      {/* Shipping Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shipping Information</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p className="text-muted-foreground">{shippingInfo.email}</p>
            <div className="text-muted-foreground">
              <p>{shippingInfo.address}</p>
              {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
              <p>
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </p>
              <p>{shippingInfo.country}</p>
            </div>
            {shippingInfo.phone && <p className="text-muted-foreground">{shippingInfo.phone}</p>}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-medium">Shipping Method</p>
            <p className="text-muted-foreground">{getShippingMethodName(shippingInfo.shippingMethod)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment Information</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">{getPaymentMethodName(paymentInfo.paymentMethod)}</p>
            {paymentInfo.paymentMethod === "card" && paymentInfo.cardName && (
              <p className="text-muted-foreground">{paymentInfo.cardName}</p>
            )}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-medium">Billing Address</p>
            {paymentInfo.billingAddress.sameAsShipping ? (
              <p className="text-muted-foreground">Same as shipping address</p>
            ) : (
              <div className="text-muted-foreground">
                <p>{paymentInfo.billingAddress.address}</p>
                {paymentInfo.billingAddress.apartment && <p>{paymentInfo.billingAddress.apartment}</p>}
                <p>
                  {paymentInfo.billingAddress.city}, {paymentInfo.billingAddress.state}{" "}
                  {paymentInfo.billingAddress.zipCode}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              By placing this order, you agree to our{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
              .
            </p>
            <p>
              Your payment information is secure and encrypted. We do not store your credit card details on our servers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Payment
        </Button>
        <Button size="lg" onClick={onComplete} className="bg-primary hover:bg-primary/90">
          Place Order
        </Button>
      </div>
    </div>
  )
}

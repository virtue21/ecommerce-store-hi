"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CheckoutSteps } from "@/components/checkout-steps"
import { ShippingStep } from "@/components/checkout/shipping-step"
import { PaymentStep } from "@/components/checkout/payment-step"
import { ReviewStep } from "@/components/checkout/review-step"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/lib/cart-context"

export interface ShippingInfo {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  shippingMethod: "standard" | "express" | "overnight"
}

export interface PaymentInfo {
  paymentMethod: "card" | "paypal" | "apple-pay"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
  billingAddress: {
    sameAsShipping: boolean
    address?: string
    apartment?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
}

export interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null)
  const [isGuestCheckout, setIsGuestCheckout] = useState(true)

  const { state, getTotalItems, getTotalPrice } = useCart()
  const router = useRouter()

  // Redirect if cart is empty
  useEffect(() => {
    if (getTotalItems() === 0) {
      router.push("/products")
    }
  }, [getTotalItems, router])

  const handleStepComplete = (step: number, data: any) => {
    switch (step) {
      case 1:
        setShippingInfo(data)
        setCurrentStep(2)
        break
      case 2:
        setPaymentInfo(data)
        setCurrentStep(3)
        break
      case 3:
        // Process order
        handleOrderSubmit()
        break
    }
  }

  const handleOrderSubmit = () => {
    // Mock order processing
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/checkout/confirmation?order=${orderId}`)
  }

  const goToStep = (step: number) => {
    if (step < currentStep || (step === 2 && shippingInfo) || (step === 3 && shippingInfo && paymentInfo)) {
      setCurrentStep(step)
    }
  }

  if (getTotalItems() === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <CheckoutSteps currentStep={currentStep} onStepClick={goToStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <ShippingStep
                  initialData={shippingInfo}
                  isGuestCheckout={isGuestCheckout}
                  onGuestCheckoutChange={setIsGuestCheckout}
                  onComplete={(data) => handleStepComplete(1, data)}
                />
              )}

              {currentStep === 2 && (
                <PaymentStep
                  initialData={paymentInfo}
                  onComplete={(data) => handleStepComplete(2, data)}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <ReviewStep
                  shippingInfo={shippingInfo!}
                  paymentInfo={paymentInfo!}
                  promoCode={promoCode}
                  onComplete={() => handleStepComplete(3, null)}
                  onBack={() => setCurrentStep(2)}
                />
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                items={state.items}
                promoCode={promoCode}
                onPromoCodeApply={setPromoCode}
                shippingMethod={shippingInfo?.shippingMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

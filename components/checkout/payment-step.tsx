"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, ArrowLeft } from "lucide-react"
import type { PaymentInfo } from "@/app/checkout/page"

interface PaymentStepProps {
  initialData: PaymentInfo | null
  onComplete: (data: PaymentInfo) => void
  onBack: () => void
}

export function PaymentStep({ initialData, onComplete, onBack }: PaymentStepProps) {
  const [formData, setFormData] = useState<PaymentInfo>(
    initialData || {
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      billingAddress: {
        sameAsShipping: true,
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
      if (!formData.cvv) newErrors.cvv = "CVV is required"
      if (!formData.cardName) newErrors.cardName = "Cardholder name is required"

      // Card number validation (basic)
      if (formData.cardNumber && formData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Please enter a valid card number"
      }

      // CVV validation
      if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
        newErrors.cvv = "Please enter a valid CVV"
      }
    }

    // Billing address validation if different from shipping
    if (!formData.billingAddress.sameAsShipping) {
      if (!formData.billingAddress.address) newErrors.billingAddress = "Billing address is required"
      if (!formData.billingAddress.city) newErrors.billingCity = "Billing city is required"
      if (!formData.billingAddress.state) newErrors.billingState = "Billing state is required"
      if (!formData.billingAddress.zipCode) newErrors.billingZipCode = "Billing ZIP code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith("billing.")) {
      const billingField = field.replace("billing.", "")
      setFormData((prev) => ({
        ...prev,
        billingAddress: { ...prev.billingAddress, [billingField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: CreditCard,
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      description: "Pay with Touch ID or Face ID",
      icon: Smartphone,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
          >
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="font-medium">
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card Details */}
      {formData.paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={errors.cardNumber ? "border-destructive" : ""}
                />
                {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                    maxLength={5}
                    className={errors.expiryDate ? "border-destructive" : ""}
                  />
                  {errors.expiryDate && <p className="text-sm text-destructive mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className={errors.cvv ? "border-destructive" : ""}
                  />
                  {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  className={errors.cardName ? "border-destructive" : ""}
                />
                {errors.cardName && <p className="text-sm text-destructive mt-1">{errors.cardName}</p>}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Other Payment Methods */}
      {formData.paymentMethod === "paypal" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {formData.paymentMethod === "apple-pay" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Use Touch ID or Face ID to pay with Apple Pay.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="same-as-shipping"
                checked={formData.billingAddress.sameAsShipping}
                onCheckedChange={(checked) => handleInputChange("billing.sameAsShipping", checked)}
              />
              <Label htmlFor="same-as-shipping">Same as shipping address</Label>
            </div>

            {!formData.billingAddress.sameAsShipping && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress">Address *</Label>
                  <Input
                    id="billingAddress"
                    value={formData.billingAddress.address}
                    onChange={(e) => handleInputChange("billing.address", e.target.value)}
                    className={errors.billingAddress ? "border-destructive" : ""}
                  />
                  {errors.billingAddress && <p className="text-sm text-destructive mt-1">{errors.billingAddress}</p>}
                </div>

                <div>
                  <Label htmlFor="billingApartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="billingApartment"
                    value={formData.billingAddress.apartment}
                    onChange={(e) => handleInputChange("billing.apartment", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange("billing.city", e.target.value)}
                      className={errors.billingCity ? "border-destructive" : ""}
                    />
                    {errors.billingCity && <p className="text-sm text-destructive mt-1">{errors.billingCity}</p>}
                  </div>
                  <div>
                    <Label htmlFor="billingState">State *</Label>
                    <Select
                      value={formData.billingAddress.state}
                      onValueChange={(value) => handleInputChange("billing.state", value)}
                    >
                      <SelectTrigger className={errors.billingState ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.billingState && <p className="text-sm text-destructive mt-1">{errors.billingState}</p>}
                  </div>
                  <div>
                    <Label htmlFor="billingZipCode">ZIP Code *</Label>
                    <Input
                      id="billingZipCode"
                      value={formData.billingAddress.zipCode}
                      onChange={(e) => handleInputChange("billing.zipCode", e.target.value)}
                      className={errors.billingZipCode ? "border-destructive" : ""}
                    />
                    {errors.billingZipCode && <p className="text-sm text-destructive mt-1">{errors.billingZipCode}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shipping
        </Button>
        <Button size="lg" onClick={handleSubmit}>
          Continue to Review
        </Button>
      </div>
    </div>
  )
}

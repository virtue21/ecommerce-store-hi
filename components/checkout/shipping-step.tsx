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
import { Truck, Clock, Zap } from "lucide-react"
import type { ShippingInfo } from "@/app/checkout/page"

interface ShippingStepProps {
  initialData: ShippingInfo | null
  isGuestCheckout: boolean
  onGuestCheckoutChange: (isGuest: boolean) => void
  onComplete: (data: ShippingInfo) => void
}

export function ShippingStep({ initialData, isGuestCheckout, onGuestCheckoutChange, onComplete }: ShippingStepProps) {
  const [formData, setFormData] = useState<ShippingInfo>(
    initialData || {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      phone: "",
      shippingMethod: "standard",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
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

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 0,
      icon: Truck,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 9.99,
      icon: Clock,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 24.99,
      icon: Zap,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Account Options */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="guest-checkout" checked={isGuestCheckout} onCheckedChange={onGuestCheckoutChange} />
              <Label htmlFor="guest-checkout">Continue as guest</Label>
            </div>
            {!isGuestCheckout && (
              <div className="text-sm text-muted-foreground">
                <p>
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto">
                    Sign in
                  </Button>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
              <Input
                id="apartment"
                value={formData.apartment}
                onChange={(e) => handleInputChange("apartment", e.target.value)}
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="HI">Hawaii</SelectItem>
                    <SelectItem value="ID">Idaho</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="IN">Indiana</SelectItem>
                    <SelectItem value="IA">Iowa</SelectItem>
                    <SelectItem value="KS">Kansas</SelectItem>
                    <SelectItem value="KY">Kentucky</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
                    <SelectItem value="ME">Maine</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="MN">Minnesota</SelectItem>
                    <SelectItem value="MS">Mississippi</SelectItem>
                    <SelectItem value="MO">Missouri</SelectItem>
                    <SelectItem value="MT">Montana</SelectItem>
                    <SelectItem value="NE">Nebraska</SelectItem>
                    <SelectItem value="NV">Nevada</SelectItem>
                    <SelectItem value="NH">New Hampshire</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="NM">New Mexico</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="NC">North Carolina</SelectItem>
                    <SelectItem value="ND">North Dakota</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="OK">Oklahoma</SelectItem>
                    <SelectItem value="OR">Oregon</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="RI">Rhode Island</SelectItem>
                    <SelectItem value="SC">South Carolina</SelectItem>
                    <SelectItem value="SD">South Dakota</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="UT">Utah</SelectItem>
                    <SelectItem value="VT">Vermont</SelectItem>
                    <SelectItem value="VA">Virginia</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                    <SelectItem value="WV">West Virginia</SelectItem>
                    <SelectItem value="WI">Wisconsin</SelectItem>
                    <SelectItem value="WY">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={errors.zipCode ? "border-destructive" : ""}
                />
                {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.shippingMethod}
            onValueChange={(value) => handleInputChange("shippingMethod", value as ShippingInfo["shippingMethod"])}
          >
            {shippingOptions.map((option) => {
              const Icon = option.icon
              return (
                <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium">
                      {option.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{option.price === 0 ? "Free" : `$${option.price}`}</p>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSubmit}>
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}

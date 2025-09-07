"use client"

import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
  onStepClick: (step: number) => void
}

export function CheckoutSteps({ currentStep, onStepClick }: CheckoutStepsProps) {
  const steps = [
    { number: 1, title: "Shipping", description: "Address and delivery" },
    { number: 2, title: "Payment", description: "Payment method" },
    { number: 3, title: "Review", description: "Review your order" },
  ]

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex items-center">
            <button
              onClick={() => onStepClick(step.number)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step.number < currentStep
                  ? "bg-primary border-primary text-primary-foreground cursor-pointer"
                  : step.number === currentStep
                    ? "border-primary text-primary cursor-pointer"
                    : "border-muted-foreground text-muted-foreground cursor-not-allowed"
              }`}
              disabled={step.number > currentStep}
            >
              {step.number < currentStep ? <Check className="h-5 w-5" /> : step.number}
            </button>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  step.number <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 ${step.number < currentStep ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Product } from "@/lib/mock-data"

interface ProductImageGalleryProps {
  product: Product
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.images.length > 0 ? product.images : [product.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 opacity-80 hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <div className="relative aspect-square">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`${product.name} - Zoomed`}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

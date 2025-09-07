"use client"

import { useMemo, useEffect } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { products } from "@/lib/mock-data"
import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addToRecentlyViewed } = useRecentlyViewed()
  const product = useMemo(() => products.find((p) => p.id === params.id), [params.id])

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed])

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4),
    [product],
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </div>
    </div>
  )
}

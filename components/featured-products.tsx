import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import { products } from "@/lib/mock-data"
import Link from "next/link"

export function FeaturedProducts() {
  // Show first 6 products as featured
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked favorites that our customers love most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">Sale</Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

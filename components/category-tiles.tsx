import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/mock-data"

export function CategoryTiles() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections designed to match your lifestyle and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.productCount} products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

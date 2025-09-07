"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/mock-data"

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc" | "newest"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    inStock: false,
  })

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating-desc":
          return b.rating - a.rating
        case "newest":
        default:
          return 0 // Keep original order for "newest"
      }
    })

    return filtered
  }, [searchQuery, sortBy, filters])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium products</p>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              {/* Search - Desktop */}
              <div className="hidden md:block flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <ProductFilters filters={filters} onFiltersChange={setFilters} />
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}

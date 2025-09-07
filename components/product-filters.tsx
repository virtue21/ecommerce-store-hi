"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/lib/mock-data"
import type { FilterState } from "@/app/products/page"

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId)

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)

    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onFiltersChange({ ...filters, colors: newColors })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]])
  }

  const applyPriceRange = () => {
    onFiltersChange({ ...filters, priceRange: localPriceRange })
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      inStock: false,
    }
    setLocalPriceRange([0, 500])
    onFiltersChange(clearedFilters)
  }

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "7", "8", "9", "10", "11", "12", "38mm", "42mm", "One Size"]
  const availableColors = [
    "White",
    "Black",
    "Navy",
    "Gray",
    "Blue",
    "Red",
    "Brown",
    "Tan",
    "Silver",
    "Space Gray",
    "Gold",
    "Light Blue",
    "Dark Blue",
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm">
                  {category.name} ({category.productCount})
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={localPriceRange}
              onValueChange={handlePriceRangeChange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
            <Button size="sm" onClick={applyPriceRange} className="w-full">
              Apply Price Range
            </Button>
          </div>
        </div>

        <Separator />

        {/* Sizes */}
        <div>
          <h3 className="font-semibold mb-3">Sizes</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-xs">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-3">Colors</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableColors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={filters.colors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={`color-${color}`} className="text-xs">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Stock Status */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => onFiltersChange({ ...filters, inStock: checked as boolean })}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

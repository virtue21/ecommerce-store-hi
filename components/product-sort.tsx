"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortOption } from "@/app/products/page"

interface ProductSortProps {
  sortBy: SortOption
  onSortChange: (sortBy: SortOption) => void
}

export function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="name-asc">Name: A to Z</SelectItem>
          <SelectItem value="name-desc">Name: Z to A</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

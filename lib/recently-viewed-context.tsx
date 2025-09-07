"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { Product } from "./mock-data"

interface RecentlyViewedContextType {
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const savedRecentlyViewed = localStorage.getItem("recentlyViewed")
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed))
    }
  }, [])

  // Save recently viewed to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== product.id)
      // Add to beginning and limit to 10 items
      return [product, ...filtered].slice(0, 10)
    })
  }, [])

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([])
  }, [])

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}

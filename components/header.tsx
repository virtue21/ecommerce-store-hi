"use client"

import { Search, ShoppingBag, Heart, User, Menu, LogIn, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import Link from "next/link"

export function Header() {
  const { getTotalItems, toggleCart } = useCart()
  const { wishlistItems } = useWishlist()
  const cartCount = getTotalItems()
  const wishlistCount = wishlistItems.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">StyleHub</h1>
            </Link>
          </div>

          <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6 flex-1 justify-center max-w-2xl">
            <Link
              href="/products"
              className="text-xs lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              All Products
            </Link>
            <Link
              href="/products?category=clothing"
              className="text-xs lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Clothing
            </Link>
            <Link
              href="/products?category=shoes"
              className="text-xs lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Shoes
            </Link>
            <Link
              href="/products?category=accessories"
              className="text-xs lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Accessories
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-xs lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Electronics
            </Link>
          </nav>

          {/* Search Bar - Responsive */}
          <div className="hidden md:flex items-center space-x-2 max-w-xs lg:max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10 bg-muted/50 text-sm" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 lg:space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{wishlistCount}</Badge>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{cartCount}</Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/auth/signin" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    View Purchases
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

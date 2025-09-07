import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryTiles } from "@/components/category-tiles"
import { FeaturedProducts } from "@/components/featured-products"
import { RecentlyViewed } from "@/components/recently-viewed"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryTiles />
        <FeaturedProducts />
        <RecentlyViewed />
      </main>
    </div>
  )
}

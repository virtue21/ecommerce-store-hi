import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/modern-fashion-hero-background.jpg" alt="Hero background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Discover Your Perfect Style</h1>
        <p className="text-lg md:text-xl mb-8 text-balance max-w-2xl mx-auto opacity-90">
          Explore our curated collection of premium fashion, accessories, and lifestyle products designed for the modern
          individual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Shop New Arrivals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
          >
            Explore Categories
          </Button>
        </div>
      </div>
    </section>
  )
}

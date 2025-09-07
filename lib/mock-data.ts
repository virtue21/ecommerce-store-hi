export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  description: string
  sizes: string[]
  colors: string[]
  rating: number
  reviews: number
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    image: "/modern-clothing-collection.png",
    productCount: 156,
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "/stylish-sneakers-and-shoes.jpg",
    productCount: 89,
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/fashion-accessories-bags-watches.jpg",
    productCount: 67,
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/modern-electronics.png",
    productCount: 234,
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 15000,
    originalPrice: 20000,
    image: "/premium-cotton-t-shirt.png",
    images: [
      "/premium-cotton-t-shirt-front.jpg",
      "/premium-cotton-t-shirt-back.jpg",
      "/premium-cotton-t-shirt-detail.jpg",
    ],
    category: "clothing",
    description:
      "Soft, breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "2",
    name: "Running Sneakers",
    price: 45000,
    image: "/modern-running-sneakers.jpg",
    images: ["/running-sneakers-side-view.jpg", "/running-sneakers-top-view.jpg", "/running-sneakers-sole-detail.jpg"],
    category: "shoes",
    description: "Lightweight running shoes with advanced cushioning technology for maximum comfort during workouts.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["White", "Black", "Blue", "Red"],
    rating: 4.8,
    reviews: 256,
    inStock: true,
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 75000,
    originalPrice: 100000,
    image: "/leather-crossbody-bag.png",
    images: [
      "/leather-crossbody-bag-front.jpg",
      "/leather-crossbody-bag-interior.jpg",
      "/leather-crossbody-bag-worn.jpg",
    ],
    category: "accessories",
    description: "Handcrafted genuine leather crossbody bag with adjustable strap and multiple compartments.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: "4",
    name: "Wireless Headphones",
    price: 120000,
    image: "/wireless-headphones.png",
    images: ["/wireless-headphones-side.png", "/wireless-headphones-folded.jpg", "/wireless-headphones-case.png"],
    category: "electronics",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    sizes: ["One Size"],
    colors: ["Black", "White", "Silver"],
    rating: 4.6,
    reviews: 342,
    inStock: true,
  },
  {
    id: "5",
    name: "Denim Jacket",
    price: 40000,
    image: "/classic-denim-jacket.png",
    images: ["/denim-jacket-front.jpg", "/denim-jacket-back.png", "/denim-jacket-detail.png"],
    category: "clothing",
    description: "Classic denim jacket with a modern fit. Perfect for layering in any season.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    rating: 4.4,
    reviews: 167,
    inStock: true,
  },
  {
    id: "6",
    name: "Smart Watch",
    price: 180000,
    originalPrice: 210000,
    image: "/smartwatch-lifestyle.png",
    images: ["/smart-watch-face.jpg", "/smartwatch-side-view.png", "/smart-watch-apps.jpg"],
    category: "electronics",
    description: "Advanced smartwatch with health tracking, GPS, and 7-day battery life.",
    sizes: ["38mm", "42mm"],
    colors: ["Space Gray", "Silver", "Gold"],
    rating: 4.9,
    reviews: 523,
    inStock: true,
  },
]

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

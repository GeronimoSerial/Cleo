export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  images: string[]
  isNew?: boolean
  isLimited?: boolean
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export interface Category {
  slug: string
  name: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    slug: "hoodies",
    name: "Hoodies",
    description: "Premium streetwear hoodies with rock attitude",
    image: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    description: "Rock-inspired streetwear tees",
    image: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Complete your street rock look",
    image: "https://i.pinimg.com/736x/8a/8e/7c/8a8e7c8f5d4c3b2a1e9f8d7c6b5a4e3d.jpg",
  },
]

export const products: Product[] = [
  {
    id: 1,
    slug: "cleo-classic-black-hoodie",
    name: "CLEO Classic Black Hoodie",
    price: 149.99,
    originalPrice: 179.99,
    description:
      "The ultimate streetwear hoodie with rock attitude. Crafted from premium 100% cotton with signature CLEO branding. Perfect for street style or casual wear.",
    category: "hoodies",
    images: [
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    ],
    isNew: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    inStock: true,
  },
  {
    id: 2,
    slug: "cleo-premium-gray-hoodie",
    name: "CLEO Premium Gray Hoodie",
    price: 154.99,
    description:
      "Premium gray hoodie with subtle rock-inspired details. Made from heavyweight cotton blend for ultimate comfort and durability.",
    category: "hoodies",
    images: [
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Light Gray"],
    inStock: true,
  },
  {
    id: 3,
    slug: "cleo-signature-navy-hoodie",
    name: "CLEO Signature Navy Hoodie",
    price: 159.99,
    description:
      "Deep navy hoodie featuring the signature CLEO logo. Combines street style with rock rebellion in premium cotton construction.",
    category: "hoodies",
    images: [
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Dark Blue"],
    inStock: true,
  },
  {
    id: 4,
    slug: "cleo-limited-edition-rock-hoodie",
    name: "CLEO Limited Edition Rock Hoodie",
    price: 199.99,
    originalPrice: 249.99,
    description:
      "Exclusive limited edition hoodie with rock-inspired graphics. Only 100 pieces made. Features premium materials and unique design elements.",
    category: "hoodies",
    images: [
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    ],
    isLimited: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    inStock: true,
  },
  {
    id: 5,
    slug: "cleo-street-rebel-tee",
    name: "CLEO Street Rebel T-Shirt",
    price: 49.99,
    description: "Bold street rebel tee with rock-inspired graphics. Made from soft cotton blend for all-day comfort.",
    category: "t-shirts",
    images: [
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    ],
    isNew: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
  },
  {
    id: 6,
    slug: "cleo-rock-chain-necklace",
    name: "CLEO Rock Chain Necklace",
    price: 79.99,
    description:
      "Stainless steel chain necklace with CLEO pendant. Perfect accessory to complete your street rock look.",
    category: "accessories",
    images: [
      "https://i.pinimg.com/736x/8a/8e/7c/8a8e7c8f5d4c3b2a1e9f8d7c6b5a4e3d.jpg",
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Silver", "Black"],
    inStock: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getAllProducts(): Product[] {
  return products
}

export function getRelatedProducts(productId: number, category: string, limit = 3): Product[] {
  return products.filter((product) => product.category === category && product.id !== productId).slice(0, limit)
}

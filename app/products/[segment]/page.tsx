import { getAllProducts } from "@/lib/products-api"
import ProductClientPage from "./ProductClientPage"

export default async function ProductPage({ params }: { params: { segment: string } }) {
  return <ProductClientPage params={params} />
}

export async function generateStaticParams() {
  const { categories } = await import("@/data/products.json")

  const products = await getAllProducts()
  const categoriesData = categories.default.categories

  const productParams = products.map((product) => ({
    segment: product.slug,
  }))

  const categoryParams = categoriesData.map((category: any) => ({
    segment: category.slug,
  }))

  return [...productParams, ...categoryParams]
}

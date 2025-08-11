import { getAllProducts, getAllCategories } from "@/lib/directus-api";
import ProductClientPage from "./ProductClientPage";

export default async function ProductPage({
  params,
}: {
  params: { segment: string };
}) {
  return <ProductClientPage params={params} />;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  const products = await getAllProducts();
  const categoriesData = categories;

  const productParams = products.map((product) => ({
    segment: product.slug,
  }));

  const categoryParams = categoriesData.map((category: any) => ({
    segment: category.slug,
  }));

  return [...productParams, ...categoryParams];
}

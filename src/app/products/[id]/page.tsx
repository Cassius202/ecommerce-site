import { getProductById } from "@/utils/actions/product.action";
import ProductDetail from "@/components/product-content/ProductDetail";
import { notFound } from "next/navigation";

interface ProductPageParams {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
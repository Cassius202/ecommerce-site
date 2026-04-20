import { getProductById } from "@/utils/actions/product.action";
import ProductDetail from "@/components/product-content/ProductDetail";
import { notFound } from "next/navigation";
import { checkUserAuth } from "@/utils/actions/auth.actions";

interface ProductPageParams {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { id } = await params;
  const product = await getProductById(id);

  const result = await checkUserAuth();

  const isLoggedIn = result.success;

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} isLoggedIn={isLoggedIn} />;
}
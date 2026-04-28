import { getCategoryById, getProductById } from "@/utils/actions/product.action";
import BuyNowPage from "./BuyNowPage";
import { getAddresses } from "@/utils/actions/address.actions";
import NotFound from "@/app/not-found";

export default async function BuyNow({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, addresses] = await Promise.all([
    getProductById(id),
    getAddresses().catch(() => []) // 
  ]);

  if (!product) {
    return <NotFound />;
  }

  const categoryData = await getCategoryById(product.category);
  const categoryName = categoryData?.name || "General";

  return (
    <BuyNowPage 
      product={product} 
      categoryName={categoryName} 
      addresses={addresses} // Pass it directly
    />
  );
}
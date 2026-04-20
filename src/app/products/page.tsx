import { fetchProducts, getCategoryById, Category } from "@/utils/actions/product.action";
import CategorySection from "./CategoriesSection";


const ProductsPage = async () => {
  const products = await fetchProducts();

  // 1. Group the products
  const grouped = Object.groupBy(
    products,
    (product) => product.category || "General",
  );

  const categoryEntries = await Promise.all(
    Object.entries(grouped).map(async ([categoryId, items]) => {

      const categoryData: Category | null = await getCategoryById(categoryId);
      return {
        id: categoryId,
        title: categoryData?.name || categoryId, // Fallback to ID if name missing
        items: items || []
      };
    })
  );

  return (
    <div className="min-h-svh pt-25 bg-black py-12 space-y-20">
      {categoryEntries.map((category) => (
        <CategorySection 
          key={category.id} 
          title={category.title} 
          items={category.items} 
        />
      ))}
    </div>
  );
};

export default ProductsPage;
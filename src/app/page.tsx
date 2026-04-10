import HeaderSlider from "@/components/header/HeaderSlider"
import HomeProducts from "@/components/home/HomeProducts"
import { fetchProducts } from "@/utils/actions/product.action";

const Home = async () => {
  const products = await fetchProducts();
  return (
    <div className="min-h-[200vh]">
      <HeaderSlider />
      <HomeProducts products={products} />
    </div>
  )
}

export default Home
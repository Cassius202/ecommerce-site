import { ProductParams } from "@/constants/assets";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ActionsButtons = ({
  product,
  isLoggedIn,
}: {
  product: ProductParams;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  
  return (
    <>
    {isLoggedIn ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
      <button
        disabled={product.quantity === 0}
        // onClick={() => addToCart(product)}
        className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-zinc-700 disabled:to-zinc-700 text-black font-bold py-4 rounded-lg transition-all flex items-center cursor-pointer  justify-center gap-2 text-lg"
      >
        <ShoppingCart /> Add to Cart
      </button>
      <Link
        href={`/buy-now/${product.id}`}
        scroll={true}
        className={`px-6 py-4 rounded-lg hover:bg-blue-600 transition-all bg-blue-500 text-white cursor-pointer flex items-center justify-center`}
      >
        Buy Now
      </Link>
    </div>) : (
      <>
      <button
      onClick={() => router.push(`/login?next=${encodeURIComponent(currentPath)}`)}
      className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 rounded-lg transition-all flex items-center cursor-pointer  justify-center gap-2 text-lg">
        <ShoppingCart /> Login to Order Now
      </button>
      </>
    ) }
    </>
  );
};

export default ActionsButtons;

'use client'

import { ProductParams } from '@/constants/assets'
import ProductDetails from './ProductDetails'
import OrderSummary from './OrderSummary'
import { useState } from 'react'
import { Address } from '@/utils/actions/address.actions'

interface BuyNowPageProps {
  product: ProductParams, 
  categoryName: string, 
  addresses: Address[]
}

const BuyNowPage = ({product, categoryName, addresses}: BuyNowPageProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
     <div className="min-h-svh flex flex-col gap-x-10 gap-y-10 md:grid grid-cols-2 md:gap-x-10 global-padding py-18 mt-4">
      <ProductDetails product={product} categoryName={categoryName} quantity={quantity} setQuantity={setQuantity} />
      <OrderSummary product={product} quantity={quantity} addresses={addresses} />
    </div>
  )
}

export default BuyNowPage
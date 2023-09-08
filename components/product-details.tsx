import { formatAmountForDisplay } from "lib/stripeUtils";
import * as config from "stripe.config";
import CheckoutForm from "./CheckoutForm";
import { StripeProduct } from "lib/types";

type ProductDetailsProps = {
  product: StripeProduct
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  
  const {
    metadata,
    defaultPrice,
    description,
    name,
    price
  } = product


  const formattedPrice = formatAmountForDisplay(price, config.CURRENCY)
  return (
    <div className="w-[400px]">
      <ul>
        <li>{name}</li>
        <li>{metadata.Term}</li>
        <li>{formattedPrice}</li>
      </ul>
      <CheckoutForm productId={defaultPrice}/>
    </div>
  )
}

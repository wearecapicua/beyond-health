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
    default_price,
    description,
    name,
    price
  } = product

  const ingredientList = metadata.Ingredients.split(', ');
  const formattedPrice = formatAmountForDisplay(price, config.CURRENCY)

  return (
    <div className="w-[400px]">
      <div>
        <p className="font-semibold text-xl text-main-blue pb-2">Medication</p>
        <ul>
          {ingredientList.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-xl text-main-blue pb-2">What you pay per shipment</p>
        <ul>
          <li>{name}</li>
          <li>{metadata.Term}</li>
          <li>{formattedPrice}</li>
        </ul>
        <CheckoutForm productId={default_price}/>
      </div>
      
    </div>
  )
}

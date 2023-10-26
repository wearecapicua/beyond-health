import { formatAmountForDisplay } from "lib/stripeUtils";
import * as config from "stripe.config";
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
    <div className="max-w-[430px] mt-10 md:mt-2 px-8 md:px-4 flex-1 flex flex-col gap-10 justify-between">
      <div>
        <p className="font-semibold text-xl text-main-blue pb-2">Medication</p>
        <ul className="list-disc list-inside pl-3">
          {ingredientList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-xl text-main-blue pb-2">What you pay per shipment</p>
        <ul className="list-disc list-inside pl-3">
          <li>{name}</li>
          <li>{metadata.Term}</li>
          <li>{formattedPrice}</li>
          <li>Shipping: FREE</li>
        </ul>
      </div>
      <div className="border-t-[1px] border-solid border-main-black pt-4 pb-3 flex items-center justify-between">
        <p className="font-semibold text-xl text-main-blue pb-2">What you pay today</p>
        <span className="text-2xl text-main-black font-semibold">$0.00</span>
      </div>
    </div>
  )
}

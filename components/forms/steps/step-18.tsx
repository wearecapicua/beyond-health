import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import ProductDetails from "components/product-details";
import { useProductStore } from 'store/useProductStore';
import { StripeProduct } from "lib/types";


export default function StepEighteen() {
  const { register } = useFormContext();
  const { formStore } = useFormStore();
  const [productOptions, setproductOptions] = useState<[StripeProduct]>();
  const { productStore } = useProductStore()

  useEffect(() => {
    setproductOptions(formStore.product)
  }, [formStore.product]);

  const filteredProducts = productStore?.filter(
    (product: StripeProduct) => product.default_price === productOptions
  );

   console.log("prouct", filteredProducts[0])

  return (
    <>
      <FormHeader
        title={"Review and submit your online visit"}
        subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
      />
      <div className="flex">
        <FormContainer>
          <p className="font-semibold text-xl text-main-blue pb-2">Billing Address</p>
          <FormInput
            label="Street Address*"
            id="billingAddress.addr_line1"
            type="text"
            defaultValue={formStore.streetAddress}
          />
          <FormInput
            label="Address Line 2*"
            id="billingAddress.addr_line2"
            type="text"
            defaultValue={formStore.addressLine2}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="City*"
              id="billingAddress.city"
              type="text"
              defaultValue={formStore.city} 
            />
            <FormInput
              label="State / Province*"
              id="billingAddress.state"
              type="text"
              defaultValue={formStore.stateProvince}
            />
          </div>
          <FormInput
            label="ZIP / Postal Code*"
            id="billingAddress.postal"
            type="text"
            defaultValue={formStore.zipcode} 
          />
        </FormContainer>
        {filteredProducts[0] && <ProductDetails product={filteredProducts[0]}/>}
      </div>
    </>
  );
}
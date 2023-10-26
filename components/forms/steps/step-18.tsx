import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import ProductDetails from "components/product-details";
import { useProductStore } from 'store/useProductStore';
import { StripeProduct } from "lib/types";
import Container from "components/container";

export default function StepEighteen() {
  const { setValue, formState: { errors }} = useFormContext();
  const { formStore } = useFormStore();
  const [productOptions, setproductOptions] = useState<StripeProduct>();
  const { productStore } = useProductStore()
  const [useShipping, setUseShipping] = useState<boolean>(false);

  useEffect(() => {
    setproductOptions(formStore.product)
  }, [formStore.product]);

  useEffect(() => {
    if (useShipping === true) {
      setValue("billing_address", {
        ...formStore.shipping_address
      })
    } else {
      setValue("billing_address", {
        ...formStore.billing_address
      })
    }
  }, [useShipping]);

  const filteredProducts = productStore?.filter(
    (product: StripeProduct) => product.default_price === productOptions?.default_price
  );

  const currProduct = filteredProducts[0]
  const handleCheck = () => {
    setUseShipping(prev => !prev)
  }

  return (
    <>
      <FormHeader
        title={"Review and submit your online visit"}
        subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
      />
      <Container>
        <div className="flex justify-center gap-10 pb-10">
          <div className="flex-1 max-w-[580px]">
            <FormContainer wide>
              <p className="font-semibold text-xl text-main-blue pb-2">Billing Address</p>
              <div className="flex items-center my-2">
                <input id="default-checkbox" type="checkbox" value="" onClick={handleCheck} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Same as shipping address</label>
              </div>
              <FormInput
                label="Street Address*"
                id="billing_address.line1"
                type="text"
                defaultValue={formStore.billing_address?.line1}
              />
              <FormInput
                label="Address Line 2*"
                id="billing_address.line2"
                type="text"
                defaultValue={formStore.billing_address?.line2}
              />
              <div className="sm:grid sm:grid-cols-2 gap-4">
                <FormInput
                  label="City*"
                  id="billing_address.city"
                  type="text"
                  defaultValue={formStore.billing_address?.city} 
                />
                <FormInput
                  label="State / Province*"
                  id="billing_address.state"
                  type="text"
                  defaultValue={formStore.billing_address?.state}
                />
              </div>
              <FormInput
                label="ZIP / Postal Code*"
                id="billing_address.postal_code"
                type="text"
                defaultValue={formStore.billing_address?.postal_code} 
              />
              <p className="pt-2">Depending on your benefits, your medication may be free. Prices shown here do not reflect any coverage you may have.</p>
            </FormContainer>
          </div>
          {currProduct && <ProductDetails product={currProduct}/>}
        </div>
      </Container>
    </>
  );
}
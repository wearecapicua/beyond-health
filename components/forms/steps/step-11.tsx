import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';
import { useProductStore } from 'store/useProductStore';
import { StripeProduct } from "lib/types";

export default function StepEleven() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();
  const { productStore } = useProductStore()
  const [productOptions, setproductOptions] = useState<[StripeProduct]>();

  const filterProductArray = productStore.filter((product: StripeProduct) => {
    const stages = product.metadata.Stage.split(', ');
    return stages.includes(formStore.stage);
  });

  // Always should be one product
  const filteredProducts = filterProductArray.slice(0, 1);

  const customValidate = () => {
    setValue("product", {
      default_price: filteredProducts[0].default_price,
      price: filteredProducts[0].price,
      name: filteredProducts[0].name,
      id: filteredProducts[0].id
    })
    setSelected(filteredProducts[0].default_price)
  }

  useEffect(() => {
    if ((!selected || selected === '') && filteredProducts) {
      setSelected(filteredProducts[0]?.default_price)
      setValue("product", filteredProducts[0])
    }
    setproductOptions(filteredProducts)
  }, [formStore.product]);

  return (
    <>
      <FormHeader
        title={"Select your scalp treatment below"}
        subtitle="Based on your input, this is the recommended hair growth solution final approval from your doctor"
      />
      <FormContainer>
        {productOptions?.map((option: StripeProduct) => {
          return (
            <FormSelectorButton
              key={option.name}
              label={option.name}
              value={option.default_price}
              groupId="product"
              large
              selected={selected}
              setSelected={setSelected}
              customValidate={customValidate}
            />
          )
        })}
        {!!errors.product && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </FormContainer>
    </>
  );
}

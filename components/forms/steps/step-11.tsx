import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';
import { useProductStore } from 'store/useProductStore';

export default function StepEleven() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();
  const { productStore } = useProductStore()
  const [productOptions, setproductOptions] = useState();

  const filteredProducts = productStore.filter(product => {
    const stages = product.metadata.Stage.split(', ');
    return stages.includes(formStore.stage);
  });

  useEffect(() => {
    if (!selected && formStore.product) {
      setSelected(formStore.product);
      setValue("product", formStore.product)
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
        {productOptions?.map((option) => {
          return (
            <FormSelectorButton
              key={option.name}
              label={option.name}
              value={option.default_price}
              groupId="product"
              selected={selected}
              setSelected={setSelected}
            />
          )
        })}
        {!!errors.product && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </FormContainer>
    </>
  );
}

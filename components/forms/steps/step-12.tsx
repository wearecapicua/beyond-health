import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelector from "../form-selector";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';
import { useProductStore } from 'store/useProductStore';
import { StripeProduct } from "lib/types";

export default function StepTwelve() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();
  const { productStore } = useProductStore()
  const [productOptions, setproductOptions] = useState<[StripeProduct]>();

  const filteredProducts = productStore.filter((product: StripeProduct) => {
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
        title="You will receive a 3 month supply of hair growth solution in your shipment"
        subtitle="Unless the healthcare practitioner has a medical reason to prescribe you less, you will always get a year's worth of medication with prescriptions written through Beyond Health & Medical."
      />
      <FormContainer>
        {productOptions?.map((option: StripeProduct) => (
          <FormSelector
            key={option.name}
            label={option.name}
            value={option.default_price}
            groupId="product"
            selected={selected}
            setSelected={setSelected}
          />
        ))}
        {!!errors.product && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </FormContainer>
      <FormHeader subtitle="Pricing displayed here includes pharmacy fill fee but does not include benefits or insurance coverage" />
    </>
  );
}

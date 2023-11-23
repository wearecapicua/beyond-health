import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";

export default function StepOne() {
  const { register } = useFormContext();
  const { formStore } = useFormStore();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (formStore.country && !formStore.shipping_address?.country) {
      setValue("shipping_address.country", formStore.country)
    }
  }, []);
  
  return (
    <>
      <FormHeader
        title={"Where would you like us to deliver your package?"}
        subtitle="Your shipment will arrive in a discreet package."
      />
      <FormContainer wide>
        <FormInput
          label="Street Address*"
          id="shipping_address.line1"
          type="text"
          defaultValue={formStore.shipping_address?.line1}
        />
        <FormInput
          label="Address Line 2 (optional)"
          id="shipping_address.line2"
          type="text"
          defaultValue={formStore.shipping_address?.line2}
          isRequired={false}
        />
        <div className="sm:grid sm:grid-cols-2 gap-4">
          <FormInput
            label="City*"
            id="shipping_address.city"
            type="text"
            defaultValue={formStore.shipping_address?.city} 
          />
          <FormInput
            label="State / Province*"
            id="shipping_address.state"
            type="text"
            defaultValue={formStore.shipping_address?.state} 
          />
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-4">
          <FormInput
            label="Country*"
            id="shipping_address.country"
            type="text"
            defaultValue={formStore.shipping_address?.country} 
          />
          <FormInput
            label="ZIP / Postal Code*"
            id="shipping_address.postal_code"
            type="text"
            defaultValue={formStore.shipping_address?.postal_code} 
          />
        </div>
        <p className="pt-2.5">{"Delivery Instructions (optional)"}</p>
        <textarea
          id="shipping_address.delivery_instructions"
          rows={6}
          defaultValue={formStore.shipping_address?.delivery_instructions}
          className="block w-full rounded-3xl border-0 mt-2 py-3 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("shipping_address.delivery_instructions")}
        />
      </FormContainer>
    </>
  );
}
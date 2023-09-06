import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import ProductDetails from "components/product-details";

export default function StepEighteen() {
  const { register } = useFormContext();
  const { formStore } = useFormStore();
  return (
    <>
      <FormHeader
        title={"Review and submit your online visit"}
        subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
      />
      <div className="flex">
        <FormContainer>
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
        <ProductDetails />
      </div>
    </>
  );
}